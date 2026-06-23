import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link
            to="/"
            className="btn btn-ghost btn-sm btn-circle hover:bg-base-200"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h2 className="text-xl font-bold">Settings</h2>
            <p className="text-sm text-base-content/50">
              Customize your chat experience
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-base-100 rounded-2xl p-6 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg font-semibold">Theme</h3>
              <p className="text-sm text-base-content/50 mt-1">
                Choose a theme for your chat interface
              </p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    group flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all duration-200
                    ${
                      theme === t
                        ? "bg-primary/10 ring-2 ring-primary/30 scale-105"
                        : "hover:bg-base-200/70 hover:scale-105"
                    }
                  `}
                  onClick={() => setTheme(t)}
                >
                  <div className="relative h-8 w-full rounded-lg overflow-hidden" data-theme={t}>
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium truncate w-full text-center">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-base-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-5">Preview</h3>
            <div className="rounded-xl border border-base-300/50 overflow-hidden bg-base-100 shadow-inner">
              <div className="p-4 bg-base-200/50">
                <div className="max-w-lg mx-auto">
                  <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-base-300/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content text-xs font-bold">
                          J
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">John Doe</h3>
                          <p className="text-xs text-green-500">Online</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 min-h-[200px] max-h-[200px] overflow-y-auto">
                      {PREVIEW_MESSAGES.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`
                              max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm
                              ${
                                message.isSent
                                  ? "bg-primary text-primary-content rounded-br-md"
                                  : "bg-base-200 rounded-bl-md"
                              }
                            `}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`
                                text-[10px] mt-1
                                ${message.isSent ? "text-primary-content/70" : "text-base-content/50"}
                              `}
                            >
                              12:00 PM
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border-t border-base-300/50">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="input input-bordered flex-1 text-sm h-10 rounded-xl"
                          placeholder="Type a message..."
                          value="This is a preview"
                          readOnly
                        />
                        <button className="btn btn-primary h-10 min-h-0 rounded-xl shadow-lg shadow-primary/25">
                          <Send size={16} />
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
    </div>
  );
};
export default SettingsPage;
