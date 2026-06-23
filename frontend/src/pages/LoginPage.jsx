import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start p-4 overflow-y-auto bg-gradient-to-br from-base-300 via-base-200 to-base-300 pt-28 pb-10">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[80px] float-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-secondary/10 blur-[80px] float-medium" />

      {/* Main glass card */}
      <div className="relative z-10 w-full max-w-md glass-premium rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/5 animate-in">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-3">
            <div className="size-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <MessageSquare className="size-6 text-primary-content" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight mt-2 text-gradient-premium">Welcome Back</h1>
            <p className="text-xs text-base-content/60">
              Sign in to your Chatty workspace
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold text-base-content/70">Email Address</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="size-4.5 text-base-content/40" />
              </div>
              <input
                type="email"
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-base-300 bg-base-100/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold text-base-content/70">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="size-4.5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-base-300 bg-base-100/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-base-content/40 hover:text-base-content transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/95 hover:to-purple-600/95 text-primary-content text-sm font-semibold shadow-md shadow-primary/10 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-xs text-base-content/60">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary font-semibold hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
