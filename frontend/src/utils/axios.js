import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 1000,
  withCredentials: true,
});

async function createPost(formData) {
  try {
    const token = localStorage.getItem("token");
    const payload = { user: "", team: "", ...formData };
    console.log("payload", payload);
    const response = await API.post("/notes/", payload, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response;
  } catch (e) {
    throw Error(e);
  }
}
export { createPost, API };
