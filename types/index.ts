import {  Conversation, Message, User } from "@prisma/client";
import { Server as NetServer, Socket } from 'net';
import { NextApiRequest, NextApiResponse } from 'next';
import {Server as SocketIOServer} from 'socket.io';

export type FullMessageType = Message & {
  sender: User, 
  seen: User[]
};

export type FullConversationType = Conversation & { 
  participants: User[]; 
  messages: FullMessageType[]
};

export type NextApiResponseServerIO = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io : SocketIOServer;
        }
    }
}