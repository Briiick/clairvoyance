import axios from "axios";

// this creates our instance for Axios, a library used to make promise-based HTTP requests
// the instance allows you to set common settings for all requests
const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 1000,
  withCredentials: true,
});

// 
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
