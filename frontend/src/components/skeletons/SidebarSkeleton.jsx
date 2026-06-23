import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-[68px] lg:w-72 border-r border-base-300/40 flex flex-col">
      <div className="p-3 lg:p-4 space-y-3 border-b border-base-300/40">
        <div className="flex items-center gap-2 px-1">
          <Users className="size-4 text-base-content/20" />
          <div className="hidden lg:block skeleton h-4 w-16 rounded-md" />
        </div>
        <div className="hidden lg:block skeleton h-8 w-full rounded-lg" />
        <div className="hidden lg:flex items-center gap-2 px-1">
          <div className="skeleton size-3 rounded" />
          <div className="skeleton h-3 w-20 rounded-md" />
        </div>
      </div>

      <div className="flex-1 py-2 px-1.5 lg:px-2 space-y-1">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl">
            <div className="skeleton size-11 rounded-full shrink-0 mx-auto lg:mx-0" />
            <div className="hidden lg:block flex-1 space-y-1.5">
              <div className="skeleton h-3.5 w-24 rounded-md" />
              <div className="skeleton h-3 w-12 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
