"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/types";

import Avatar from "@/app/components/Avatar";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const Message: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");


  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden px-6",
    isOwn ? "bg-orange-500 text-white" : "text-black bg-gray-100 dark:bg-gray-500 dark:text-white",
    data.image ? "rounded-md p-0 bg-transparent" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
    <div className={avatar}>
      <Avatar user={data.sender} />
    </div>
    <div className={body}>
      <div className="flex items-center gap-1">
        <div className="text-sm text-gray-500">
          {data.sender.name}
        </div>
        <div className="text-xs text-gray-400">
          {format(new Date(data.createdAt), 'p')}
        </div>
      </div>
      <div className={message}>
        {data.image ? (
          <Image
            alt="Image"
            height="64"
            width="64"
            src={data.image} 
            className="
              bg-transparent
              object-cover 
              cursor-pointer 
              hover:scale-110 
              transition 
              translate
            "
          />
          // "h"
        ) : (
          <div>{data.body}</div>
        )}
      </div>
      {isLast && isOwn && seenList.length > 0 && (
        <div 
          className="
          text-xs 
          font-light 
          text-gray-500
          "
        >
          {`Seen by ${seenList}`}
        </div>
      )}
    </div>
  </div>
  );
};

export default Message;
