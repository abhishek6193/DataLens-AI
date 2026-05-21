// utility to structure info logs
export function logInfo(message: string, meta?: object) {
  console.log(
    JSON.stringify({
      level: "INFO",
      message,
      meta,
      timestamp: new Date().toISOString(),
    })
  );
}

// utility to structure error logs
export function logError(message: string, meta?: object) {
  console.error(
    JSON.stringify({
      level: "ERROR",
      message,
      meta,
      timestamp: new Date().toISOString(),
    })
  );
}
