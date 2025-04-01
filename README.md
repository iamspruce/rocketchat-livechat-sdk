# Rocket.Chat Livechat Node.js SDK

## Introduction

### Overview

The **Rocket.Chat Omnichannel Livechat Node.js SDK** is a wrapper for **Rocket.chat Omnichannel Livechat REST API**. It provides a clean and easy interface for integrating Rocket.chat livechat functionality into your websites or applications. With this SDK, developors can easily:

- Get livechat configurations
- Register, retrieve, and delete visitor informantions
- Get or create rooms
- Get info about agents
- Send, recieve and manage messages

This wrapper is specifically for endpoints that require no authentication, most of the endpoints require a visitor token, you can learn more about it [here](https://developer.rocket.chat/apidocs/introduction-to-omnichannel)

### Version & Release information

- Current Version: 1.0.0
- Release Date: April 1, 2025
- Changelog: [View Release notes](#changelog--release-notes)

## Getting Started

### Prerequisites

- Node.js: v18+
- A Rocket.chat server url, for example https://my_company_name.rocket.chat

### Installation

Install the package via npm:

```bash
npm install rocketchat-livechat-sdk
```

Or using Yarn:

```bash
yarn add rocketchat-livechat-sdk
```

### Example usage

Here is a basic example to register a visitor

```js
import { RocketChatLivechat } from "rocketchat-livechat-sdk";

const livechat = new RocketChatLivechat({
  serverURL: "https://chat.example.com",
});

const visitor_data = {
  name: "Alice Smith",
  email: "alice@example.com",
  token: "unique_visitor_token_123", // Unique identifier for the visitor
  phone: "+1234567890",
  customFields: [{ key: "customerType", value: "premium", overwrite: true }],
};

const visitor = await livechat.visitor.registerVisitor(visitor_data);
```

## Authentication

As stated earlier this SDK does not cover endpoints that require authentication, most of the endpoints use the [visitor token](https://developer.rocket.chat/apidocs/introduction-to-omnichannel) for authentication.

To get the visitor token you have to generate a unique identifier for the visitor when registering them, you can then use that identifier as the token for subsequent requests.

```js
import { RocketChatLivechat } from "rocketchat-livechat-sdk";

const livechat = new RocketChatLivechat({
  serverURL: "https://chat.example.com",
});

const uid = "some_random_unique_identifier";

const visitor_data = {
  name: "Alice Smith",
  email: "alice@example.com",
  token: uid, // Unique identifier for the visitor
};

const visitor = await livechat.visitor.registerVisitor(visitor_data);

const visitorDetails = await livechat.visitor.getVisitor(uid); // pass in the uid as the visitor's token
```

## API Reference

This section provides detailed information about the available API endpoints in this SDK wrapper.

### 1. Config

Get livechat widget configuration information and additional visitor data.

#### 1.1 `getConfig()`

- **SDK Method:** `config.getConfig(token?: string, department?: string): Promise<T>`
- **API:** `GET /config`
- **Description:** Retrieve configuration settings.
- **Request Parameters:**
  - `token` (optional, string): The visitor token.
  - `department` (optional, string): The visitor's department.
- **Request Body:** None
- **Response Format:** `application/json`
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const config = await livechat.config.getConfig();

  console.log(config);

  // With optional parameters
  const configWithToken = await livechat.config.getConfig("visitor_token_123");
  const configWithDepartment = await livechat.config.getConfig(
    undefined,
    "sales"
  );
  const configWithBoth = await livechat.config.getConfig(
    "visitor_token_456",
    "support"
  );
  ```

- **Example Response:**

  ```json
  {
    "config": {
      "enabled": true,
      "settings": {
        "registrationForm": true,
        "allowSwitchingDepartments": false,
        "nameFieldRegistrationForm": true,
        "emailFieldRegistrationForm": true,
        "displayOfflineForm": true,
        "videoCall": false,
        "fileUpload": true,
        "language": "",
        "transcript": false,
        "historyMonitorType": "url",
        "forceAcceptDataProcessingConsent": false,
        "showConnecting": true,
        "agentHiddenInfo": false,
        "clearLocalStorageWhenChatEnded": false,
        "limitTextLength": false
      },
      "theme": {
        "title": "Rocket.Chat",
        "color": "#C1272D",
        "offlineTitle": "Leave a message",
        "offlineColor": "#666666",
        "actionLinks": [
          {
            "icon": "icon-videocam",
            "i18nLabel": "Accept",
            "method_id": "createLivechatCall",
            "params": ""
          },
          {
            "icon": "icon-cancel",
            "i18nLabel": "Decline",
            "method_id": "denyLivechatCall",
            "params": ""
          }
        ]
      },
      "messages": {
        "offlineMessage": "",
        "offlineSuccessMessage": "",
        "offlineUnavailableMessage": "",
        "conversationFinishedMessage": "",
        "transcriptMessage": ""
      },
      "survey": {
        "items": [
          "satisfaction",
          "agentKnowledge",
          "agentResposiveness",
          "agentFriendliness"
        ],
        "values": ["1", "2", "3", "4", "5"]
      },
      "departments": [
        {
          "_id": "652882d8a2f73c7460e18dc4",
          "name": "Support",
          "showOnRegistration": false,
          "showOnOfflineForm": false,
          "departmentsAllowedToForward": []
        },
        {
          "_id": "64181a0728384134ed600dcc",
          "name": "Lost",
          "showOnRegistration": false,
          "showOnOfflineForm": false,
          "departmentsAllowedToForward": []
        }
      ],
      "online": true,
      "guest": {
        "_id": "2KNu66RPCwxA4ncy7",
        "username": "guest-3",
        "token": "iNKE8a6k6cjbqWhWd",
        "name": "Livechat Visitor"
      },
      "room": {
        "_id": "zRAeTszXor8CCPceB",
        "servedBy": {
          "_id": "7Gm3PoFCJWTCJ68XR",
          "username": "livechat.agent"
        },
        "open": true
      },
      "agent": {
        "_id": "7Gm3PoFCJWTCJ68XR",
        "emails": [
          {
            "address": "agent@rocket.chat",
            "verified": true
          }
        ],
        "name": "Livechat Agent",
        "username": "livechat.agent"
      }
    },
    "success": true
  }
  ```

### 2. Agents

Get the Livechat agent information

#### 2.1 `getAgentInfo()`

- **SDK Method:** `agents.getAgentInfo(rid: string, token: string): Promise<T>`
- **API:** `GET /agent.info/{rid}/{token}`
- **Description:** Retrieve agent information.
- **Request Parameters:**
  - `rid` (required, string): The room ID.
  - `token` (required, string): The visitor token.
- **Request Body:** None
- **Response Format:** `application/json`
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const agentInfo = await livechat.agents.getAgentInfo(
    "room_abc",
    "visitor_token_123"
  );
  console.log(agentInfo);
  ```

- **Example Response:**
  ```json
  {
    "agent": {
      "_id": "XycfA5CetCPuEjqxw",
      "emails": [
        {
          "address": "agent@rocket.chat",
          "verified": true
        }
      ],
      "status": "online",
      "name": "testAgent",
      "username": "test.agent",
      "livechat": {
        "maxNumberSimultaneousChat": "5"
      }
    },
    "success": true
  }
  ```

#### 2.2 `getNextAgent()`

- **SDK Method:** `agents.getNextAgent(token: string): Promise<T>`
- **API:** `GET /agent.next/{token}`
- **Description:** Retrieve the next available agent.
- **Request Parameters:**
  - `token` (required, string): The visitor token.
- **Request Body:** None
- **Response Format:** `application/json`
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const nextAgent = await livechat.agents.getNextAgent("visitor_token_123");
  console.log(nextAgent);
  ```

- **Example Response:**
  ```json
  {
    "agent": {
      "_id": "7Gm3PoFCJWTCJ68XR",
      "emails": [
        {
          "address": "agent@rocket.chat",
          "verified": true
        }
      ],
      "name": "Livechat Agent",
      "username": "livechat.agent"
    },
    "success": true
  }
  ```

### 3. Visitor

Register and manage visitors with this endpoints.

#### 3.1 `registerVisitor()`

- **SDK Method:** `visitor.registerVisitor(visitor: { name: string; email: string; department?: string; token: string; phone?: string; customFields?: Array<{ key: string; value: string; overwrite: boolean }> }): Promise<T>`
- **API:** `POST /visitor`
- **Description:** Create a new visitor.
- **Request Parameters:** None
- **Request Body:** `application/json`
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "department": "sales",
    "token": "new_visitor_token",
    "phone": "123-456-7890",
    "customFields": [
      { "key": "lead_source", "value": "website", "overwrite": true }
    ]
  }
  ```
- **Response Format:** `application/json`
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const visitorData = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    token: "unique_token_123",
    department: "support",
  };
  const newVisitor = await livechat.visitor.registerVisitor(visitorData);
  console.log(newVisitor);
  ```

- **Example Response:**
  ```json
  {
    "visitor": {
      "_id": "642fc15452492a08c3a756de",
      "username": "guest-19",
      "status": "online",
      "ts": "2023-04-07T07:08:04.375Z",
      "_updatedAt": "2023-11-03T08:23:23.449Z",
      "name": "Livechat Visitor",
      "phone": [
        {
          "phoneNumber": "55 51 5555-5555"
        }
      ],
      "token": "iNKE8a6k6cjbqWhWd",
      "visitorEmails": [
        {
          "address": "visitor@rocket.chat"
        }
      ],
      "department": "64181a0728384134ed600dcc"
    },
    "success": true
  }
  ```

#### 3.2 `getVisitor()`

- **SDK Method:** `visitor.getVisitor(token: string): Promise<T>`
- **API:** `GET /visitor/{token}`
- **Description:** Retrieve visitor information.
- **Request Parameters:**
  - `token` (required, string): The visitor token.
- **Request Body:** None
- **Response Format:** `application/json`
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const visitorDetails = await sdk.visitor.getVisitor("existing_visitor_token");
  console.log(visitorDetails);
  ```

- **Example Response:**
  ```json
  {
    "visitor": {
      "_id": "sGtcfEYz852uguxaS",
      "username": "guest-7",
      "_updatedAt": "2018-09-21T14:10:56.529Z",
      "token": "iNKE8a6k6cjbqWhWd",
      "phone": [
        {
          "phoneNumber": "55 51 5555-5555"
        }
      ],
      "visitorEmails": [
        {
          "address": "visitor@rocket.chat"
        }
      ],
      "name": "Livechat Visitor",
      "livechatData": {
        "address": "Rocket.Chat street"
      }
    },
    "success": true
  }
  ```

#### 3.3 `deleteVisitor()`

- **SDK Method:** `visitor.deleteVisitor(token: string): Promise<T>`
- **API:** `DELETE /visitor/{token}`
- **Description:** Delete a visitor.
- **Request Parameters:**
  - `token` (required, string): The visitor token.
- **Request Body:** None
- **Response Format:** `application/json`
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const deletionResponse = await sdk.visitor.deleteVisitor(
    "visitor_to_delete_token"
  );
  console.log(deletionResponse);
  ```

- **Example Response:**
  ```json
  {
    "visitor": {
      "_id": "47Dajwh9DjpnTAugW",
      "ts": "2021-07-18T13:28:38.962Z"
    },
    "success": true
  }
  ```

### 4. Room

This group of endpoints allows you to manage rooms.

#### 4.1 `getRoom()`

- **SDK Method:** `room.getRoom(token: string, rid?: string, agentId?: string): Promise<T>`
- **API:** `GET /room`
- **Description:** Retrieve room information.
- **Request Parameters:**
  - `token` (required, string): The visitor token.
  - `rid` (optional, string): The room ID.
  - `agentId` (optional, string): The agent ID.
- **Request Body:** None
- **Response Format:** `application/json`
  ```json
  {
    "roomId": "room_abc",
    "status": "open",
    "participants": ["visitor_token_123", "agent_456"]
    // ... other room details
  }
  ```
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const roomInfo = await sdk.room.getRoom("visitor_token_123");
  console.log(roomInfo);

  // With optional parameters
  const specificRoom = await sdk.room.getRoom("visitor_token_123", "room_xyz");
  const roomWithAgent = await sdk.room.getRoom(
    "visitor_token_456",
    undefined,
    "agent_789"
  );
  const roomWithAllParams = await sdk.room.getRoom(
    "visitor_token_012",
    "room_pqr",
    "agent_345"
  );
  ```

- **Example Response:**
  ```json
  {
    "roomId": "room_def",
    "status": "waiting",
    "queuePosition": 1
  }
  ```

#### 4.2 `closeRoom()`

- **SDK Method:** `room.closeRoom(rid: string, token: string): Promise<T>`
- **API:** `POST /room.close`
- **Description:** Close a livechat room.
- **Request Parameters:** None
- **Request Body:** `application/json`
  ```json
  {
    "rid": "room_abc",
    "token": "visitor_token_123"
  }
  ```
- **Response Format:** `application/json`
  ```json
  {
    "success": true,
    "message": "Room closed successfully."
  }
  ```
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const closeResponse = await sdk.room.closeRoom(
    "room_abc",
    "visitor_token_123"
  );
  console.log(closeResponse);
  ```

- **Example Response:**
  ```json
  {
    "success": true
  }
  ```

#### 4.3 `submitSurvey()`

- **SDK Method:** `room.submitSurvey(rid: string, token: string, data: Array<{ name: string; value: string }>): Promise<T>`
- **API:** `POST /room.survey`
- **Description:** Submit a room survey (feedback).
- **Request Parameters:** None
- **Request Body:** `application/json`
  ```json
  {
    "rid": "room_abc",
    "token": "visitor_token_123",
    "data": [
      { "name": "satisfaction", "value": "5" },
      { "name": "comments", "value": "Excellent support!" }
    ]
  }
  ```
- **Response Format:** `application/json`
  ```json
  {
    "success": true,
    "message": "Survey submitted successfully."
  }
  ```
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const surveyData = [
    { name: "friendliness", value: "4" },
    { name: "speed", value: "5" },
  ];
  const surveyResponse = await sdk.room.submitSurvey(
    "room_def",
    "visitor_token_456",
    surveyData
  );
  console.log(surveyResponse);
  ```

- **Example Response:**
  ```json
  {
    "success": true
  }
  ```

#### 4.4 `uploadFile()`

- **SDK Method:** `room.uploadFile(rid: string, file: File, token: string, description?: string): Promise<T>`
- **API:** `POST /upload/{rid}`
- **Description:** Upload a file to a Livechat room.
- **Request Parameters:**
  - `rid` (required, string): The room ID.
  - `file` (required, File): The file to be uploaded.
  - `token` (required, string): The visitor token.
  - `description` (optional, string): File description.
- **Request Body:** `multipart/form-data`
- **Response Format:** `application/json`
  ```json
  {
    "fileId": "file_123",
    "name": "document.pdf",
    "size": 102400,
    "url": "/uploads/document.pdf"
  }
  ```
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const fileInput = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    const fileToUpload = fileInput.files[0];
    const uploadResponse = await sdk.room.uploadFile(
      "room_ghi",
      fileToUpload,
      "visitor_token_789",
      "Project proposal"
    );
    console.log(uploadResponse);
  }
  ```

- **Example Response:**
  ```json
  {
    "fileId": "file_456",
    "name": "image.png",
    "size": 51200,
    "url": "/uploads/image.png"
  }
  ```

### 5. Message

This group of endpoints allows you to manage messages.

#### 5.1 `sendMessage()`

- **SDK Method:** `messages.sendMessage(token: string, rid: string, msg: string, _id?: string, agent?: { agentId: string; username: string }): Promise<T>`
- **API:** `POST /message`
- **Description:** Send a new message in a Livechat room.
- **Request Parameters:** None
- **Request Body:** `application/json`
  ```json
  {
    "token": "visitor_token_123",
    "rid": "room_abc",
    "msg": "Hello, how can I help you?",
    "_id": "optional_message_id",
    "agent": { "agentId": "agent_456", "username": "john.doe" }
  }
  ```
- **Response Format:** `application/json`
  ```json
  {
    "messageId": "msg_123",
    "ts": "2025-04-01T10:00:00.000Z",
    "u": { "_id": "visitor_abc", "username": "visitor1" },
    "msg": "Hello, how can I help you?"
    // ... other message details
  }
  ```
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const messageData = {
    token: "visitor_token_456",
    rid: "room_def",
    msg: "I have a question about your product.",
  };
  const sendMessageResponse = await sdk.messages.sendMessage(
    messageData.token,
    messageData.rid,
    messageData.msg
  );
  console.log(sendMessageResponse);
  ```

- **Example Response:**
  ```json
  {
    "messageId": "msg_456",
    "ts": "2025-04-01T10:05:00.000Z",
    "u": { "_id": "visitor_ghi", "username": "visitor2" },
    "msg": "I have a question about your product."
  }
  ```

#### 5.2 `updateMessage()`

- **SDK Method:** `messages.updateMessage(_id: string, token?: string, rid?: string, msg?: string): Promise<T>`
- **API:** `PUT /message/{_id}`
- **Description:** Update a specific Livechat message.
- **Request Parameters:**
  - `_id` (required, string): The message ID.
- **Request Body:** `application/json`
  ```json
  {
    "token": "visitor_token_123",
    "rid": "room_abc",
    "msg": "Updated message content"
  }
  ```
- **Response Format:** `application/json`
  ```json
  {
    "success": true,
    "messageId": "msg_123",
    "msg": "Updated message content"
    // ... other updated message details
  }
  ```
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const updateResponse = await sdk.messages.updateMessage(
    "existing_message_id",
    "visitor_token_789",
    "room_jkl",
    "Actually, I found the answer."
  );
  console.log(updateResponse);
  ```

- **Example Response:**
  ```json
  {
    "success": true,
    "messageId": "msg_789",
    "msg": "Actually, I found the answer."
  }
  ```

#### 5.3 `getMessage()`

- **SDK Method:** `messages.getMessage(_id: string, token: string, rid: string): Promise<T>`
- **API:** `GET /message/{_id}`
- **Description:** Retrieve specific Livechat message information.
- **Request Parameters:**
  - `_id` (required, string): The message ID.
  - `token` (required, string): The visitor token.
  - `rid` (required, string): The room ID.
- **Request Body:** None
- **Response Format:** `application/json`
  ```json
  {
    "_id": "msg_123",
    "rid": "room_abc",
    "u": { "_id": "visitor_abc", "username": "visitor1" },
    "msg": "Hello, how can I help you?",
    "ts": "2025-04-01T10:00:00.000Z"
    // ... other message details
  }
  ```
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const messageDetails = await sdk.messages.getMessage(
    "existing_message_id",
    "visitor_token_012",
    "room_mno"
  );
  console.log(messageDetails);
  ```

- **Example Response:**
  ```json
  {
    "_id": "msg_def",
    "rid": "room_pqr",
    "u": { "_id": "agent_345", "username": "agent1" },
    "msg": "Sure, what's your question?",
    "ts": "2025-04-01T10:02:00.000Z"
  }
  ```

#### 5.4 `deleteMessage()`

- **SDK Method:** `messages.deleteMessage(_id: string, token: string, rid: string): Promise<T>`
- **API:** `DELETE /message/{_id}`
- **Description:** Remove a specific Livechat message.
- **Request Parameters:**
  - `_id` (required, string): The message ID.
  - `token` (required, string): The visitor token.
  - `rid` (required, string): The room ID.
- **Request Body:** `application/json`
  ```json
  {
    "token": "visitor_token_123",
    "rid": "room_abc"
  }
  ```
- **Response Format:** `application/json`
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const deleteResponse = await sdk.messages.deleteMessage(
    "message_to_delete_id",
    "visitor_token_678",
    "room_stu"
  );
  console.log(deleteResponse);
  ```

- **Example Response:**
  ```json
  {
    "success": true
  }
  ```

#### 5.5 `getMessageHistory()`

- **SDK Method:** `messages.getMessageHistory(rid: string, token: string, ls?: string, end?: string, limit?: number): Promise<T>`
- **API:** `GET /messages.history/{rid}`
- **Description:** Get the entire message history of a conversation.
- **Request Parameters:**
  - `rid` (required, string): The room ID.
  - `token` (required, string): The visitor token.
  - `ls` (optional, string): Timestamp to start loading messages.
  - `end` (optional, string): Timestamp to end loading messages.
  - `limit` (optional, number): Number of messages to load.
- **Request Body:** None
- **Response Format:** `application/json`
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const history = await sdk.messages.getMessageHistory(
    "room_vwx",
    "visitor_token_901"
  );
  console.log(history);

  // With optional parameters
  const limitedHistory = await sdk.messages.getMessageHistory(
    "room_yz",
    "visitor_token_234",
    undefined,
    undefined,
    10
  );
  const historySince = await sdk.messages.getMessageHistory(
    "room_abc",
    "visitor_token_567",
    "2025-04-01T08:00:00.000Z"
  );
  ```

- **Example Response:**
  ```json
  [
    {
      "_id": "msg_3",
      "u": { "_id": "visitor_abc", "username": "visitor1" },
      "msg": "How can I assist you today?",
      "ts": "2025-04-01T09:05:00.000Z"
    }
  ]
  ```

#### 5.6 `sendOfflineMessage()`

- **SDK Method:** `messages.sendOfflineMessage(name: string, email: string, message: string, department: string, host: string): Promise<T>`
- **API:** `POST /offline.message`
- **Description:** Send an offline message when no agent is available.
- **Request Parameters:** None
- **Request Body:** `application/json`
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "message": "I need help with my order.",
    "department": "support",
    "host": "support_agent"
  }
  ```
- **Response Format:** `application/json`
- **Example Request:**

  ```typescript
  import { RocketChatLivechat } from "rocketchat-livechat-sdk";

  const livechat = new RocketChatLivechat({
    serverURL: "https://chat.example.com",
  });

  const offlineMessageData = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    message: "My account is locked.",
    department: "accounts",
    host: "account_manager",
  };
  const offlineResponse = await sdk.messages.sendOfflineMessage(
    offlineMessageData.name,
    offlineMessageData.email,
    offlineMessageData.message,
    offlineMessageData.department,
    offlineMessageData.host
  );
  console.log(offlineResponse);
  ```

- **Example Response:**
  ```json
  {
    "message": "Livechat offline message sent",
    "success": true
  }
  ```

## Examples and Usage

This section provides more detailed examples of how to use the SDK for common livechat interactions.

### Sending a Message

```javascript
import { RocketChatLivechat } from "rocketchat-livechat-sdk";

