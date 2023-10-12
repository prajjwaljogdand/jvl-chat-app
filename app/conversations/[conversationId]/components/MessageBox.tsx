"use client";

import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import Button from "@/app/components/buttons/Button";
import { MdSentimentSatisfiedAlt } from "react-icons/md";

const MessageBox = () => {
  const { conversationId } = useConversation();
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId: conversationId,
    });
  };

  const handleUpload = (emoji: any) => {
    axios.post("/api/messages", {
      image: emoji.imageUrl,
      conversationId: conversationId,
    });
  };

  return (
    <div className="fixed w-3/4 z-50 bottom-0">
      {isEmojiOpen && (
        <EmojiPicker
          onEmojiClick={(emo) => handleUpload(emo)}
          autoFocusSearch={true}
        />
      )}
      <div
        className="
        py-4 
        px-8 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      dark:text-white
       dark:bg-gray-800
       dark:border-slate-600
      "
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2 lg:gap-4 w-full"
        >
          <Button secondary onClick={() => setIsEmojiOpen(!isEmojiOpen)}>
            <MdSentimentSatisfiedAlt size={32} />
          </Button>

          <MessageInput
            id="message"
            register={register}
            errors={errors}
            required
            placeholder="Type a message"
            onFocus={() => setIsEmojiOpen(false)}
          />
          <button
            type="submit"
            className="
            rounded-full 
            p-2 
            bg-orange-500 
            cursor-pointer 
            hover:bg-orange-600
            transition
          "
          >
            <HiPaperAirplane size={18} className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageBox;
