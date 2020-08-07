import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Username is required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required("Confirm Password is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email address is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const newsSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Title is required"),
  shortContent: Yup.string()
    .min(2, "Too Short!")
    .max(500, "Too Long!")
    .required("Content is required"),
  fullContent: Yup.string()
    .min(2, "Too Short!")
    .required("Content is required"),
});
