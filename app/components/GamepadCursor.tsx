import { useEffect, useState, useRef } from "react";
import { useTheme } from "~/context/ThemeContext";
import { useLanguage } from "~/context/LanguageContext";

const playHaptic = (gpIndex: number, duration: number, weakMagnitude: number, strongMagnitude: number) => {
  try {
    // IMPORTANT: Must re-fetch gamepad every time — browser invalidates old references for security.
    // Using a cached `gp` object will silently fail for vibration.
    const freshGp = navigator.getGamepads()[gpIndex] as any;
    if (!freshGp) return;

    if (freshGp.vibrationActuator) {
      freshGp.vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0,
        duration,
        weakMagnitude,
        strongMagnitude,
      });
    } else if (freshGp.hapticActuators && freshGp.hapticActuators.length > 0) {
      freshGp.hapticActuators[0].pulse(weakMagnitude, duration);
    }
  } catch (e) {
    // Silently ignore if not supported
  }
};


export function GamepadCursor() {
  const [isActive, setIsActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  
  const posRef = useRef({ x: 0, y: 0 });
  const rAFRef = useRef<number | null>(null);
  
  // Gamepad state refs to detect button changes
  const prevButtonsRef = useRef<boolean[]>([]);
  const isHoveringRef = useRef(false);
  
  // Ref to track isActive without adding it to dependency array
  const isActiveRef = useRef(isActive);
  
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // Theme state ref for access inside rAF loop
  const { resolvedTheme, setTheme } = useTheme();
  const resolvedThemeRef = useRef(resolvedTheme);
  
  const { locale, setLocale } = useLanguage();
  const localeRef = useRef(locale);
  
  useEffect(() => {
    resolvedThemeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    localeRef.current = locale;
  }, [locale]);

  useEffect(() => {
    // Initial center position on mount
    posRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    setPos(posRef.current);

    const updateGamepad = () => {
      const gamepads = navigator.getGamepads();
      let hasInput = false;

      // Find first connected gamepad
      const gp = Array.from(gamepads).find(g => g && g.connected);

      if (gp) {
        // Left stick & D-pad movement
        const axes = gp.axes;
        const leftStickX = axes[0] || 0;
        const leftStickY = axes[1] || 0;
        
        // Some gamepads map D-Pad to buttons 12-15
        const dpadUp = gp.buttons[12]?.pressed;
        const dpadDown = gp.buttons[13]?.pressed;
        const dpadLeft = gp.buttons[14]?.pressed;
        const dpadRight = gp.buttons[15]?.pressed;

        let dx = 0;
        let dy = 0;

        const deadzone = 0.15;
        const speed = 5; // Reduced sensitivity further
        
        if (Math.abs(leftStickX) > deadzone) dx += leftStickX * speed;
        if (Math.abs(leftStickY) > deadzone) dy += leftStickY * speed;
        
        if (dpadLeft) dx -= speed;
        if (dpadRight) dx += speed;
        if (dpadUp) dy -= speed;
        if (dpadDown) dy += speed;

        if (dx !== 0 || dy !== 0) {
          hasInput = true;
          
          let newX = posRef.current.x + dx;
          let newY = posRef.current.y + dy;
          
          // Clamp to screen bounds
          newX = Math.max(0, Math.min(window.innerWidth, newX));
          newY = Math.max(0, Math.min(window.innerHeight, newY));
          
          posRef.current = { x: newX, y: newY };
          setPos({ x: newX, y: newY });
        }

        // Right stick for scrolling
        const rightStickY = axes[3] || axes[5] || 0; // Some controllers use axis 5 for right stick Y
        if (Math.abs(rightStickY) > deadzone) {
          hasInput = true;
          window.scrollBy({ top: rightStickY * 8, behavior: 'auto' }); // Reduced scrolling sensitivity further
        }

        // Button A (usually index 0)
        const buttonA = gp.buttons[0];
        if (buttonA) {
          const isPressed = buttonA.pressed;
          const wasPressed = prevButtonsRef.current[0];
          
          if (isPressed) {
            hasInput = true;
            setIsClicking(true);
          } else {
            setIsClicking(false);
          }

          if (isPressed && !wasPressed) {
            // Click action!
            // Need to hide the cursor element itself so it doesn't block the click
            // It will have pointer-events: none in CSS, but just in case:
            const element = document.elementFromPoint(posRef.current.x, posRef.current.y);
            
            if (element instanceof HTMLElement) {
              // Try to find nearest clickable parent if element itself isn't a link/button
              const clickableElement = element.closest('a, button, input, [role="button"], [tabindex]') as HTMLElement;
              
              if (clickableElement) {
                clickableElement.click();
                clickableElement.focus();
              } else {
                element.click();
              }
              
              // Haptic feedback for click
              playHaptic(gp.index, 100, 0.8, 0.4);
            }
          }
        }
        
        // Button B (close / back) - index 1
        const buttonB = gp.buttons[1];
        if (buttonB?.pressed && !prevButtonsRef.current[1]) {
          hasInput = true;
          
          // Dispatch an Escape key event to close modals, menus, etc.
          const escapeEvent = new KeyboardEvent('keydown', {
            key: 'Escape',
            code: 'Escape',
            keyCode: 27,
            which: 27,
            bubbles: true,
            cancelable: true
          });
          document.dispatchEvent(escapeEvent);
          
          // Additionally, attempt to click elements conventionally used for closing
          // including standard Bootstrap, Tailwind, and typical React modal close classes
          const closeButton = document.querySelector('button[aria-label*="close" i], button[aria-label*="Close" i], .close-button, .modal-close, .close, [data-dismiss="modal"]');
          if (closeButton instanceof HTMLElement) {
            closeButton.click();
          }
        }
        
        // Button LB (toggle language) - index 4
        const buttonLB = gp.buttons[4];
        if (buttonLB?.pressed && !prevButtonsRef.current[4]) {
          hasInput = true;
          setLocale(localeRef.current === "en" ? "id" : "en");
        }
        
        // Button R3 (Right Stick Click) - index 11 (toggle guide)
        const buttonR3 = gp.buttons[11];
        if (buttonR3?.pressed && !prevButtonsRef.current[11]) {
          hasInput = true;
          setShowGuide(prev => !prev);
          playHaptic(gp.index, 60, 0.5, 0.5);
        }
        
        // Button RB (toggle theme) - index 5
        const buttonRB = gp.buttons[5];
        if (buttonRB?.pressed && !prevButtonsRef.current[5]) {
          hasInput = true;
          setTheme(resolvedThemeRef.current === "dark" ? "light" : "dark");
        }

        // Button X (reload page) - index 2
        const buttonX = gp.buttons[2];
        if (buttonX?.pressed && !prevButtonsRef.current[2]) {
          hasInput = true;
          playHaptic(gp.index, 120, 0.6, 0.6);
          // Use setTimeout so the haptic has time to play and to avoid any immediate block
          setTimeout(() => {
            window.location.reload();
          }, 150);
        }

        // Store current buttons state for next frame
        prevButtonsRef.current = gp.buttons.map(b => b.pressed);
        
        // Detect hover state for haptics and cursor styling
        if (hasInput) {
          const element = document.elementFromPoint(posRef.current.x, posRef.current.y);
          let hoveringClickable = false;
          
          if (element instanceof HTMLElement) {
             hoveringClickable = !!element.closest('a, button, input, [role="button"], [tabindex], .card, .project-card, .interactive');
          }
          
          if (hoveringClickable && !isHoveringRef.current) {
             // Light haptic bump on enter
             playHaptic(gp.index, 40, 0.5, 0.0);
          }
          
          if (hoveringClickable !== isHoveringRef.current) {
             isHoveringRef.current = hoveringClickable;
             setIsHovering(hoveringClickable);
          }
        }
      }

      if (hasInput && !isActiveRef.current) {
        setIsActive(true);
        document.body.classList.add('gamepad-active');
      }

      rAFRef.current = requestAnimationFrame(updateGamepad);
    };

    rAFRef.current = requestAnimationFrame(updateGamepad);

    const onMouseMove = (e: MouseEvent) => {
      // Only disable gamepad if mouse actually moved a significant amount
      if (Math.abs(e.movementX) > 2 || Math.abs(e.movementY) > 2) {
        if (isActiveRef.current) {
          setIsActive(false);
          document.body.classList.remove('gamepad-active');
        }
      }
    };
    
    // Add touch support to disable gamepad cursor on mobile devices
    const onTouchStart = () => {
      if (isActiveRef.current) {
        setIsActive(false);
        document.body.classList.remove('gamepad-active');
      }
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchStart);

    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      document.body.classList.remove('gamepad-active');
    };
  }, []);

  if (!isActive) return null;

  return (
    <>
      <div 
        className={`gamepad-cursor ${isClicking ? 'gamepad-cursor--clicking' : ''} ${isHovering ? 'gamepad-cursor--hovering' : ''}`}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`
        }}
      >
        <div className="gamepad-cursor__inner"></div>
      </div>

      {showGuide && (
        <div className="gamepad-guide-overlay" onClick={() => setShowGuide(false)}>
          <div className="gamepad-guide-modal" onClick={e => e.stopPropagation()}>
            <div className="gamepad-guide-header">
              <h2>🎮 Gamepad Controls</h2>
              <button className="gamepad-guide-close" onClick={() => setShowGuide(false)}>×</button>
            </div>
            
            <div className="gamepad-guide-list">
              <div className="gamepad-guide-item">
                <div className="gamepad-icon-wrapper">
                  <span className="btn-icon btn-stick">L</span>
                </div>
                <span>Move Cursor</span>
              </div>
              <div className="gamepad-guide-item">
                <div className="gamepad-icon-wrapper">
                  <span className="btn-icon btn-stick">R</span>
                </div>
                <span>Scroll Page</span>
              </div>
              <div className="gamepad-guide-item">
                <div className="gamepad-icon-wrapper">
                  <span className="btn-icon btn-a">A</span>
                </div>
                <span>Click</span>
              </div>
              <div className="gamepad-guide-item">
                <div className="gamepad-icon-wrapper">
                  <span className="btn-icon btn-b">B</span>
                </div>
                <span>Close Modal / Back</span>
              </div>
              <div className="gamepad-guide-item">
                <div className="gamepad-icon-wrapper">
                  <span className="btn-icon btn-x">X</span>
                </div>
                <span>Reload Page</span>
              </div>
              <div className="gamepad-guide-item">
                <div className="gamepad-icon-wrapper">
                  <span className="btn-icon btn-bumper">LB</span>
                </div>
                <span>Toggle Language</span>
              </div>
              <div className="gamepad-guide-item">
                <div className="gamepad-icon-wrapper">
                  <span className="btn-icon btn-bumper">RB</span>
                </div>
                <span>Toggle Theme</span>
              </div>
              <div className="gamepad-guide-item">
                <div className="gamepad-icon-wrapper">
                  <span className="btn-icon btn-stick">R3</span>
                </div>
                <span>Toggle this Guide</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
