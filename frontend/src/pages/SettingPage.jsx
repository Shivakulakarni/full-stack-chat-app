import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just shipped some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200/50 pt-20">
      <div className="max-w-3xl mx-auto p-4 py-10 animate-in">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="size-8 inline-flex items-center justify-center rounded-lg hover:bg-base-200/60 transition-colors">
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="text-base font-semibold">Settings</h1>
            <p className="text-xs text-base-content/40">Customize your experience</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-base-300/40 bg-base-100 shadow-sm p-6">
            <div className="mb-5">
              <h3 className="text-sm font-semibold">Appearance</h3>
              <p className="text-xs text-base-content/40 mt-0.5">Choose your theme</p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    group flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-150
                    ${theme === t
                      ? "bg-primary/10 ring-2 ring-primary/30 scale-105"
                      : "hover:bg-base-200/60 hover:scale-105"
                    }
                  `}
                  onClick={() => setTheme(t)}
                >
                  <div className="relative h-7 w-full rounded-lg overflow-hidden" data-theme={t}>
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-0.5">
                      <div className="rounded bg-primary" />
                      <div className="rounded bg-secondary" />
                      <div className="rounded bg-accent" />
                      <div className="rounded bg-neutral" />
                    </div>
                  </div>
                  <span className="text-[10px] font-medium truncate w-full text-center capitalize">
                    {t}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-base-300/40 bg-base-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold mb-4">Preview</h3>
            <div className="rounded-xl border border-base-300/40 overflow-hidden">
              <div className="bg-base-200/30 p-3">
                <div className="max-w-md mx-auto bg-base-100 rounded-xl shadow-sm overflow-hidden">
                  <div className="px-3.5 py-2.5 border-b border-base-300/40 flex items-center gap-2.5">
                    <div className="size-7 rounded-full bg-primary flex items-center justify-center text-primary-content text-[10px] font-bold">
                      J
                    </div>
                    <div>
                      <p className="text-xs font-semibold">John Doe</p>
                      <p className="text-[10px] text-emerald-500">Online</p>
                    </div>
                  </div>

                  <div className="p-3 space-y-2 min-h-[160px] max-h-[160px] overflow-y-auto">
                    {PREVIEW_MESSAGES.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs ${
                            msg.isSent
                              ? "bg-primary text-primary-content rounded-br-md"
                              : "bg-base-200 rounded-bl-md"
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p className={`text-[9px] mt-1 ${msg.isSent ? "text-primary-content/60" : "text-base-content/40"}`}>
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-3.5 py-2.5 border-t border-base-300/40">
                    <div className="flex gap-2">
                      <div className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-base-300/40 bg-base-200/30 text-base-content/30">
                        Type a message...
                      </div>
                      <div className="size-7 rounded-lg bg-primary flex items-center justify-center">
                        <Send size={12} className="text-primary-content" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
