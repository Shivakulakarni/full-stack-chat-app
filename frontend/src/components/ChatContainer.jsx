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
    <div className="flex-1 flex flex-col overflow-hidden">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
        {messages.map((message, index) => {
          const isOwn = message.senderId === authUser._id;
          const showAvatar =
            index === 0 || messages[index - 1]?.senderId !== message.senderId;
          const isLastInGroup =
            index === messages.length - 1 || messages[index + 1]?.senderId !== message.senderId;

          return (
            <div
              key={message._id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"} ${showAvatar ? "mt-3" : "mt-0.5"}`}
              ref={index === messages.length - 1 ? messageEndRef : null}
            >
              <div
                className={`
                  flex gap-2 max-w-[70%] ${isOwn ? "flex-row-reverse" : "flex-row"}
                  ${!showAvatar && !isOwn ? "pl-[42px]" : ""}
                  ${!showAvatar && isOwn ? "pr-[42px]" : ""}
                `}
              >
                {showAvatar && !isOwn && (
                  <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt=""
                    className="size-8 rounded-full object-cover mt-auto shrink-0"
                  />
                )}

                <div className={`
                  ${showAvatar && isOwn ? "mr-0" : ""}
                  ${!isLastInGroup ? (isOwn ? "mr-0" : "ml-0") : ""}
                `}>
                  <div
                    className={`
                      px-3.5 py-2 text-[13.5px] leading-relaxed
                      ${isOwn
                        ? isLastInGroup
                          ? "bg-primary text-primary-content rounded-2xl rounded-br-md"
                          : "bg-primary text-primary-content rounded-2xl rounded-r-md"
                        : isLastInGroup
                          ? "bg-base-200 text-base-content rounded-2xl rounded-bl-md"
                          : "bg-base-200 text-base-content rounded-2xl rounded-l-md"
                      }
                    `}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[240px] rounded-xl mb-2"
                      />
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>
                  {isLastInGroup && (
                    <time
                      className={`text-[10px] mt-1 block px-1 text-base-content/30 ${
                        isOwn ? "text-right" : "text-left"
                      }`}
                    >
                      {formatMessageTime(message.createdAt)}
                    </time>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <div className="size-12 rounded-full bg-base-200 flex items-center justify-center mx-auto">
                <span className="text-xl">💬</span>
              </div>
              <p className="text-sm text-base-content/40">
                No messages yet. Start the conversation!
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
