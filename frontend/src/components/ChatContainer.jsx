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
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-100/30">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => {
          const isOwn = message.senderId === authUser._id;
          const showAvatar =
            index === 0 ||
            messages[index - 1]?.senderId !== message.senderId;

          return (
            <div
              key={message._id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"} animate-fade-in`}
              ref={index === messages.length - 1 ? messageEndRef : null}
            >
              <div
                className={`
                  flex gap-2 max-w-[75%] ${isOwn ? "flex-row-reverse" : "flex-row"}
                  ${showAvatar ? "mt-3" : "mt-0.5"}
                `}
              >
                {showAvatar && (
                  <div className="shrink-0 mt-1">
                    <div className="size-8 rounded-full overflow-hidden ring-1 ring-base-300/50">
                      <img
                        src={
                          isOwn
                            ? authUser.profilePic || "/avatar.png"
                            : selectedUser.profilePic || "/avatar.png"
                        }
                        alt="profile pic"
                      />
                    </div>
                  </div>
                )}

                <div className={`${!showAvatar && !isOwn ? "ml-10" : ""} ${!showAvatar && isOwn ? "mr-10" : ""}`}>
                  <div
                    className={`
                      rounded-2xl px-4 py-2.5 shadow-sm
                      ${
                        isOwn
                          ? "bg-primary text-primary-content rounded-br-md"
                          : "bg-base-200 text-base-content rounded-bl-md"
                      }
                    `}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[250px] rounded-lg mb-2"
                      />
                    )}
                    {message.text && <p className="text-sm leading-relaxed">{message.text}</p>}
                  </div>
                  <time
                    className={`text-[10px] mt-1 block px-1 text-base-content/40 ${
                      isOwn ? "text-right" : "text-left"
                    }`}
                  >
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          );
        })}

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-base-content/40">
            <p className="text-sm">No messages yet. Say hello!</p>
          </div>
        )}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
