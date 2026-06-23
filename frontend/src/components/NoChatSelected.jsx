import { MessageSquare, Zap, Users, Lock } from "lucide-react";

const features = [
  { icon: Zap, label: "Instant real-time messaging", color: "text-amber-500 bg-amber-500/10" },
  { icon: Users, label: "Chat with multiple people", color: "text-blue-500 bg-blue-500/10" },
  { icon: Lock, label: "End-to-end privacy", color: "text-emerald-500 bg-emerald-500/10" },
];

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 animate-in">
      <div className="max-w-sm text-center space-y-6">
        <div className="relative mx-auto w-fit">
          <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center float">
            <MessageSquare className="size-8 text-primary" />
          </div>
          <div className="absolute -top-0.5 -right-0.5 size-4 bg-emerald-500 rounded-full flex items-center justify-center ring-2 ring-base-100">
            <div className="size-1.5 bg-white rounded-full" />
          </div>
        </div>

        <div className="space-y-1.5">
          <h2 className="text-xl font-bold">Welcome to Chatty</h2>
          <p className="text-sm text-base-content/40 leading-relaxed">
            Select a conversation to start messaging
          </p>
        </div>

        <div className="space-y-2">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-base-200/40 slide-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`size-8 rounded-lg flex items-center justify-center ${f.color}`}>
                <f.icon className="size-4" />
              </div>
              <span className="text-sm text-base-content/60">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
