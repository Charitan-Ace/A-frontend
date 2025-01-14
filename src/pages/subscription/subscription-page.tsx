import { useState } from "react";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";

const SubscriptionPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState<any>(null);
  const backendUrl = import.meta.env.VITE_APP_API_URL

  const connectWebSocket = () => {
    const socket = new SockJS(backendUrl + "/notification/ws?userId=a55313de-32be-4b20-867b-b7d07042e629");
    const client = over(socket);

    client.connect({}, () => {
      console.log("Connected to WebSocket");
      setConnected(true);

      client.subscribe("/user/topic/notification", (message) => {
        console.log(message)
        setMessages((prev) => [...prev, message.body]);
      });
    });

    setStompClient(client);
  };

  const sendHttpRequest = async () => {
    try {
      const response = await fetch(backendUrl + "/notification", {
        method: "POST",
        credentials: "include"
      });
      console.log("HTTP Response:", response);
    } catch (error) {
      console.error("HTTP Request Failed:", error);
    }
  };

  const subscribeMonthly = async () => {
    try {
      const response = await fetch(backendUrl + "/payment/monthly-subscription", {
        method: "POST",
        body: JSON.stringify({
          "projectId": "cffedd29-972f-41c4-bbe6-54829087caf1",
          "amount": 150.55,
          "successUrl": "http://localhost:5173/subscription/success",
          "cancelUrl": "http://localhost:5173/subscription/cancel"
        }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      console.log("HTTP Response:", response);
      const data = await response.json()
      console.log(data.redirectUrl)
    } catch (error) {
      console.error("HTTP Request Failed:", error);
    }
  }

  const haltProjects = async () => {

  }

  return (
    <div className="p-36">
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          WebSocket Streaming with Notification Service
        </h1>

        <div className="space-x-4 mb-6">
          <button
            onClick={connectWebSocket}
            className={`px-4 py-2 rounded-md text-white font-semibold ${connected ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
            disabled={connected}
          >
            {connected ? "Connected to WebSocket" : "Connect to WebSocket"}
          </button>
          <button
            onClick={sendHttpRequest}
            className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold"
          >
            Send HTTP Request
          </button>
          <button
            onClick={subscribeMonthly}
            className="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white font-semibold"
          >
            Subscribe project
          </button>
        </div>

        <div className="w-full max-w-2xl bg-white rounded-md shadow-md p-4">
          <h2 className="text-lg font-bold text-gray-700 mb-2">Received Messages:</h2>
          <div
            className="overflow-y-auto h-64 border border-gray-300 rounded-md p-2 bg-gray-50 text-black"
            style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
          >
            {messages.length > 0 ? (
              messages.map((msg, index) => <div key={index}>{msg}</div>)
            ) : (
              <p className="text-gray-500">No messages received yet...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>abcxyz</div>
  )
};

export { SubscriptionPage };

