class _discoveryClient {
  //   constructor() {
  //     this.socket = io(process.env.REACT_APP_SERVER_URL ?? "");
  //   }
  //   initialLoad = (user: User) => {
  //     this.socket.emit("initial_load", { userId: user.sub });
  //     console.log(user);
  //   };
}

export const DiscoveryClient = new _discoveryClient();
