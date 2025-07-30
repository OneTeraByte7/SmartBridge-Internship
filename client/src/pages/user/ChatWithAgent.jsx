// src/pages/user/ChatWithAgent.jsx
import ChatBox from "../../components/ChatBox";

export default function ChatWithAgent({ userId, agentId }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Chat With Your Agent</h2>
      <ChatBox currentUserId={userId} assignedUserId={agentId} />
    </div>
  );
}
