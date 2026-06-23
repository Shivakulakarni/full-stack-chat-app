import { MessageSquare } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <div className="max-w-md text-center relative z-10">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl transition-all duration-500
                ${i % 2 === 0
                  ? "bg-primary/15 animate-pulse"
                  : "bg-base-300/50 hover:bg-primary/10"
                }
                ${i === 4 ? "ring-2 ring-primary/20" : ""}
              `}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {i === 4 && (
                <div className="w-full h-full flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-primary/40" />
                </div>
              )}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-base-content/60 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
