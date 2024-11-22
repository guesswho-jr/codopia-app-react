import * as Yup from "yup";
export const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  //   password: Yup.string().required(),
  password: Yup.string().required().min(8).label("Password"),
});

export const registerValidationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  // password: Yup.string().required().label("Password"),
  password: Yup.string()
    .required()
    .min(8)
    .label("Password")
    .matches(/(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]/i, {
      message: "Password is not strong enough",
    }),
  email: Yup.string().required().email().label("Email"),
  cpassword: Yup.string()
    .required()
    .min(8)
    .label("Confirm Password")
    .matches(/(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]/i, {
      message: "Password is not strong enough",
    }),
  full_name: Yup.string()
    .required()
    .matches(/[a-z\sA-Z]+/i),
  bio: Yup.string(),
});
