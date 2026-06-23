import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 md:p-6 overflow-hidden bg-gradient-to-br from-base-300 via-base-200 to-base-300 pt-20">
      {/* Interactive Background Elements */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[90px] float-slow" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[90px] float-medium" />

      {/* Main Chat Container */}
      <div className="relative z-10 w-full max-w-6xl h-[calc(100vh-6.5rem)] glass-premium rounded-3xl overflow-hidden shadow-2xl border border-white/5 animate-in">
        <div className="flex h-full">
          <Sidebar />

          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
