import { useEffect, useRef, useState } from "react";
import BackNav from "../backNav/BackNav";
import "./DM.scss";
import { Form, useParams } from "react-router-dom";
import { IconSend } from "@tabler/icons-react";
import { useFetch } from "../../hooks/useFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import TextBubble from "./TextBubble";
import TextareaAutosize from "react-textarea-autosize";
import { useAuthContext } from "../../hooks/useAuthContext";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Loader from "../Loaders/Loader";
import BadRequest from "../../pages/Error/BadRequest";

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const DM = () => {
  const { user } = useAuthContext();
  const currUserId = Number(user.id);
  const { chatId } = useParams();
  const myFetch = useFetch();
  const queryClient = useQueryClient();
  //README we need the socket connect to stay the same throughout rerenders
  const [input, setInput] = useState("");
  const socketRef = useRef(null);
  const bottomChatRef = useRef(null);
  const inputRef = useRef(null); //to focus on input

  // fetch initial message with useQuery
  const { data, isPending, isError } = useQuery({
    queryFn: () => myFetch(`/chats/${chatId}`), //Backend verfies user is part of the chart so no issue
    queryKey: ["DM", chatId],
  });

  useEffect(() => {
    if (bottomChatRef.current)
      bottomChatRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages]);
  useEffect(() => {
    //connect to socket server and allow receiving of messages
    socketRef.current = io.connect(VITE_SERVER_URL);
    socketRef.current.emit("join_DM", chatId);
    socketRef.current.on("receive message", (msg) => {
      //socket receive new message from other party
      queryClient.setQueryData(["DM", chatId], (old) => ({
        ...old,
        messages: [
          ...old.messages,
          {
            ...msg,
            fromUser: msg.senderId === currUserId,
          },
        ],
      }));
    });

    //shortcut to send text
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSubmit(e);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      if (socketRef.current) {
        socketRef.current.off("receive message");
        socketRef.current.disconnect();
      }
      document.removeEventListener("keydown", handleKeyDown);
    }; //Disconenct from room when component unmounet
  }, []);

  // send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (input) => {
      // console.log("emiting:",chatId,input,currUserId)
      socketRef.current.emit("send message", {
        chatId,
        input,
        senderId: currUserId,
      });
    },
    onSuccess: () => {
      queryClient.setQueryData(["DM", chatId], (old) => ({
        ...old,
        messages: [
          ...old.messages,
          {
            content: inputRef.current.value,
            createdAt: new Date().toISOString(),
            senderId: user.id,
            chatId,
            fromUser: true,
          },
        ],
      }));
      setInput("");
    },
    onError: (error, variables, context) => {
      console.log("Error sending message: ", error);
      toast.warn("Error sending message. Please try again later.");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim()) {
      sendMessageMutation.mutate(inputRef.current.value);
    }
  };

  return (
    <div className="content DM">
      <div>
        <BackNav
          label={(data && data.otherUser.username) || ""}
          customNav="/p/message"
        />
        {isPending ? (
          <div>
            <Loader loading={isPending} />
          </div>
        ) : isError ? (
          <BadRequest />
        ) : (
          <div className="chat-messages">
            {data.messages.map((msg, i) => (
              <>
                {i > 1 &&
                  data.messages[i].createdAt.substring(0, 10) !=
                    data.messages[i - 1].createdAt.substring(0, 10) && (
                    <p className="msg-date">
                      {format(
                        new Date(data.messages[i].createdAt),
                        "EEE, do MMM yyyy",
                      )}
                    </p>
                  )}
                <TextBubble key={i} message={msg} />
              </>
            ))}
            <div id="bottomChatRef" ref={bottomChatRef}></div>
          </div>
        )}
        <div className="chat-input">
          <Form onSubmit={handleSubmit}>
            <TextareaAutosize
              ref={inputRef}
              maxRows={3}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              placeholder={"Enter a message..."}
            />
            <button type="submit">
              <IconSend size={16} />
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DM;
