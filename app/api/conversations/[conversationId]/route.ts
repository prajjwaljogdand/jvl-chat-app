import getCurrentUser from "@/queries/getCurrentUser";
import { NextResponse } from "next/server";

import db from "@/connections/db";
import { pusherServer } from "@/connections/pusher";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    const existingConversation = await db.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        participants: true
      }
    });

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deletedConversation = await db.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id]
        },
      },
    });

    existingConversation.participants.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
      }
    });

    return NextResponse.json(deletedConversation)
  } catch (error) {
    return NextResponse.json(null);
  }
}