const livechat = new RocketChatLivechat({
  serverURL: "https://chat.example.com",
});

const visitorToken = "existing_visitor_token";
const roomId = "existing_room_id";
const messageText = "Hello agent, I have a question!";

try {
  const messageResponse = await livechat.messages.sendMessage(
    visitorToken,
    roomId,
    messageText
  );
  console.log("Message sent:", messageResponse);
} catch (error) {
  console.error("Error sending message:", error);
}
```

### Getting Agent Information

```javascript
import { RocketChatLivechat } from "rocketchat-livechat-sdk";

const livechat = new RocketChatLivechat({
  serverURL: "https://chat.example.com",
});

const visitorToken = "existing_visitor_token";
const roomId = "existing_room_id";

try {
  const agentInfo = await livechat.agents.getAgentInfo(roomId, visitorToken);
  console.log("Agent Info:", agentInfo);
} catch (error) {
  console.error("Error getting agent info:", error);
}
```

### Retrieving Livechat Configuration

```javascript
import { RocketChatLivechat } from "rocketchat-livechat-sdk";

const livechat = new RocketChatLivechat({
  serverURL: "https://chat.example.com",
});

try {
  const config = await livechat.config.getConfig();
  console.log("Livechat Configuration:", config);
} catch (error) {
  console.error("Error getting configuration:", error);
}
```

### Uploading a File

```javascript
import { RocketChatLivechat } from "rocketchat-livechat-sdk";
import fs from 'node:fs/promises'; // Or 'fs' for synchronous operations

