export function includeFormData(
  headers: Record<string, string>
): Record<string, string> {
  return { ...headers, "Content-Type": "" };
}
