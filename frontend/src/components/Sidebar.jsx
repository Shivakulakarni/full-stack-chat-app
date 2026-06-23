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
    .filter((user) => (showOnlineOnly ? onlineUsers.includes(user._id) : true))
    .filter((user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-[68px] lg:w-72 border-r border-base-300/40 flex flex-col transition-all duration-300">
      <div className="p-3 lg:p-4 space-y-3 border-b border-base-300/40">
        <div className="flex items-center gap-2 px-1">
          <Users className="size-4 text-base-content/40" />
          <span className="text-sm font-semibold hidden lg:block">Contacts</span>
        </div>

        <div className="hidden lg:block relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-base-content/30" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-8 pr-3 py-1.5 text-sm rounded-lg border border-base-300/60 bg-base-200/30 placeholder:text-base-content/30 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="hidden lg:flex items-center gap-2 px-1">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-xs checkbox-primary"
          />
          <span className="text-xs text-base-content/50">
            Online ({onlineUsers.filter((id) => id !== authUser?._id).length})
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-1.5 px-1.5 lg:px-2">
        {filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isActive = selectedUser?._id === user._id;

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl
                transition-all duration-150
                ${isActive
                  ? "bg-primary/10"
                  : "hover:bg-base-200/60"
                }
              `}
            >
              <div className="relative shrink-0 mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-11 rounded-full object-cover"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full ring-2 ring-base-100" />
                )}
              </div>

              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{user.fullName}</div>
                <div className={`text-xs ${isOnline ? "text-emerald-500" : "text-base-content/40"}`}>
                  {isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center text-xs text-base-content/30 py-8">
            No contacts found
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
