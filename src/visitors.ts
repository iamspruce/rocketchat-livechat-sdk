import { BaseAPI } from "./ BaseAPI";

export class Visitor extends BaseAPI {
  /**
   * Create a new visitor.
   * Endpoint: POST /visitor
   *
   * @param visitor - The visitor data.
   * @returns A promise resolving to the visitor creation response.
   */
  public async registerVisitor<T>(visitor: {
    name: string;
    email: string;
    department?: string;
    token: string;
    phone?: string;
    customFields?: Array<{ key: string; value: string; overwrite: boolean }>;
  }): Promise<T> {
    if (!visitor.name || !visitor.email || !visitor.token) {
      this.handleSDKError(400, "Name, email, and token are required.");
    }

    return this.request<T>("/visitor", "POST", {
      body: JSON.stringify(visitor),
    });
  }

  /**
   * Retrieve visitor information.
   * Endpoint: GET /visitor/{token}
   *
   * @param token - The visitor token.
   * @returns A promise resolving to the visitor details.
   */
  public async getVisitor<T>(token: string): Promise<T> {
    if (!token) {
      this.handleSDKError(400, "Visitor token is required.");
    }

    return this.request<T>(`/visitor/${token}`, "GET");
  }

  /**
   * Delete a visitor.
   * Endpoint: DELETE /visitor/{token}
   *
   * @param token - The visitor token.
   * @returns A promise resolving to the deletion response.
   */
  public async deleteVisitor<T>(token: string): Promise<T> {
    if (!token) {
      this.handleSDKError(400, "Visitor token is required.");
    }

    return this.request<T>(`/visitor/${token}`, "DELETE");
  }
}
