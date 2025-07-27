# Socket.IO Server with TypeScript

A Socket.IO server implementation using TypeScript, Express, and CORS support.

## Features

-  Socket.IO server with TypeScript
-  Express.js integration
-  CORS enabled for cross-origin requests
-  Room management (join/leave rooms)
-  Real-time messaging
-  Connection/disconnection handling
-  Development and production scripts

## Installation

1. Install dependencies:

```bash
npm install
```

## Development

### Start the development server:

```bash
npm run dev
```

### Build the project:

```bash
npm run build
```

### Start the production server:

```bash
npm start
```

### Watch mode (auto-compile TypeScript):

```bash
npm run watch
```

## Usage

The server runs on `http://localhost:3000` by default.

### Basic Connection

```javascript
const socket = io("http://localhost:3000");

socket.on("connect", () => {
	console.log("Connected to server");
});
```

### Available Events

#### Client to Server:

-  `message` - Send a message to all connected clients
-  `join-room` - Join a specific room
-  `leave-room` - Leave a specific room

#### Server to Client:

-  `message` - Receive messages from other clients
-  `user-joined` - Notification when a user joins a room
-  `user-left` - Notification when a user leaves a room

### Example Usage

```javascript
// Send a message
socket.emit("message", { text: "Hello World!", timestamp: new Date() });

// Join a room
socket.emit("join-room", "room1");

// Leave a room
socket.emit("leave-room", "room1");

// Listen for messages
socket.on("message", (data) => {
	console.log("Received:", data);
});
```

## Testing

Open `client-test.html` in your browser to test the Socket.IO server functionality. The test client provides:

-  Connection/disconnection controls
-  Message sending
-  Room management
-  Real-time message display

## Project Structure

```
soket/
├── src/
│   └── index.ts          # Main server file
├── dist/                 # Compiled JavaScript (after build)
├── client-test.html      # Test client
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Environment Variables

-  `PORT` - Server port (default: 3000)

## Dependencies

### Production:

-  `express` - Web framework
-  `socket.io` - Real-time communication
-  `cors` - Cross-origin resource sharing

### Development:

-  `typescript` - TypeScript compiler
-  `ts-node` - TypeScript execution
-  `@types/*` - Type definitions

## License

ISC
