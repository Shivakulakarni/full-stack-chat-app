import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-strong border-b border-base-300/40">
      <div className="mx-auto max-w-screen-xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-70">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-content shadow-md shadow-primary/20">
            <MessageSquare className="size-4" />
          </div>
          <span className="text-base font-bold tracking-tight">Chatty</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/settings"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-base-content/60 hover:text-base-content hover:bg-base-200/60 transition-all duration-150"
          >
            <Settings className="size-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-base-content/60 hover:text-base-content hover:bg-base-200/60 transition-all duration-150"
              >
                <User className="size-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-base-content/60 hover:text-red-500 hover:bg-red-500/10 transition-all duration-150"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
