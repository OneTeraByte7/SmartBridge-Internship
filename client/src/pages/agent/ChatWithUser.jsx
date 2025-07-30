// src/pages/agent/ChatWithUser.jsx
import ChatBox from "../../components/ChatBox";

export default function ChatWithUser({ agentId, userId }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Chat With Assigned User</h2>
      <ChatBox currentUserId={agentId} assignedUserId={userId} />
    </div>
  );
}
