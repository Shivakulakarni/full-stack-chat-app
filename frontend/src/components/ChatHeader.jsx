import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-3 border-b border-base-300/50 bg-base-100/80 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-10 rounded-full object-cover ring-2 ring-base-300/50"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full ring-2 ring-base-100" />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-sm">{selectedUser.fullName}</h3>
            <p className="text-xs text-base-content/50">
              {isOnline ? (
                <span className="text-green-500">Active now</span>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-sm btn-circle hover:bg-base-200 transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
