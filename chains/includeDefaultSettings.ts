import { includeCredentials } from "../modifiers/includeCredentials";
import { includeTokenHeader } from "../modifiers/includeTokenHeader";

export function includeDefaultSettings(): Record<string, string> {
  return includeCredentials(includeTokenHeader({}));
}
