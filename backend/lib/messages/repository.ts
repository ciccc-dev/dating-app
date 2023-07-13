export const fetchMessagesByRoom = (roomId: string) => {
  const allMessages = [
    {
      id: "user1",
      messages: [
        {
          time: "2023-07-13 23:34",
          user: "aaaaaaaaaaaaaaa",
          text: "Hello, Jay",
        },
        {
          time: "2023-07-13 23:35",
          user: "bbbbbbbbbbbbbbb",
          text: "Hello, Ann",
        },
      ],
    },
    {
      id: "user2",
      messages: [
        {
          time: "2023-07-13 23:34",
          user: "aaaaaaaaaaaaaaa",
          text: "Hello, Yuta",
        },
        {
          time: "2023-07-13 23:35",
          user: "bbbbbbbbbbbbbbb",
          text: "Hello, Yuri",
        },
      ],
    },
    {
      id: "user3",
      messages: [
        {
          time: "2023-07-13 23:34",
          user: "aaaaaaaaaaaaaaa",
          text: "Hello, Gen",
        },
        {
          time: "2023-07-13 23:35",
          user: "bbbbbbbbbbbbbbb",
          text: "Hello, Yui",
        },
      ],
    },
  ];

  return allMessages.find((message) => message.id === roomId);
};
