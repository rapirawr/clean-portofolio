import type { MiddlewareFunction } from "react-router";
import { recordMetric } from "~/utils/metrics.server";

export const trackMetricsMiddleware: MiddlewareFunction = async ({ request }, next) => {
  const url = new URL(request.url);

  // Do not record /metrics endpoint, static build files, static assets, or HMR/manifest files
  if (
    url.pathname === "/metrics" ||
    url.pathname.startsWith("/build/") ||
    url.pathname.startsWith("/images/") ||
    url.pathname.includes(".")
  ) {
    return next();
  }

  const startTime = performance.now();
  let response: unknown;

  try {
    response = await next();
  } catch (error) {
    // If the loader/action throws an unhandled error (not a Response), record it as an error
    const durationMs = Math.round(performance.now() - startTime);
    const bucket = Math.floor(Date.now() / 1000 / 300) * 300;
    recordMetric(bucket, durationMs, true);
    throw error;
  }

  const durationMs = Math.round(performance.now() - startTime);
  const bucket = Math.floor(Date.now() / 1000 / 300) * 300;

  // Record metrics based on HTTP Response status code
  const isError = response instanceof Response ? response.status >= 400 : false;
  recordMetric(bucket, durationMs, isError);

  return response;
};
