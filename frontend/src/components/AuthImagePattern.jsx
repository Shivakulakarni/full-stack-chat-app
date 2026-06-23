import { MessageSquare } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--bc) / 0.05) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }} />

      <div className="relative z-10 max-w-sm text-center px-8">
        <div className="grid grid-cols-3 gap-2.5 mb-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl transition-all duration-500 ${
                i % 2 === 0 ? "bg-primary/10" : "bg-base-300/40"
              } ${i === 4 ? "ring-2 ring-primary/20" : ""}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {i === 4 && (
                <div className="w-full h-full flex items-center justify-center">
                  <MessageSquare className="size-6 text-primary/30" />
                </div>
              )}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-base-content/40 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
