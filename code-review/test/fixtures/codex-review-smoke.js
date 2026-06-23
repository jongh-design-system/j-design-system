export function averageDuration(durations) {
  return durations.reduce((total, duration) => total + duration, 0) / durations.length
}
