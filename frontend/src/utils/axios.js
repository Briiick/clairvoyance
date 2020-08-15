import axios from "axios";

const API = axios.create({
  baseURL: "http://clairvoyance.athanium.com/api/v1/",
  timeout: 1000,
  withCredentials: true,
});

const token = localStorage.getItem("clairovoyanceToken");

async function createPost(formData) {
  try {
    const payload = { user: "", team: "", ...formData };
    console.log("payload", payload);
    const response = await API.post("/posts/", payload, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response;
  } catch (e) {
    throw Error(e);
  }
}

async function getGoals() {
  try {
    // const payload = { user: "", team: "", ...formData };
    const response = await API.get("/goals/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response;
  } catch (e) {
    throw Error(e);
  }
}
async function getHabits() {
  try {
    // const payload = { user: "", team: "", ...formData };
    const response = await API.get("/habits/", {
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
    return e;
  }
}

export { createPost, getGoals, getHabits, register, login, API };
