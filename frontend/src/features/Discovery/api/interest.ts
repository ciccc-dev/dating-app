class _interestClient {
  getInterests = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/interests", {
        method: "GET",
        mode: "cors",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw error;
    }
  };
}

export const InterestClient = new _interestClient();
