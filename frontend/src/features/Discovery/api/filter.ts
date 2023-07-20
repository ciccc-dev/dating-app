class _filterClient {
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
        return data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };
}

export const FilterClient = new _filterClient();
