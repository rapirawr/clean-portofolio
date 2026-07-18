import { type LoaderFunctionArgs, data } from "react-router";

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

  return data({ github: githubData, wakatime: wakatimeData });
}
