"use client";
import LecturerChat from "@/components/chat/LecturerChat";

const ChatPage = () => {
  return (
    <div className="mx-4 my-2 h-[98%] rounded-md bg-white shadow-md dark:bg-gray-500">
      <h1 className="p-4 text-2xl font-bold text-gray-700 dark:text-gray-300">
        Lecturers Chat
      </h1>
      <div className="mx-4 h-[calc(100%-80px)]">
        <LecturerChat />
      </div>
    </div>
  );
};

export default ChatPage;
