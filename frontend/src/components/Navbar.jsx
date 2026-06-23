import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-3 inset-x-3 sm:top-4 sm:inset-x-4 max-w-6xl mx-auto z-50 glass-premium rounded-2xl h-14 border border-white/10 shadow-lg">
      <div className="w-full px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <div className="flex items-center justify-center size-8 rounded-xl bg-gradient-to-tr from-primary to-secondary text-primary-content shadow-md shadow-primary/20">
            <MessageSquare className="size-4" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-gradient-premium">Chatty</span>
        </Link>

        <div className="flex items-center gap-1.5">
          <Link
            to="/settings"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-base-content/75 hover:text-base-content hover:bg-base-200/50 transition-all duration-200"
          >
            <Settings className="size-3.5" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-base-content/75 hover:text-base-content hover:bg-base-200/50 transition-all duration-200"
              >
                <User className="size-3.5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-base-content/75 hover:text-red-500 hover:bg-red-500/10 transition-all duration-200"
              >
                <LogOut className="size-3.5" />
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
