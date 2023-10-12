"use client";

import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";

import useOtherUser from "@/app/hooks/useOtherUser";
import useActiveList from "@/app/hooks/useActiveList";

import Avatar from "@/app/components/Avatar";
// import AvatarGroup from "@/app/components/AvatarGroup";
// import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
  conversation: Conversation & {
    participants: User[];
  };
}

const ConvoHeader: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;
  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.participants.length} members`;
    }

    return isActive ? "Online" : "Offline";
  }, [conversation, isActive]);

  return (
    <div className="fixed w-3/4 z-40">
      {/* <ProfileDrawer 
      data={conversation} 
      isOpen={drawerOpen} 
      onClose={() => setDrawerOpen(false)}
    /> */}
      <div
        className="
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
        lg:sticky
        dark:text-white
          dark:bg-gray-800
          dark:border-slate-600
      "
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          "
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? null : ( //   <AvatarGroup users={conversation.users} />
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col text-black  dark:text-white">
            <div>{conversation.name || otherUser.name}</div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="
          text-sky-500
          cursor-pointer
          hover:text-sky-600
          transition
        "
        />
      </div>
    </div>
  );
};

export default ConvoHeader;
