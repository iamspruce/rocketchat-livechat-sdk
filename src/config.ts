import { BaseAPI } from "./ BaseAPI";

export class Config extends BaseAPI {
  /**
   * Retrieve configuration settings.
   * Endpoint: GET /config
   *
   * @param token - The visitor token. (optional)
   * @param department - The visitor's department. (optional)
   * @returns A promise resolving to the configuration response with inferred types.
   */
  public async getConfig<T>(token?: string, department?: string): Promise<T> {
    const params = new URLSearchParams();
    if (token) params.append("token", token);
    if (department) params.append("department", department);

    const endpoint = `/config${
      params.toString() ? "?" + params.toString() : ""
    }`;
    return this.request<T>(endpoint, "GET");
  }
}
