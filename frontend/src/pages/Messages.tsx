import { useState, SyntheticEvent } from "react";
import { Button, Tab, Tabs, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { useEffect } from "react";
import io from "socket.io-client";

interface Chat {
  id: string;
  messages: Message[];
}

interface Message {
  time: string;
  text: string;
}

export const Messages = () => {
  const socket = io(process.env.REACT_APP_SERVER_URL ?? "");
  const [tabIndexState, setTabIndex] = useState(0);
  const tabValues = ["user1", "user2", "user3"];
  const [chat, setChat] = useState<Chat>({ id: "", messages: [] });

  socket.on("hello", (message) => {
    console.log(message);
  });
  socket.on("messages", (message) => {
    console.log(message);
    setChat(message);
  });

  useEffect(() => {
    socket.emit("choose_user", {
      message: "aaaaaaaaaaaaaaaaaaaaaaaa",
      room: tabValues[tabIndexState],
    });
  }, []);

  const handleChange = (e: SyntheticEvent) => {
    const tabIndex = tabValues.indexOf(e.currentTarget.textContent as string);
    setTabIndex(tabIndex);
    socket.emit("joined-user", {
      message: "hoge",
      room: tabValues[tabIndex],
    });
    socket.emit("choose_user", {
      message: "aaaaaaaaaaaaaaaaaaaaaaaa",
      room: tabValues[tabIndex],
    });
  };

  const handleSendMessage = () => {
    socket.emit("message", "hello world");
    socket.emit("joined-user", {
      message: "hoge",
      room: tabValues[tabIndexState],
    });
  };

  return (
    <>
      <Box>
        <Tabs
          value={tabIndexState}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <StyledTab label="user1" />
          <StyledTab label="user2" />
          <StyledTab label="user3" />
        </Tabs>
      </Box>
      {chat.messages.map((message) => {
        return <div>{message.text}</div>;
      })}
      <Box>
        <StyledTextField
          fullWidth
          margin="normal"
          rows={1}
          multiline
          variant="outlined"
          placeholder="Message"
        />
        <StyledButton onClick={handleSendMessage}>Send</StyledButton>
      </Box>
    </>
  );
};

const StyledTab = styled(Tab)`
  font-size: 10px;
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 5%;
  bottom: 0;
`;
const StyledTextField = styled(TextField)`
  position: absolute;
  width: 70%;
  bottom: 0;
`;
