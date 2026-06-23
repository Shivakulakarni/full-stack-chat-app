import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-base-100/10 backdrop-blur-sm">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {messages.map((message, index) => {
          const isOwn = message.senderId === authUser._id;
          const showAvatar =
            index === 0 || messages[index - 1]?.senderId !== message.senderId;

          return (
            <div
              key={message._id}
              className={`flex items-end gap-2.5 ${isOwn ? "justify-end" : "justify-start"} ${showAvatar ? "mt-4" : "mt-1"} animate-in`}
              ref={index === messages.length - 1 ? messageEndRef : null}
            >
              {/* Receiver's Avatar (only show if it is the first message in a group from that sender) */}
              {!isOwn && (
                <div className="w-8.5 shrink-0">
                  {showAvatar ? (
                    <img
                      src={selectedUser.profilePic || "/avatar.png"}
                      alt="profile pic"
                      className="size-8.5 rounded-xl object-cover shadow-sm border border-base-300/40"
                    />
                  ) : (
                    <div className="size-8.5" />
                  )}
                </div>
              )}

              <div className={`flex flex-col max-w-[70%] sm:max-w-[60%] ${isOwn ? "items-end" : "items-start"}`}>
                <div
                  className={`
                    px-4 py-2.5 rounded-2xl shadow-sm text-sm relative group overflow-hidden
                    ${
                      isOwn
                        ? "bg-gradient-to-tr from-primary to-purple-600 text-primary-content rounded-br-none"
                        : "bg-base-200/70 border border-base-300/40 text-base-content rounded-bl-none"
                    }
                  `}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-full sm:max-w-[240px] rounded-xl mb-2 object-cover border border-black/5 hover:scale-[1.02] transition-transform duration-200"
                    />
                  )}
                  {message.text && <p className="leading-relaxed break-words">{message.text}</p>}
                </div>
                
                {/* Message Timestamp */}
                <span className="text-[10px] text-zinc-500 mt-1 mx-1 font-medium tracking-tight">
                  {formatMessageTime(message.createdAt)}
                </span>
              </div>

              {/* Sender's Avatar (only show if it is the first message in a group from me) */}
              {isOwn && (
                <div className="w-8.5 shrink-0">
                  {showAvatar ? (
                    <img
                      src={authUser.profilePic || "/avatar.png"}
                      alt="profile pic"
                      className="size-8.5 rounded-xl object-cover shadow-sm border border-base-300/40"
                    />
                  ) : (
                    <div className="size-8.5" />
                  )}
                </div>
              )}
            </div>
          );
        })}

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
            <div className="text-center space-y-2 max-w-xs">
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto text-primary">
                💬
              </div>
              <p className="text-sm font-semibold text-base-content/80 mt-2">
                No messages yet
              </p>
              <p className="text-xs text-base-content/40">
                Send a message or an image to start the conversation!
              </p>
            </div>
          </div>
        )}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
