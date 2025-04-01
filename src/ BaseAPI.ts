export interface APIConfig {
  serverURL: string;
}

import { APIError } from "./APIError";

export abstract class BaseAPI {
  protected serverURL: string;

  constructor({ serverURL }: APIConfig) {
    this.serverURL = `${serverURL}/api/v1/livechat`;
  }

  /**
   * Generic request method using fetch.
   * Normalizes API errors using createAPIError.
   */
  protected async request<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.serverURL}${endpoint}`;
    const config: RequestInit = { method, ...options };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw this.createAPIError(response.status, errorData);
      }
      return response.json();
    } catch (error: any) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError(0, `Request failed: ${error.message}`, "API", error);
    }
  }

  /**
   * Normalizes errors from the API response.
   */
  protected createAPIError(status: number, errorData: any): APIError {
    let message = "Unknown error occurred.";
    if (errorData) {
      if (typeof errorData === "string") {
        message = errorData;
      } else if (errorData.message) {
        message = errorData.message;
      } else if (errorData.error) {
        message = errorData.error;
      }
    } else {
      message = "No error details provided.";
    }
    return new APIError(status, message, "API", errorData);
  }

  /**
   * Throws a consistent SDK error (e.g., for missing parameters).
   */
  protected handleSDKError(code: number, message: string): never {
    throw new APIError(code, message, "SDK");
  }
}
