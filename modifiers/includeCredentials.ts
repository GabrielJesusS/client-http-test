export function includeCredentials(
  header: Record<string, string>
): Record<string, string> {
  return { ...header, credentials: "include" };
}
