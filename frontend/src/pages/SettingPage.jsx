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
    <div className="min-h-screen relative flex items-center justify-center p-4 md:p-6 overflow-hidden bg-gradient-to-br from-base-300 via-base-200 to-base-300 pt-20">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[80px] float-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-secondary/10 blur-[80px] float-medium" />

      <div className="relative z-10 w-full max-w-3xl glass-premium rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/5 animate-in space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="size-8 inline-flex items-center justify-center rounded-xl hover:bg-base-100/50 transition-colors text-base-content/70">
              <ArrowLeft className="size-4" />
            </Link>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Interface Theme</h2>
              <p className="text-xs text-base-content/60">Select a theme to customize your chat workspace color palette</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 max-h-[160px] overflow-y-auto pr-1">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 hover:scale-102
                ${theme === t ? "bg-primary/10 ring-1 ring-primary/30" : "hover:bg-base-100/50"}
              `}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-lg overflow-hidden border border-base-300/30" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1 bg-base-100">
                  <div className="rounded-sm bg-primary"></div>
                  <div className="rounded-sm bg-secondary"></div>
                  <div className="rounded-sm bg-accent"></div>
                  <div className="rounded-sm bg-neutral"></div>
                </div>
              </div>
              <span className="text-[10px] font-bold truncate w-full text-center text-base-content/75 group-hover:text-base-content">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold tracking-tight text-base-content/85">Visual Preview</h3>
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-base-100/20 shadow-inner">
            <div className="p-4 sm:p-6 bg-base-100/10 backdrop-blur-sm">
              <div className="max-w-md mx-auto">
                {/* Mock Chat UI */}
                <div className="bg-base-100/80 border border-base-300/40 rounded-2xl shadow-lg overflow-hidden">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-base-300/30 bg-base-100/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-primary-content font-bold text-sm shadow-sm">
                        JD
                      </div>
                      <div>
                        <h3 className="font-bold text-xs">Jane Doe</h3>
                        <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                          <span className="size-1 bg-emerald-500 rounded-full animate-pulse" />
                          Online
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[160px] max-h-[160px] overflow-y-auto bg-base-100/25">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-end gap-2.5 ${message.isSent ? "justify-end" : "justify-start"}`}
                      >
                        {!message.isSent && (
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-[10px] text-primary-content font-bold">
                            JD
                          </div>
                        )}
                        <div
                          className={`
                            max-w-[75%] rounded-2xl px-3.5 py-2 text-xs shadow-sm
                            ${message.isSent ? "bg-gradient-to-tr from-primary to-purple-600 text-primary-content rounded-br-none" : "bg-base-200/70 border border-base-300/40 text-base-content rounded-bl-none"}
                          `}
                        >
                          <p className="leading-relaxed">{message.content}</p>
                          <p
                            className={`
                              text-[8px] mt-1 text-right font-medium
                              ${message.isSent ? "text-primary-content/60" : "text-base-content/40"}
                            `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-3 border-t border-base-300/30 bg-base-100/50">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="w-full bg-base-100/30 border border-base-300/50 rounded-xl px-3 py-1.5 text-xs focus:outline-none"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="size-8 rounded-xl bg-gradient-to-tr from-primary to-purple-600 text-primary-content flex items-center justify-center shrink-0">
                        <Send size={12} />
                      </button>
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
