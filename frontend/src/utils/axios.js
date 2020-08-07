import axios from "axios";

const API = axios.create({
  baseURL: "http://clairvoyance-backend.us-west-2.elasticbeanstalk.com/api/v1",
  timeout: 1000,
  withCredentials: true,
});

async function createPost(formData) {
  try {
    const token = localStorage.getItem("token");
    const payload = { user: "", team: "", ...formData };
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

async function register(data) {
  try {
    const payload = {
      username: data.username,
      email: data.email,
      password1: data.password,
      password2: data.cpassword,
    };
    const response = await API.post("/users/registration/", payload);
    return response;
  } catch (e) {
    throw Error(e);
  }
}

async function login(data) {
  try {
    const payload = {
      email: data.email,
      password: data.password,
    };
    const response = await API.post("/users/login/", payload);
    return response;
  } catch (e) {
    throw Error(e);
  }
}

export { createPost, register, login, API };
