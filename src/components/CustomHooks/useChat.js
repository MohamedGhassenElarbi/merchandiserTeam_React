import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const stompClient = Stomp.over(() => new SockJS(`http://localhost:8080/chat`));
const useChat = (subscribeId, handleMessage) => {
    
    useEffect(() => {
        console.log( "subscribedId    "+subscribeId);
        const jwt = localStorage.getItem("TOKEN_KEY");
        const headers = { Authorization: `${jwt}` };
        stompClient.connectHeaders = headers;
        stompClient.reconnectDelay = 5000;
        stompClient.onStompError = () => {
            console.log('socket error');
        };
        stompClient.onConnect = () => {
            stompClient.subscribe(
                `/topic/messages/${subscribeId}`,
                (payload) => {
                    handleMessage(JSON.parse(payload.body));
                },
                headers
            );

        };
        stompClient.activate();
        return () => {
			if (stompClient.active) stompClient.deactivate();
		};

    }, [])
    return(
      {stompClient}  
    )

}
export default useChat;