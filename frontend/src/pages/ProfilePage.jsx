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
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 bg-base-200">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Link
                to="/"
                className="btn btn-ghost btn-sm btn-circle hover:bg-base-200/50"
              >
                <ArrowLeft className="size-5" />
              </Link>
              <h1 className="text-xl font-bold">Profile</h1>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center -mt-12 px-6">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-28 rounded-full object-cover border-4 border-base-100 shadow-lg"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-1 right-1 
                  bg-primary hover:bg-primary/80
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200 shadow-lg
                  opacity-0 group-hover:opacity-100
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-100" : ""}
                `}
              >
                <Camera className="w-4 h-4 text-primary-content" />
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
            <p className="text-sm text-base-content/40 mt-2">
              {isUpdatingProfile ? "Uploading..." : "Hover to change photo"}
            </p>
          </div>

          {/* Info */}
          <div className="p-6 space-y-4 mt-4">
            <div className="space-y-1.5">
              <div className="text-xs text-base-content/50 flex items-center gap-2 uppercase tracking-wider font-medium">
                <User className="w-3.5 h-3.5" />
                Full Name
              </div>
              <p className="px-4 py-3 bg-base-200/50 rounded-xl text-sm">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs text-base-content/50 flex items-center gap-2 uppercase tracking-wider font-medium">
                <Mail className="w-3.5 h-3.5" />
                Email Address
              </div>
              <p className="px-4 py-3 bg-base-200/50 rounded-xl text-sm">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="px-6 pb-6">
            <div className="bg-base-200/30 rounded-xl p-5">
              <h2 className="text-sm font-semibold mb-4 uppercase tracking-wider">
                Account Information
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-base-300/50">
                  <span className="text-base-content/60">Member Since</span>
                  <span className="font-medium">
                    {authUser.createdAt?.split("T")[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-base-content/60">Account Status</span>
                  <span className="flex items-center gap-1.5 text-green-500 font-medium">
                    <span className="size-2 rounded-full bg-green-500 animate-pulse" />
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
