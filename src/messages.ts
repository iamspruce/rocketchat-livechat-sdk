import { BaseAPI } from "./ BaseAPI";

export class Messages extends BaseAPI {
  /**
   * Send a new message in a Livechat room.
   * Endpoint: POST /message
   *
   * @param token - The visitor token (required)
   * @param rid - The room ID (required)
   * @param msg - The message text (required)
   * @param _id - (optional) Custom message ID
   * @param agent - (optional) Agent details { agentId, username }
   * @returns A promise resolving to the message response.
   */
  public async sendMessage<T>(
    token: string,
    rid: string,
    msg: string,
    _id?: string,
    agent?: { agentId: string; username: string }
  ): Promise<T> {
    if (!token || !rid || !msg) {
      this.handleSDKError(400, "Token, room ID, and message are required.");
    }

    return this.request<T>("/message", "POST", {
      body: JSON.stringify({ token, rid, msg, _id, agent }),
      headers: { "Content-Type": "application/json" },
    });
  }

  /**
   * Update a specific Livechat message.
   * Endpoint: PUT /message/{_id}
   *
   * @param _id - The message ID (required)
   * @param token - The visitor token (optional)
   * @param rid - The room ID (optional)
   * @param msg - The updated message text (optional)
   * @returns A promise resolving to the update response.
   */
  public async updateMessage<T>(
    _id: string,
    token?: string,
    rid?: string,
    msg?: string
  ): Promise<T> {
    if (!_id) {
      this.handleSDKError(400, "Message ID is required.");
    }

    return this.request<T>(`/message/${_id}`, "PUT", {
      body: JSON.stringify({ token, rid, msg }),
      headers: { "Content-Type": "application/json" },
    });
  }

  /**
   * Retrieve specific Livechat message information.
   * Endpoint: GET /message/{_id}
   *
   * @param _id - The message ID (required)
   * @param token - The visitor token (required)
   * @param rid - The room ID (required)
   * @returns A promise resolving to the message details.
   */
  public async getMessage<T>(
    _id: string,
    token: string,
    rid: string
  ): Promise<T> {
    if (!_id || !token || !rid) {
      this.handleSDKError(400, "Message ID, token, and room ID are required.");
    }

    return this.request<T>(`/message/${_id}?token=${token}&rid=${rid}`, "GET");
  }

  /**
   * Remove a specific Livechat message.
   * Endpoint: DELETE /message/{_id}
   *
   * @param _id - The message ID (required)
   * @param token - The visitor token (required)
   * @param rid - The room ID (required)
   * @returns A promise resolving to the deletion response.
   */
  public async deleteMessage<T>(
    _id: string,
    token: string,
    rid: string
  ): Promise<T> {
    if (!_id || !token || !rid) {
      this.handleSDKError(400, "Message ID, token, and room ID are required.");
    }

    return this.request<T>(`/message/${_id}`, "DELETE", {
      body: JSON.stringify({ token, rid }),
      headers: { "Content-Type": "application/json" },
    });
  }

  /**
   * Get the entire message history of a conversation.
   * Endpoint: GET /messages.history/{rid}
   *
   * @param rid - The room ID (required)
   * @param token - The visitor token (required)
   * @param ls - (optional) Timestamp to start loading messages
   * @param end - (optional) Timestamp to end loading messages
   * @param limit - (optional) Number of messages to load
   * @returns A promise resolving to the message history.
   */
  public async getMessageHistory<T>(
    rid: string,
    token: string,
    ls?: string,
    end?: string,
    limit?: number
  ): Promise<T> {
    if (!rid || !token) {
      this.handleSDKError(400, "Room ID and visitor token are required.");
    }

    const params = new URLSearchParams({ token });
    if (ls) params.append("ls", ls);
    if (end) params.append("end", end);
    if (limit) params.append("limit", limit.toString());

    return this.request<T>(
      `/messages.history/${rid}?${params.toString()}`,
      "GET"
    );
  }

  /**
   * Send an offline message when no agent is available.
   * Endpoint: POST /offline.message
   *
   * @param name - The visitor's name (required)
   * @param email - The visitor's email (required)
   * @param message - The offline message text (required)
   * @param department - The department name (required)
   * @param host - The username of the agent (required)
   * @returns A promise resolving to the offline message response.
   */
  public async sendOfflineMessage<T>(
    name: string,
    email: string,
    message: string,
    department: string,
    host: string
  ): Promise<T> {
    if (!name || !email || !message || !department || !host) {
      this.handleSDKError(
        400,
        "Name, email, message, department, and host are required."
      );
    }

    return this.request<T>("/offline.message", "POST", {
      body: JSON.stringify({ name, email, message, department, host }),
      headers: { "Content-Type": "application/json" },
    });
  }
}
