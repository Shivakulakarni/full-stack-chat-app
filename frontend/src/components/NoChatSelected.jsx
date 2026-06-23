import { MessageSquare, Zap, Users, Shield } from "lucide-react";

const features = [
  { icon: Zap, text: "Real-time messaging", color: "text-yellow-500" },
  { icon: Users, text: "Group conversations", color: "text-blue-500" },
  { icon: Shield, text: "Secure & private", color: "text-green-500" },
];

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/30">
      <div className="max-w-md text-center space-y-8 animate-fade-in">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center animate-float">
              <MessageSquare className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold">Welcome to Chatty</h2>
          <p className="text-base-content/50">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-base-200/50 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <feature.icon className={`size-5 ${feature.color}`} />
              <span className="text-sm text-base-content/70">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
