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
    <div className="min-h-screen relative flex flex-col items-center justify-start p-4 overflow-y-auto bg-gradient-to-br from-base-300 via-base-200 to-base-300 pt-28 pb-10">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[80px] float-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-secondary/10 blur-[80px] float-medium" />

      <div className="relative z-10 w-full max-w-md glass-premium rounded-3xl shadow-2xl border border-white/5 animate-in">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
          <Link to="/" className="size-8 inline-flex items-center justify-center rounded-xl hover:bg-base-100/50 transition-colors text-base-content/70">
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="text-base font-bold tracking-tight">Account Profile</h1>
        </div>

        <div className="flex flex-col items-center px-6 pt-6 pb-4">
          <div className="relative group">
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="Profile"
              className="size-24 rounded-2xl object-cover ring-4 ring-primary/20 shadow-lg"
            />
            <label
              htmlFor="avatar-upload"
              className={`
                absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center
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
          <p className="text-[11px] text-base-content/40 mt-3 font-medium">
            {isUpdatingProfile ? "Uploading..." : "Click image to change photo"}
          </p>
        </div>

        <div className="px-6 pb-5 space-y-4">
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold text-base-content/65">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <User className="size-4.5 text-base-content/40" />
              </div>
              <div className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-base-300 bg-base-100/20 text-sm font-semibold select-all">
                {authUser?.fullName}
              </div>
            </div>
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text text-xs font-semibold text-base-content/65">Email Address</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="size-4.5 text-base-content/40" />
              </div>
              <div className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-base-300 bg-base-100/20 text-sm font-semibold select-all">
                {authUser?.email}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="rounded-2xl bg-base-100/30 border border-base-300/40 p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/50">
              Workspace Details
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-base-content/60 font-medium">Joined Date</span>
                <span className="font-semibold">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base-content/60 font-medium">Connection Status</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-500 font-semibold">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Node
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
