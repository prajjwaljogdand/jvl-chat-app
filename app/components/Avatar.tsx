"use client";

import { User } from "@prisma/client";

import useActiveList from "../hooks/useActiveList";
import Image from "next/image";

const Avatar = ({ user }: { user: User | null }) => {
  const { members } = useActiveList();

  return (
    <div className="relative">
      <div
        className="
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-9 
        w-9 
        md:h-11 
        md:w-11
      "
      >
        <Image fill src={user?.image || "/images/avatar.jpg"} alt="Avatar" />
      </div>
    </div>
  );
};

export default Avatar;
