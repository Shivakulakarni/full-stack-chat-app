const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
          <div className={`flex gap-2 ${idx % 2 === 0 ? "" : "flex-row-reverse"}`}>
            {idx % 2 === 0 && <div className="skeleton size-8 rounded-full shrink-0" />}
            <div>
              <div className={`skeleton h-10 w-[180px] rounded-2xl ${
                idx % 2 === 0 ? "rounded-bl-md" : "rounded-br-md"
              }`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
