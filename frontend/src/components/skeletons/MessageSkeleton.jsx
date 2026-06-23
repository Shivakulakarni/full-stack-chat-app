const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div className={`flex gap-2 ${idx % 2 === 0 ? "" : "flex-row-reverse"}`}>
            <div className="size-8 rounded-full shrink-0">
              <div className="skeleton w-full h-full rounded-full" />
            </div>
            <div>
              <div className={`skeleton h-12 w-[200px] rounded-2xl ${
                idx % 2 === 0 ? "rounded-bl-md" : "rounded-br-md"
              }`} />
              <div className="skeleton h-3 w-12 mt-1 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
