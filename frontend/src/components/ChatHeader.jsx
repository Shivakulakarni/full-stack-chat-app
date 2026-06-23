import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-base-300/40 bg-base-100/50">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="size-9 rounded-full object-cover"
          />
          {isOnline && (
            <span className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-emerald-500 rounded-full ring-2 ring-base-100" />
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold leading-tight">{selectedUser.fullName}</h3>
          <p className={`text-[11px] leading-tight ${isOnline ? "text-emerald-500" : "text-base-content/40"}`}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="size-8 inline-flex items-center justify-center rounded-lg hover:bg-base-200/60 text-base-content/40 hover:text-base-content transition-all duration-150"
      >
        <X className="size-4" />
      </button>
    </div>
  );
};
export default ChatHeader;
