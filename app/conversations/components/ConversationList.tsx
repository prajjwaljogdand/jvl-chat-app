"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import clsx from "clsx";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import Input from "@/app/components/inputs/Input";

import { MdSearch } from "react-icons/md";
import SearchInput from "./SearchInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { pusherClient } from "@/connections/pusher";
import { find } from "lodash";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });
    };

    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:remove", removeHandler);
  }, [pusherKey, router]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      user: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("user", "", { shouldValidate: true });
    console.log("searching", data);
    // axios.post("/api/search", {
    //   ...data,
    //   conversationId: conversationId,
    // });
  };

  return (
    <div>
      <aside
        className={clsx(
          `
    fixed 
    inset-y-0 
    pb-20
    lg:pb-0
    lg:left-20 
    lg:w-80 
    lg:block
    overflow-y-auto 
    border-r 
    border-gray-200 
    dark:bg-gray-800
    dark:text-white
    dark:border-slate-600
  `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex flex-col justify-between mb-4 pt-4">
            <div
              className="
        py-2 
        bg-white 
        border-b 
        dark:border-slate-600
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
        dark:bg-gray-800
        dark:text-white
      "
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full"
              >
                <SearchInput
                  id="search"
                  register={register}
                  errors={errors}
                  required
                  placeholder="Search for friend"
                />
                <button
                  type="submit"
                  className="rounded-full p-2 bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-orange-600 transition"
                >
                  <MdSearch
                    size={18}
                    className="text-black dark:text-white"
                  />
                </button>
              </form>
            </div>
            <div className="text-2xl font-bold text-neutral-800 dark:text-white">
              Messages
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default ConversationList;
