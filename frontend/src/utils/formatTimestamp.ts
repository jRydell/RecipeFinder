/** Converts a timestamp string to a human-readable relative time string.
 *   Shows "just now", "2 minutes ago", etc. Falls back to a generic message if parsing fails.
 */
import { formatDistanceToNow } from "date-fns";

export const formatTimestamp = (timestamp: string) => {
  try {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  } catch {
    return "some time ago";
  }
};
