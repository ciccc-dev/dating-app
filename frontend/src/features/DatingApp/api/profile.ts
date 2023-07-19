class _profiles {
  //   constructor() {
  //     this.socket = io(process.env.REACT_APP_SERVER_URL ?? "");
  //   }
  //   initialLoad = (user: User) => {
  //     this.socket.emit("initial_load", { userId: user.sub });
  //     console.log(user);
  //   };
  getProfiles = async () => {
    const filters = {
      age: 20,
      gender: "Male",
    };
    try {
      const response = await fetch("http://localhost:8000/api/profiles", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };
}

export const Profiles = new _profiles();
