import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./authContext";
import {io} from "socket.io-client";


const SocketContext = createContext();
export const useSocketContext = ()=>{
  return useContext(SocketContext);
}

export const SocketContextProvider = ({children})=>{
  const [socket,setSocket] = useState(null);
  const [onlineUsers,setOnlineUsers] = useState([]);
  const {currentUser} = useContext(AuthContext);


  useEffect(()=>{
    if (currentUser){
      const socket = io("http://localhost:8080",{
        query:{
          userId:currentUser.id
        }
      });
      setSocket(socket);

      //socket.on() is used to listen to the events,
      // can be used both on client and server side
      socket.on("getOnlineUsers",(users)=>{
        setOnlineUsers(users)
      })

      return ()=> socket.close();
    }else {
      if (socket){
        socket.close();
        setSocket(null);
      }
    }
  },[currentUser])

  const values = {
    socket,
    onlineUsers
  }
  return (
    <SocketContext.Provider value={values}>
      {children}
    </SocketContext.Provider>
  );
}