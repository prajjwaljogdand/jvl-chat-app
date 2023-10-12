"use client";

import { User } from "@prisma/client";

import UserBox from "./UserBox";
import SearchInput from "./SearchInput";
import Input from "@/app/components/Input";

import { MdSearch } from "react-icons/md";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  const [usersList, setUserList] = useState<User[]>(items);
  const [searchMode, setSearchMode] = useState(false);
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setValue("user", "", { shouldValidate: true });
      console.log("searching", usersList);

      const response = await axios.get(`/api/search?name=${data.search}`);

      console.log("response", response);

      if (response.status === 200) {
        setUserList(response.data);
        console.log("Search results:", response.data);
      } else {
        console.error("Error searching for users:", response.statusText);
      }
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  return (
    <aside
      className="
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
        block w-full left-0
        dark:bg-gray-800
      "
    >
      <div className="px-5">
        <div className="flex-col">
          <div className=" py-2 bg-white  border-b dark:border-slate-600 flex items-center gap-2 lg:gap-4 w-full dark:bg-gray-800 dark:text-white">
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
                <MdSearch size={18} className="text-black dark:text-white" />
              </button>
            </form>
          </div>
          <div className="flex justify-between items-center">
            <div
              className="
              text-2xl 
              font-bold 
              text-neutral-800 
              py-4
              dark:text-white
            "
            >
              Friends
            </div>
            <div onClick={()=>setUserList(items)} className="cursor-pointer">all</div>
          </div>
        </div>
        {usersList.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
