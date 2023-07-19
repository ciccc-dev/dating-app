class _filter {
  //   constructor() {
  //     this.socket = io(process.env.REACT_APP_SERVER_URL ?? "");
  //   }

  getFilters = async () => {
    const user = { id: "223e4567-e89b-12d3-a456-426614174000" };
    try {
      const response = await fetch("http://localhost:8000/api/filter", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
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

export const Filter = new _filter();
