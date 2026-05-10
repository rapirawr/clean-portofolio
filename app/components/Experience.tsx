import { useLanguage } from "~/context/LanguageContext";
import { GraduationCap, Briefcase, Rocket, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TimelineItem {
  dateKey: string;
  titleKey: string;
  placeKey: string;
  descKey: string;
  icon: any;
  status: "completed" | "current" | "upcoming";
}

const timelineItems: TimelineItem[] = [
  { 
    dateKey: "exp3.date", 
    titleKey: "exp3.title", 
    placeKey: "exp3.place", 
    descKey: "exp3.desc",
    icon: Star,
    status: "completed"
  },
  { 
    dateKey: "exp2.date", 
    titleKey: "exp2.title", 
    placeKey: "exp2.place", 
    descKey: "exp2.desc",
    icon: GraduationCap,
    status: "completed"
  },
  { 
    dateKey: "exp1.date", 
    titleKey: "exp1.title", 
    placeKey: "exp1.place", 
    descKey: "exp1.desc",
    icon: Rocket,
    status: "current"
  },
];

export function Experience() {
  const { t } = useLanguage();
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [activeNodes, setActiveNodes] = useState<boolean[]>(new Array(timelineItems.length).fill(false));

  useEffect(() => {
    let requestRef: number;
    
    const animate = () => {
      if (!pathRef.current || !containerRef.current || !svgWrapperRef.current) {
        requestRef = requestAnimationFrame(animate);
        return;
      }

      const container = containerRef.current;
      const path = pathRef.current;
      const svgWrapper = svgWrapperRef.current;
      
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // 1. DYNAMIC THRESHOLD CALCULATION
      // The tip of the orange line is visually at 80% of viewport
      const drawingTipY = windowHeight * 0.8;
      
      const elementTop = rect.top;
      const elementHeight = rect.height;
      
      // Calculate drawing progress
      let progress = (drawingTipY - elementTop) / elementHeight;
      progress = Math.max(0, Math.min(1, progress));
      
      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `${pathLength * (1 - progress)}`;

      // 2. PARALLAX CALCULATION (needed for activation sync)
      const centerOffset = (elementTop + elementHeight / 2) - (windowHeight / 2);
      const parallaxMove = Math.max(-40, Math.min(40, centerOffset * -0.1)); 
      svgWrapper.style.transform = `translateX(-50%) translateY(${parallaxMove}px)`;

      // 3. SYNCED ACTIVATION LOGIC
      // We must subtract the parallaxMove from the node's position to sync with the moving SVG
      const newActiveNodes = timelineItems.map((_, index) => {
        const node = nodeRefs.current[index];
        if (!node) return false;
        
        const nodeRect = node.getBoundingClientRect();
        const nodeCenterY = nodeRect.top + nodeRect.height / 2;
        
        // SYNC KEY: The drawing line is actually shifted by parallaxMove.
        // So the "visual" tip position relative to the static nodes is drawingTipY - parallaxMove
        return (drawingTipY - parallaxMove) >= nodeCenterY;
      });
      
      setActiveNodes(prev => {
        if (JSON.stringify(prev) === JSON.stringify(newActiveNodes)) return prev;
        return newActiveNodes;
      });
      
      requestRef = requestAnimationFrame(animate);
    };

    requestRef = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef);
  }, []);

  return (
    <section id="experience" className="section roadmap-section reveal" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t("exp.label")}</h2>
        </div>

        <div className="roadmap" style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          padding: '120px 0', 
          maxWidth: '1000px',
          margin: '0 auto', 
        }}>
          {/* Path SVG Container */}
          <div 
            className="roadmap__path-container" 
            ref={svgWrapperRef}
            style={{ 
              willChange: 'transform',
              pointerEvents: 'none',
              top: '120px',
              height: 'calc(100% - 240px)',
              zIndex: 1
            }}
          >
            <svg className="roadmap__path" viewBox="0 0 100 1000" preserveAspectRatio="none">
              <path 
                className="roadmap__path-base"
                d="M50,0 Q70,250 50,500 T50,1000" 
                fill="none" 
                strokeLinecap="round"
              />
              <path 
                ref={pathRef}
                className="roadmap__path--active"
                d="M50,0 Q70,250 50,500 T50,1000" 
                fill="none" 
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="roadmap__items" style={{ position: 'relative', zIndex: 2 }}>
            {timelineItems.map((item, i) => {
              const Icon = item.icon;
              const isEven = i % 2 === 0;
              const isActive = activeNodes[i];
              
              return (
                <div 
                  key={i} 
                  ref={el => { nodeRefs.current[i] = el; }}
                  className={`roadmap__node ${isEven ? 'roadmap__node--left' : 'roadmap__node--right'}`}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '140px',
                    position: 'relative'
                  }}
                >
                  <div className="roadmap__content-wrapper" style={{ width: '42%' }}>
                    <div className={`roadmap__card`} 
                         style={{ 
                           opacity: isActive ? 1 : 0.2, 
                           transform: isActive ? 'translateX(0)' : (isEven ? 'translateX(-40px)' : 'translateX(40px)'),
                           filter: isActive ? 'none' : 'grayscale(100%) blur(2px)',
                           transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                           background: 'var(--bg-card)',
                           padding: '24px',
                           borderRadius: '20px',
                           border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                           boxShadow: isActive ? 'var(--shadow-lg)' : 'none'
                         }}>
                      <div className="roadmap__card-header">
                        <span className="roadmap__date" style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}>
                          {t(item.dateKey)}
                        </span>
                      </div>
                      <h3 className="roadmap__title" style={{ color: isActive ? 'var(--text)' : 'var(--text-secondary)' }}>
                        {t(item.titleKey)}
                      </h3>
                      <p className="roadmap__place" style={{ opacity: isActive ? 1 : 0.6 }}>{t(item.placeKey)}</p>
                      <p className="roadmap__desc" style={{ display: isActive ? 'block' : 'none' }}>{t(item.descKey)}</p>
                    </div>
                  </div>

                  <div className="roadmap__icon-outer" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                    <div className={`roadmap__icon-inner`}
                         style={{
                           width: '56px',
                           height: '56px',
                           borderRadius: '50%',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           background: isActive ? 'var(--accent)' : 'var(--bg-card)',
                           color: isActive ? '#fff' : 'var(--text-secondary)',
                           border: isActive ? '2px solid var(--accent)' : '2px solid var(--border)',
                           boxShadow: isActive ? '0 0 25px var(--accent-soft)' : 'none',
                           transform: isActive ? 'scale(1.25)' : 'scale(1)',
                           transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                           zIndex: 10
                         }}>
                      <Icon size={24} />
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
