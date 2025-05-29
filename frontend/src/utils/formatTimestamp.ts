/** Converts a timestamp string to a human-readable local date and time string.
 *   Falls back to a generic message if parsing fails.
 */
export function formatTimestamp(timestamp: string) {
  try {
    return new Date(timestamp).toLocaleString();
  } catch {
    return "some time ago";
  }
}
