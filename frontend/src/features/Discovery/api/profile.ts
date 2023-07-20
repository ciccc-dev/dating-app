class _profileClient {
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
        return data;
      } else {
        throw new Error();
      }
    } catch (error: any) {
      throw error;
    }
  };
}

export const ProfileClient = new _profileClient();
