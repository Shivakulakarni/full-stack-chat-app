import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300/50 
    flex flex-col transition-all duration-300 bg-base-100/50"
    >
      <div className="border-b border-base-300/50 w-full p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-base-content/30" />
          <span className="font-semibold hidden lg:block text-base-content/30">Contacts</span>
        </div>
        <div className="hidden lg:block skeleton h-8 w-full rounded-xl" />
      </div>

      <div className="overflow-y-auto w-full py-3 px-2">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3 rounded-xl">
            <div className="relative mx-auto lg:mx-0 shrink-0">
              <div className="skeleton size-12 rounded-full" />
            </div>
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-28 mb-2 rounded-lg" />
              <div className="skeleton h-3 w-14 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
