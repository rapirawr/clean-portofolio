interface MetricsBucket {
  requests_count: number;
  errors_count: number;
  total_response_time_ms: number;
}

const globalForMetrics = global as unknown as {
  metricsCache?: Record<number, MetricsBucket>;
};

const cache = globalForMetrics.metricsCache ?? {};
if (process.env.NODE_ENV !== "production") {
  globalForMetrics.metricsCache = cache;
}

export function recordMetric(bucket: number, durationMs: number, isError: boolean) {
  if (!cache[bucket]) {
    cache[bucket] = {
      requests_count: 0,
      errors_count: 0,
      total_response_time_ms: 0,
    };
  }
  cache[bucket].requests_count += 1;
  cache[bucket].total_response_time_ms += durationMs;
  if (isError) {
    cache[bucket].errors_count += 1;
  }

  // Clean up old buckets to prevent memory leak (keep last 2 hours = 24 buckets)
  const keys = Object.keys(cache).map(Number);
  if (keys.length > 24) {
    const minKeep = bucket - 24 * 300;
    for (const key of keys) {
      if (key < minKeep) {
        delete cache[key];
      }
    }
  }
}

export function getMetricsForBucket(bucket: number): MetricsBucket | null {
  return cache[bucket] || null;
}