const livechat = new RocketChatLivechat({
  serverURL: "https://chat.example.com",
});

const visitorToken = "existing_visitor_token";
const roomId = "existing_room_id";
const filePath = '/path/to/your/document.pdf'; // Replace with the actual path

try {
  const fileBuffer = await fs.readFile(filePath);
  const file = new Blob([fileBuffer]);
  const uploadResponse = await livechat.room.uploadFile(
    roomId,
    file as any, // Type assertion as 'Blob' might not directly match 'File' in Node.js environment
    visitorToken,
    "Important document"
  );
  console.log("File uploaded:", uploadResponse);
} catch (error) {
  console.error("Error uploading file:", error);
}
```

## Changelog / Release Notes

### Version 1.0.0 (April 1, 2025)

**Features:**

- Initial release of the Rocket.Chat Omnichannel Livechat Node.js SDK.
- Implemented support for the following API endpoints:
  - Config: `getConfig`
  - Agents: `getAgentInfo`, `getNextAgent`
  - Visitor: `registerVisitor`, `getVisitor`, `deleteVisitor`
  - Room: `getRoom`, `closeRoom`, `submitSurvey`, `uploadFile`
  - Message: `sendMessage`, `updateMessage`, `getMessage`, `deleteMessage`, `getMessageHistory`, `sendOfflineMessage`
- Provides a promise-based interface for asynchronous operations.
- Includes basic error handling within the SDK.

## Glossary

- **Visitor Token:** A unique identifier for a visitor engaging with the livechat. It is used to authenticate and track the visitor across different interactions.
- **Room ID (rid):** A unique identifier for a specific livechat conversation room.
- **Agent ID:** A unique identifier for a livechat agent.
- **Custom Fields:** Additional data associated with a visitor that can be used to provide more context.
- **Department:** A logical grouping of agents based on their area of expertise.
- **Message ID (\_id):** A unique identifier for a specific message within a livechat room.

## Error Handling

The SDK provides a structured way to handle errors that occur during API calls or within the SDK itself. All errors are instances of the `APIError` class, which extends the standard `Error` object and provides additional context.

### `APIError` Class

```typescript
export class APIError extends Error {
  public code: number;
  public errorType: ErrorType;
  public details?: any;

