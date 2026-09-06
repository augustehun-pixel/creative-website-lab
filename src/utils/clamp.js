// Keeps a number between a minimum and maximum value.
// Example: clamp(1.4, 0, 1) returns 1, clamp(-0.2, 0, 1) returns 0.
export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}
