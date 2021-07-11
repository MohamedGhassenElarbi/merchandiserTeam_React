import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SelectMerchandiserPlanning from '../components/SelectMerchandiserPlanning'
import api from 'api';
import TextField from '@material-ui/core/TextField';
import { format, parse } from 'date-fns';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import useChat from 'components/CustomHooks/useChat'
const useStyles = makeStyles((theme) => ({
  container: {
    border: "2px solid #dedede",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0"
  },
  timeRight: { cssFloat: "right", color: "#aaa" },
  containerDarker: {
    border: "2px solid #dedede",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0",
    borderColor: "#ccc", backgroundColor: "#ddd"
  },
  chatContainer: {
    overflowY: 'scroll',
    maxHeight: '400px'
  }

}));



export default function Chat() {
  const userId=localStorage.getItem("USER_ID");

  const classes = useStyles();
  const [merchandiser, setMerchandiser] = useState();
  const [merchandisers, setMerchandisers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setmessage] = useState("");
  const { stompClient } = useChat(userId, onMsg);
  console.log("userId    "+userId);
  useEffect(() => {
    api.get(`http://localhost:8080/api/v1/user/role/MERCHANDISER`)
      .then(res => {
        const merchandisersData = res.data;
        setMerchandisers(merchandisersData);
      })
  }, [])
  useEffect(() => {
    if (!merchandiser) { return; }
    api.get(`http://localhost:8080/api/v1/chat/${merchandiser.id}?count=10&offset=0`)
      .then(res => {
        const messagesData = res.data;
        setMessages(messagesData.messages.reverse());
        console.log(messagesData);
      })

  }, [merchandiser])

  const handleAddMessage= (event)=>{
    console.log("merchandiserId    "+merchandiser.id);
    try {
      if (!stompClient.connected) {
        console.log('not active ');
      }
  
      stompClient.send(
        
        `/app/chat/${merchandiser.id}`,
        {},
        JSON.stringify({
          sender: userId,
          content: message,
        })
      );
    } catch (error) {
      console.log(error);
    }
    setMessages([
      ...messages,
      {
        content: message,
        id: Math.random() * 100, // temporary Id
        senderId: userId,
        date: `${new Date()}`,
      },
    ]);
    setmessage("");
  }

  const handleMessageChange =(event)=>{
    setmessage(event.target.value)
  }
  const onMsg =(message)=>{
    setMessages(old=>{
      return [...old,message];
    })
  }
  return (

    <>
      <SelectMerchandiserPlanning setMerchandiser={setMerchandiser} merchandisers={merchandisers} merchandiser={merchandiser}></SelectMerchandiserPlanning>
      <div className={classes.chatContainer}>
        {merchandiser != undefined ? <div>
          {messages?.map((token) => {
            return (
              <div className={token.senderId != merchandiser.id ? classes.container : classes.containerDarker} key={token.id}>
                <p>{token.content}</p>
                <span className={classes.timeRight}>{format(new Date(token.date), 'yyyy-MM-dd')}</span>
              </div>
            );
          })}

        </div> : <h3>Choisir un merchandiseur</h3>}

      </div>

      <div style={{display:'flex'}}><TextField id="outlined-basic" fullWidth label="Message"  variant="outlined" value={message} onChange={handleMessageChange}></TextField>
        <IconButton aria-label="delete" onClick={handleAddMessage}>
          <SendIcon />
        </IconButton>
      </div>
    </>



  );
}