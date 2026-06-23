import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    const matchesOnline = !showOnlineOnly || onlineUsers.includes(user._id);
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesOnline && matchesSearch;
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300/30 flex flex-col transition-all duration-200 bg-base-100/25">
      <div className="border-b border-base-300/30 w-full p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-primary" />
          <span className="font-semibold text-base hidden lg:block tracking-tight text-base-content/90">Contacts</span>
        </div>
        
        {/* Search Input */}
        <div className="relative hidden lg:block animate-in">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/40" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-base-300 bg-base-100/30 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          />
        </div>

        {/* Online filter toggle */}
        <div className="hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-xs rounded"
            />
            <span className="text-xs text-base-content/75 select-none font-medium">Show online only</span>
          </label>
          <span className="text-[10px] text-zinc-500 font-medium">
            ({onlineUsers.filter((id) => id !== authUser?._id).length} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3.5 flex items-center gap-3
              hover:bg-base-200/50 transition-all duration-200 border-l-2
              ${
                selectedUser?._id === user._id
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-transparent"
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-11 object-cover rounded-xl shadow-sm"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 
                  rounded-full ring-2 ring-base-100 animate-pulse"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium text-sm truncate text-base-content/90">{user.fullName}</div>
              <div className="text-xs text-zinc-500 mt-0.5">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-8 text-xs">
            No contacts found
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
