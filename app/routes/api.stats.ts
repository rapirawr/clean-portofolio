import { type LoaderFunctionArgs, data } from "react-router";

// Helper to fetch contributions from GitHub GraphQL API
async function fetchGithubGraphQL(username: string, token: string) {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "ReactRouter-Portfolio-App",
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL API error: ${response.status}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  const cal = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) {
    throw new Error("Failed to parse calendar from GraphQL response");
  }

  const contributions = cal.weeks.map((week: any) =>
    week.contributionDays.map((day: any) => ({
      color: day.color,
      contributionCount: day.contributionCount,
      date: day.date,
    }))
  );

  return {
    totalContributions: cal.totalContributions,
    contributions,
  };
}

// Helper to calculate current and longest streaks from contribution calendar weeks
function calculateStreaks(weeks: any[][]) {
  const days = weeks.flat().filter(Boolean);
  days.sort((a, b) => a.date.localeCompare(b.date));

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  for (let i = 0; i < days.length; i++) {
    const count = days[i].contributionCount !== undefined ? days[i].contributionCount : (days[i].count || 0);
    if (count > 0) {
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }

  // Calculate current streak
  let foundStart = false;
  for (let i = days.length - 1; i >= 0; i--) {
    const count = days[i].contributionCount !== undefined ? days[i].contributionCount : (days[i].count || 0);

    // Start looking from the last day or the day before (since today's commits might not be pushed yet)
    if (i === days.length - 1 || i === days.length - 2) {
      if (count > 0) {
        foundStart = true;
      }
    }

    if (foundStart) {
      if (count > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Handle case where today is empty but yesterday had commits (streak is still active)
  if (currentStreak === 0 && days.length >= 2) {
    const yesterdayCount = days[days.length - 2].contributionCount !== undefined 
      ? days[days.length - 2].contributionCount 
      : (days[days.length - 2].count || 0);
    if (yesterdayCount > 0) {
      let temp = 0;
      for (let i = days.length - 2; i >= 0; i--) {
        const count = days[i].contributionCount !== undefined ? days[i].contributionCount : (days[i].count || 0);
        if (count > 0) {
          temp++;
        } else {
          break;
        }
      }
      currentStreak = temp;
    }
  }

  return { currentStreak, longestStreak };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const githubUser = process.env.VITE_GITHUB_USERNAME || "rapirawr";
  const wakatimeApiKey = process.env.WAKATIME_API_KEY;

  let githubData = {
    username: githubUser,
    avatarUrl: "",
    publicRepos: 0,
    followers: 0,
    stars: 0,
    languages: [] as { name: string; percentage: number }[],
  };

  let wakatimeData = {
    totalHours: "28.5 hrs",
    range: "last 7 days",
    languages: [
      { name: "TypeScript", percent: 55 },
      { name: "React / TSX", percent: 25 },
      { name: "PHP", percent: 12 },
      { name: "Other", percent: 8 },
    ],
    editors: [
      { name: "VS Code", percent: 90 },
      { name: "WebStorm", percent: 10 },
    ],
    isMock: true,
  };

  try {
    // 1. Fetch GitHub User Profile
    const profileRes = await fetch(`https://api.github.com/users/${githubUser}`, {
      headers: {
        "User-Agent": "ReactRouter-Portfolio-App",
      },
    });

    if (profileRes.ok) {
      const profile = await profileRes.json();
      githubData.avatarUrl = profile.avatar_url;
      githubData.publicRepos = profile.public_repos;
      githubData.followers = profile.followers;
    }

    // 2. Fetch GitHub Repos to calculate Stars & Languages
    const reposRes = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100`, {
      headers: {
        "User-Agent": "ReactRouter-Portfolio-App",
      },
    });

    if (reposRes.ok) {
      const repos = await reposRes.json();
      let totalStars = 0;
      const langCounts: Record<string, number> = {};
      let totalLangRepos = 0;

      repos.forEach((repo: any) => {
        totalStars += repo.stargazers_count;
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          totalLangRepos++;
        }
      });

      githubData.stars = totalStars;

      // Sort languages and map to percentage
      const sortedLangs = Object.entries(langCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([name, count]) => ({
          name,
          percentage: totalLangRepos > 0 ? Math.round((count / totalLangRepos) * 100) : 0,
        }));

      githubData.languages = sortedLangs;
    }
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
  }

  // 3. Fetch WakaTime Stats if API key exists
  if (wakatimeApiKey) {
    try {
      const base64Key = Buffer.from(`${wakatimeApiKey}:`).toString("base64");
      // Use summaries endpoint which is calculated in real-time and doesn't have 24-hour delay
      const wakaRes = await fetch("https://wakatime.com/api/v1/users/current/summaries?range=last_7_days", {
        headers: {
          Authorization: `Basic ${base64Key}`,
        },
      });

      if (!wakaRes.ok) {
        console.error("WakaTime API error:", wakaRes.status, await wakaRes.text());
      }

      if (wakaRes.ok) {
        const summaries = await wakaRes.json();
        const days = summaries.data || [];
        
        let totalSeconds = 0;
        const langSeconds: Record<string, number> = {};
        const editorSeconds: Record<string, number> = {};

        days.forEach((day: any) => {
          totalSeconds += day.grand_total.total_seconds || 0;

          if (day.languages) {
            day.languages.forEach((l: any) => {
              langSeconds[l.name] = (langSeconds[l.name] || 0) + l.total_seconds;
            });
          }

          if (day.editors) {
            day.editors.forEach((e: any) => {
              editorSeconds[e.name] = (editorSeconds[e.name] || 0) + e.total_seconds;
            });
          }
        });

        if (totalSeconds > 0) {
          const totalHoursVal = (totalSeconds / 3600).toFixed(1);
          
          // Calculate percentages for languages
          const languages = Object.entries(langSeconds)
            .map(([name, sec]) => ({ name, percent: Math.round((sec / totalSeconds) * 100) }))
            .sort((a, b) => b.percent - a.percent)
            .slice(0, 4);

          // Calculate percentages for editors
          const editors = Object.entries(editorSeconds)
            .map(([name, sec]) => ({ name, percent: Math.round((sec / totalSeconds) * 100) }))
            .sort((a, b) => b.percent - a.percent)
            .slice(0, 3);

          wakatimeData = {
            totalHours: `${totalHoursVal} hrs`,
            range: "last 7 days",
            languages,
            editors,
            isMock: false,
          };
        }
      }
    } catch (error) {
      console.error("Error fetching WakaTime stats:", error);
    }
  }

  // 4. Fetch GitHub Contributions (Try GraphQL first, then Deno fallback)
  const githubToken = process.env.GITHUB_PAT || process.env.GITHUB_TOKEN;
  let contributionsData = {
    total: 0,
    currentStreak: 0,
    longestStreak: 0,
    weeks: [] as any[][],
    isMock: true,
  };

  try {
    let result: { totalContributions: number; contributions: any[][] } | null = null;

    if (githubToken) {
      try {
        console.log("[Stats Debug] Attempting to fetch contributions via official GraphQL API...");
        result = await fetchGithubGraphQL(githubUser, githubToken);
      } catch (err) {
        console.error("Failed to fetch contributions via GraphQL, falling back to Deno API:", err);
      }
    }

    if (!result) {
      console.log("[Stats Debug] Fetching contributions via Deno public API...");
      const denoRes = await fetch(`https://github-contributions-api.deno.dev/${githubUser}.json`);
      if (denoRes.ok) {
        const data = await denoRes.json();
        result = {
          totalContributions: data.totalContributions || 0,
          contributions: data.contributions || [],
        };
      }
    }

    if (result && result.contributions && result.contributions.length > 0) {
      const { currentStreak, longestStreak } = calculateStreaks(result.contributions);
      
      // Slice the last 16 weeks to keep the payload size small and fit in UI
      const totalWeeks = result.contributions.length;
      const slicedWeeks = result.contributions.slice(Math.max(0, totalWeeks - 16));

      contributionsData = {
        total: result.totalContributions,
        currentStreak,
        longestStreak,
        weeks: slicedWeeks,
        isMock: false,
      };
    }
  } catch (error) {
    console.error("Error fetching contributions:", error);
  }

  return data({ github: githubData, wakatime: wakatimeData, contributions: contributionsData });
}
