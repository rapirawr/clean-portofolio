import { type LoaderFunctionArgs, data } from "react-router";
import { getMetricsForBucket } from "~/utils/metrics.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // Security verification using token
  const expectedToken = process.env.METRICS_TOKEN;
  if (expectedToken && expectedToken !== "your-secure-token") {
    const requestToken = request.headers.get("X-Metrics-Token");
    if (requestToken !== expectedToken) {
      return data(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  const bucket = Math.floor(Date.now() / 1000 / 300) * 300;
  const prevBucket = bucket - 300; // Fetch previous 5-minute bucket for finalized, stable data

  // Retrieve metrics, fallback to current active bucket if previous one is empty
  let metrics = getMetricsForBucket(prevBucket);
  if (!metrics || metrics.requests_count === 0) {
    metrics = getMetricsForBucket(bucket);
  }

  const requests = metrics?.requests_count ?? 0;
  const errors = metrics?.errors_count ?? 0;
  const totalTime = metrics?.total_response_time_ms ?? 0;

  const avgTime = requests > 0 ? Math.round(totalTime / requests) : 0;

  return data({
    requests_count: requests,
    errors_count: errors,
    avg_response_time_ms: avgTime,
    period: "last_5_minutes"
  });
}
