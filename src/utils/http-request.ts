export interface HttpResponse<T> {
  json: T;
  status: number;
  responseHeader: Headers;
}

export default async function sendHttpRequest<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body: any = null,
  credentials: RequestCredentials = "include",
  headers: HeadersInit = { "Content-Type": "application/json" }
): Promise<HttpResponse<T>> {
  const options: RequestInit = {
    method,
    headers,
    credentials,
  };

  if (body) {
    options.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  const response = await fetch(url, options);

  let jsonData: T = {} as T;
  try {
    jsonData = await response.json();
  } catch {
    jsonData = {} as T;
  }

  return {
    json: jsonData as T,
    status: response.status,
    responseHeader: response.headers,
  };
}

export async function getRequest<T>(
  url: string,
  credentials: RequestCredentials = "include",
  headers: HeadersInit = { "Content-Type": "text/plain" }
): Promise<HttpResponse<T>> {
  return sendHttpRequest<T>(url, "GET", null, credentials, headers);
}

export async function postRequest<T>(
  url: string,
  body: any,
  credentials: RequestCredentials = "include",
  headers: HeadersInit = { "Content-Type": "text/plain" }
): Promise<HttpResponse<T>> {
  return sendHttpRequest<T>(url, "POST", body, credentials, headers);
}

export async function putRequest<T>(
  url: string,
  body: any,
  credentials: RequestCredentials = "include",
  headers: HeadersInit = { "Content-Type": "application/json" }
): Promise<HttpResponse<T>> {
  return sendHttpRequest<T>(url, "PUT", body, credentials, headers);
}

export async function deleteRequest<T>(
  url: string,
  credentials: RequestCredentials = "include",
  headers: HeadersInit = { "Content-Type": "application/json" }
): Promise<HttpResponse<T>> {
  return sendHttpRequest<T>(url, "DELETE", null, credentials, headers);
}

export async function patchRequest<T>(
  url: string,
  body: any,
  credentials: RequestCredentials = "include",
  headers: HeadersInit = { "Content-Type": "application/json" }
): Promise<HttpResponse<T>> {
  return sendHttpRequest<T>(url, "PATCH", body, credentials, headers);
}
