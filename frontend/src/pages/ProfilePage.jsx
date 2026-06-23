import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setSelectedImg(reader.result);
      await updateProfile({ profilePic: reader.result });
    };
  };

  return (
    <div className="min-h-screen pt-20 bg-base-200/50">
      <div className="max-w-lg mx-auto p-4 py-10 animate-in">
        <div className="rounded-2xl border border-base-300/40 bg-base-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-base-300/40">
            <Link to="/" className="size-8 inline-flex items-center justify-center rounded-lg hover:bg-base-200/60 transition-colors">
              <ArrowLeft className="size-4" />
            </Link>
            <h1 className="text-base font-semibold">Profile</h1>
          </div>

          <div className="flex flex-col items-center px-6 pt-8 pb-6">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-24 rounded-full object-cover ring-4 ring-base-200"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute inset-0 rounded-full bg-black/40 flex items-center justify-center
                  opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200
                  ${isUpdatingProfile ? "opacity-100 pointer-events-none" : ""}
                `}
              >
                {isUpdatingProfile ? (
                  <div className="size-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera className="size-5 text-white" />
                )}
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-xs text-base-content/30 mt-3">
              {isUpdatingProfile ? "Uploading..." : "Click to change photo"}
            </p>
          </div>

          <div className="px-6 pb-6 space-y-3">
            <div>
              <label className="text-[11px] font-medium text-base-content/40 uppercase tracking-wider">Name</label>
              <div className="mt-1 px-3.5 py-2.5 rounded-xl bg-base-200/40 border border-base-300/40 text-sm">
                {authUser?.fullName}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-medium text-base-content/40 uppercase tracking-wider">Email</label>
              <div className="mt-1 px-3.5 py-2.5 rounded-xl bg-base-200/40 border border-base-300/40 text-sm">
                {authUser?.email}
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <div className="rounded-xl bg-base-200/30 border border-base-300/40 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/40 mb-3">
                Account Details
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-base-content/50">Joined</span>
                  <span className="font-medium">{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/50">Status</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-500 font-medium text-xs">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