  constructor(
    code: number,
    message: string,
    errorType: ErrorType,
    details?: any
  ) {
    super(message);
    this.code = code;
    this.errorType = errorType;
    this.details = details;
  }
}
```

**Properties:**

- `code`: A number representing the HTTP status code of the error if it originated from the API, or a custom SDK error code.
- `message`: A human-readable description of the error.
- `errorType`: A string indicating the source of the error, either `"API"` for errors returned by the Rocket.Chat API or `"SDK"` for errors originating within the SDK (e.g., due to invalid parameters).
- `details` (optional): An object containing additional information about the error, which might be provided by the API or the SDK.

### Example of Catching Errors

You should always wrap your SDK calls in `try...catch` blocks to handle potential errors gracefully.

```javascript
import { RocketChatLivechat, APIError } from "rocketchat-livechat-sdk";

const livechat = new RocketChatLivechat({
  serverURL: "https://chat.example.com",
});

const visitorToken = "invalid_token"; // Example of an invalid token

try {
  const visitorDetails = await livechat.visitor.getVisitor(visitorToken);
  console.log("Visitor Details:", visitorDetails);
} catch (error) {
  if (error instanceof APIError) {
    console.error(
      "API Error:",
      error.code,
      error.errorType,
      error.message,
      error.details
    );
    if (
      error.code === 400 &&
      error.message.includes("Visitor token is required.")
    ) {
      console.warn("Please ensure the visitor token is provided.");
    } else if (
      error.code === 404 &&
      error.message.includes("No record found for the token")
    ) {
      console.warn("The provided visitor token is invalid.");
    }
  } else {
    console.error("An unexpected error occurred:", error);
  }
}
```

By checking the `errorType` and `code` properties of the `APIError` object, you can implement specific error handling logic in your application. For API errors, the `code` will typically correspond to standard HTTP status codes, while SDK errors will have custom codes (though this SDK currently primarily uses HTTP status codes for validation errors).
