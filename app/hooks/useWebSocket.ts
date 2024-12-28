import { useEffect, useState } from "react";

const useWebSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000/api/websocket"); 
        setSocket(ws);

        ws.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
        };

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    return { socket, messages };
};

export default useWebSocket;
