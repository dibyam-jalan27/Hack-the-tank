import axios from "axios";

const dev = "http://localhost:5000";

export const login = async (email, password) => {
  try {
    const { data } = await axios.post(
      `${dev}/api/v1/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const register = async (userData) => {
  try {
    const { data } = await axios.post("/api/v1/register", userData);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const forgotPassword = async (email) => {
  try {
    const { data } = await axios.post("/api/v1/password/forgot", { email });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const resetPassword = async (token, passwords) => {
  try {
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const loadUser = async () => {
  try {
    const { data } = await axios.get("/api/v1/me");
    return data;
  } catch (error) {
    return error.response.data;
  }
};
