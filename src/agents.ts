import { BaseAPI } from "./ BaseAPI";

export class Agents extends BaseAPI {
  /**
   * Retrieve agent information.
   * Endpoint: GET /agent.info/{rid}/{token}
   *
   * @param rid - The room ID. (required)
   * @param token - The visitor token. (required)
   * @returns A promise resolving to the agent information response with inferred types.
   */
  public async getAgentInfo<T>(rid: string, token: string): Promise<T> {
    if (!rid) {
      this.handleSDKError(400, "Room ID (rid) is required.");
    }
    if (!token) {
      this.handleSDKError(400, "Visitor token is required.");
    }
    const endpoint = `/agent.info/${rid}/${token}`;
    return this.request<T>(endpoint, "GET");
  }

  /**
   * Retrieve the next available agent.
   * Endpoint: GET /agent.next/{token}
   *
   * @param token - The visitor token. (required)
   * @returns A promise resolving to the next agent response with inferred types.
   */
  public async getNextAgent<T>(token: string): Promise<T> {
    if (!token) {
      this.handleSDKError(400, "Visitor token is required for getNextAgent.");
    }
    const endpoint = `/agent.next/${token}`;
    return this.request<T>(endpoint, "GET");
  }
}
