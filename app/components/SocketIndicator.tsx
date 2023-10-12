'use client'

import { useSocket } from "../context/SocketContext";

export const SocketIndicator = () => {
    const {isConnected} = useSocket();
    if(!isConnected){
        return <div className="bg-red-500 rounded-full p-2 m-2">disconnected</div>
    }

    console.log(isConnected);

    return <div className="bg-green-300">LIVE</div>
}