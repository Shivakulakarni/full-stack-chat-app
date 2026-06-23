import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100/80 backdrop-blur-xl border-b border-base-300/50 fixed w-full top-0 z-50"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-200 group">
            <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold tracking-tight hidden sm:block">Chatty</h1>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              to="/settings"
              className="btn btn-ghost btn-sm gap-2 rounded-xl hover:bg-base-200 transition-all duration-200"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-ghost btn-sm gap-2 rounded-xl hover:bg-base-200 transition-all duration-200"
                >
                  <User className="size-4" />
                  <span className="hidden sm:inline text-sm">Profile</span>
                </Link>

                <button
                  className="btn btn-ghost btn-sm gap-2 rounded-xl hover:bg-error/10 hover:text-error transition-all duration-200"
                  onClick={logout}
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline text-sm">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
