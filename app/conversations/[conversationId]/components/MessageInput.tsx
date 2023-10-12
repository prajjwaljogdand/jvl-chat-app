'use client';

import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister
} from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors;
  onFocus: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  placeholder, 
  id, 
  type, 
  required, 
  register, 
  onFocus
}) => {
  return (
    <div className="relative w-full" onClick={() => onFocus()}>
      <input
        id={id}
        type={type}
        autoComplete="off"
        {...register(id, { required })}
        placeholder={placeholder}
        className="
          text-black
          font-light
          py-2
          px-4
          bg-neutral-100 
          w-full 
          rounded-full
          focus:outline-none
          dark:text-white
          dark:bg-gray-700
        "
      />
    </div>
   );
}
 
export default MessageInput;