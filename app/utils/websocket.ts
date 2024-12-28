import WebSocket, { WebSocketServer } from "ws";

const clients = new Set<WebSocket>();

export const WebSocketServerInstance = new WebSocketServer({ noServer: true });

WebSocketServerInstance.on("connection", (ws) => {
    clients.add(ws);

    ws.on("close", () => {
        clients.delete(ws);
    });

    ws.on("error", (err) => {
        console.error("WebSocket error:", err);
    });
});

export const broadcast = (message: object) => {
    const data = JSON.stringify(message);
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};
