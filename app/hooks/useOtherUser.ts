import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (conversation: FullConversationType | { participants: User[] }) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    const otherUser = conversation.participants.filter((user) => user.email !== currentUserEmail);

    return otherUser[0];
  }, [session.data?.user?.email, conversation.participants]);

  return otherUser;
};

export default useOtherUser;