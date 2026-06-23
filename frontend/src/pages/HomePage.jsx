import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen pt-14 bg-base-200/50">
      <div className="h-[calc(100vh-3.5rem)] max-w-screen-xl mx-auto px-2 sm:px-4 py-2">
        <div className="h-full rounded-2xl border border-base-300/40 bg-base-100 shadow-sm overflow-hidden flex">
          <Sidebar />
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
