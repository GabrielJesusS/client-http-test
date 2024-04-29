import { HttpMethodsEnum } from "./HttpMethodsEnum";
import { HTTPResponseError } from "./HttpResponseError";
import HttpStatusCode from "./StatusCodesEnum";
import { ERROR_STATUS_CODES } from "./errorStatusCodes";

type TCustomHeaders = Record<string, string>;

type THTTPClientCustomOptions = Omit<RequestInit, "headers" | "method"> & {
  headers?: TCustomHeaders;
  method?: HttpMethodsEnum;
  baseUrl?: string;
};

type THTTPClientExecutionReturn<T> = {
  data: T;
  status: HttpStatusCode;
};

const BASE_URL = process.env.PUBLIC_NEXT_API_URL;

const DEFAULT_HEADERS = { "Content-Type": "application/json" };

function forgeUrl(path: string, baseUrl?: string): string {
  if (baseUrl) return `${baseUrl}${path}`;
  return `${BASE_URL}${path}`;
}

function mountHeader(customHeader?: TCustomHeaders) {
  return { ...DEFAULT_HEADERS, ...customHeader };
}

async function parseResponse<T>(response: Response) {
  const parsedBody: T = await response.json();

  if (ERROR_STATUS_CODES.includes(response.status)) {
    throw new HTTPResponseError(parsedBody, response.status);
  }

  return parsedBody;
}

export async function client<T>(
  url: string,
  options?: THTTPClientCustomOptions
): Promise<THTTPClientExecutionReturn<T>> {
  const headers = mountHeader(options?.headers);

  const response = await fetch(forgeUrl(url, options?.baseUrl), {
    ...options,
    headers,
  });

  const parsedResponse = await parseResponse<T>(response);

  return { data: parsedResponse, status: response.status };
}
