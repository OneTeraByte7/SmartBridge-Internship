// src/pages/user/ChatWithAgent.jsx
import ChatBox from "../../components/ChatBox";

export default function ChatWithAgent({ userId, agentId }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-950 via-black to-blue-900 text-white justify-center items-start pt-10">
      <main className="p-1 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Chat With Your Agent</h2>
        <ChatBox currentUserId={userId} assignedUserId={agentId} />
      </main>
    </div>
  );
}
