import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => {
      if (showOnlineOnly) return onlineUsers.includes(user._id);
      return true;
    })
    .filter((user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300/50 flex flex-col transition-all duration-300 bg-base-100/50">
      <div className="border-b border-base-300/50 w-full p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Users className="size-5 text-base-content/70" />
          <span className="font-semibold hidden lg:block">Contacts</span>
        </div>

        <div className="hidden lg:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/40" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="input input-sm input-bordered w-full pl-9 rounded-xl bg-base-200/50 focus:bg-base-200 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-xs checkbox-primary"
            />
            <span className="text-xs text-base-content/70">Online only</span>
          </label>
          <span className="text-xs text-base-content/40">
            ({onlineUsers.filter((id) => id !== authUser?._id).length})
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-2 px-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 rounded-xl
              transition-all duration-200 cursor-pointer
              ${
                selectedUser?._id === user._id
                  ? "bg-primary/10 ring-1 ring-primary/20"
                  : "hover:bg-base-200/70"
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0 shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full ring-2 ring-base-300/50"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500
                  rounded-full ring-2 ring-base-100"
                />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium truncate text-sm">{user.fullName}</div>
              <div className="text-xs text-base-content/50">
                {onlineUsers.includes(user._id) ? (
                  <span className="text-green-500">Online</span>
                ) : (
                  "Offline"
                )}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/40 py-8 text-sm">
            {searchQuery ? "No contacts found" : "No online users"}
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
