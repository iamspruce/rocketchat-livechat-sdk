import { BaseAPI } from "./ BaseAPI";

export class Room extends BaseAPI {
  /**
   * Retrieve room information.
   * Endpoint: GET /room
   *
   * @param token - The visitor token (required)
   * @param rid - The room ID (optional)
   * @param agentId - The agent ID (optional)
   * @returns A promise resolving to the room details.
   */
  public async getRoom<T>(
    token: string,
    rid?: string,
    agentId?: string
  ): Promise<T> {
    if (!token) {
      this.handleSDKError(400, "Visitor token is required.");
    }

    const params = new URLSearchParams({ token });
    if (rid) params.append("rid", rid);
    if (agentId) params.append("agentId", agentId);

    return this.request<T>(`/room?${params.toString()}`, "GET");
  }

  /**
   * Close a livechat room.
   * Endpoint: POST /room.close
   *
   * @param rid - The room ID (required)
   * @param token - The visitor token (required)
   * @returns A promise resolving to the response.
   */
  public async closeRoom<T>(rid: string, token: string): Promise<T> {
    if (!rid || !token) {
      this.handleSDKError(400, "Room ID and visitor token are required.");
    }

    return this.request<T>("/room.close", "POST", {
      body: JSON.stringify({ rid, token }),
      headers: { "Content-Type": "application/json" },
    });
  }

  /**
   * Submit a room survey (feedback).
   * Endpoint: POST /room.survey
   *
   * @param rid - The room ID (required)
   * @param token - The visitor token (required)
   * @param data - Feedback data (array of objects).
   * @returns A promise resolving to the response.
   */
  public async submitSurvey<T>(
    rid: string,
    token: string,
    data: Array<{ name: string; value: string }>
  ): Promise<T> {
    if (!rid || !token || !data.length) {
      this.handleSDKError(
        400,
        "Room ID, visitor token, and survey data are required."
      );
    }

    return this.request<T>("/room.survey", "POST", {
      body: JSON.stringify({ rid, token, data }),
      headers: { "Content-Type": "application/json" },
    });
  }

  /**
   * Upload a file to a Livechat room.
   * Endpoint: POST /upload/{rid}
   *
   * @param rid - The room ID (required)
   * @param file - The file to be uploaded (required)
   * @param token - The visitor token (required)
   * @param description - (optional) File description.
   * @returns A promise resolving to the upload response.
   */
  public async uploadFile<T>(
    rid: string,
    file: File,
    token: string,
    description?: string
  ): Promise<T> {
    if (!rid || !file || !token) {
      this.handleSDKError(
        400,
        "Room ID, file, and visitor token are required."
      );
    }

    const formData = new FormData();
    formData.append("file", file);
    if (description) {
      formData.append("description", description);
    }

    return this.request<T>(`/upload/${rid}`, "POST", {
      body: formData,
      headers: { "x-visitor-token": token }, // Custom header for visitor authentication
    });
  }
}
