import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full border-t border-base-300/30 bg-base-100/25 backdrop-blur-sm">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2 animate-in">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="size-16 object-cover rounded-xl border border-base-300 shadow-md"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300
              flex items-center justify-center border border-base-100 hover:bg-red-500 hover:text-white transition-colors"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full bg-base-100/40 border border-base-300/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`flex btn btn-circle btn-md border border-base-300/50 bg-base-100/40 hover:bg-base-200/50 hover:scale-[1.02] active:scale-[0.98] transition-all
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={18} />
          </button>
        </div>

        <button
          type="submit"
          className={`
            size-9 rounded-xl inline-flex items-center justify-center shrink-0
            transition-all duration-200
            ${text.trim() || imagePreview
              ? "bg-primary text-primary-content shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95"
              : "bg-base-200 text-base-content/20"
            }
          `}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
