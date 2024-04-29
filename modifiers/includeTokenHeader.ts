import { cookies } from "next/headers";

const TOKEN = process.env.PUBLIC_NEXT_TOKEN_NAME;

export function includeTokenHeader(
  header: Record<string, string>
): Record<string, string> {
  const cookie = cookies().get(TOKEN as string);

  return { ...header, Authorization: `Bearer ${cookie?.value}` };
}
