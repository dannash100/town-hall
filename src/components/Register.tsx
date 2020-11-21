import React, { ChangeEvent, useState } from "react";
import Header from "./Header";
import "./Register.css";

import VisibilityOnIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { FormStatus } from "../types/Forms";
import { register } from "../api/auth";
import { useUserStore } from "../state";

const emailRegex = /^\S+@\S+\.\S+$/;

const initialState = {
  email: "",
  username: "",
  password: "",
  passwordConfirm: "",
};

function Register() {
  const userStore = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<FormStatus>(FormStatus.INITIAL);
  const [errorMessage, setErrorMessage] = useState("");
  const [helperText, setHelperText] = useState(initialState);
  const [values, setValues] = useState(initialState);

  const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target) {
      setValues((oldVals) => ({ ...oldVals, [name]: e.target.value }));
    }
  };

  const handleReset = () => {
    setValues(initialState);
    setHelperText(initialState);
    setShowPassword(false);
    setStatus(FormStatus.INITIAL);
    setErrorMessage("");
  };

  const handleToggleVisible = () => setShowPassword((oldVal) => !oldVal);

  const updateHelperText = (name: string, text: string) =>
    setHelperText((oldVals) => ({
      ...oldVals,
      [name]: text,
    }));

  const validateValues = () => {
    setHelperText(initialState);
    const { email, username, password, passwordConfirm } = values;
    if (!email) {
      updateHelperText("email", "Email is Required");
    } else {
      if (!emailRegex.test(email)) {
        console.log('blah')
        updateHelperText("email", "Email is in Invalid Format");
      }
    }
    if (!username) {
      updateHelperText("username", "Username is Required");
    }
    if (!password) {
      updateHelperText("password", "Password is Required");
    } else if (!passwordConfirm) {
      updateHelperText("passwordConfirm", "Please Confirm your Password");
    } else if (password !== passwordConfirm) {
      updateHelperText("passwordConfirm", "Password does not match.");
    }

    return Object.values(helperText).some((text) => !text);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = validateValues();
    if (!valid) return;
    setStatus(FormStatus.SUBMITTING);
    try {
      const { email, username, password } = values;
      const res = await userStore.register({ username, password, email });
      if (res) {
        setStatus(FormStatus.SUCCESS);
      }
    } catch (err) {
      console.log(err)
      setStatus(FormStatus.ERROR);
      const [error] = err.errors;
      if (error.type === "unique violation") {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("failed to register please try again.");
      }
    }
  };

  return (
    <div className="Register">
      <Header />
      <div className="container">
        <h4 className="title">Register</h4>
        {status === FormStatus.SUCCESS ? (
  
            <p className="subtitle">
              Successfully registered please wait for your account to be
              approved.
            </p>
   
        ) : (
          <>
          <form onSubmit={handleSubmit}>

            <div className="input-container">
              <input
                name="email"
                onChange={handleChange("email")}
                type="email"
                placeholder="Email"
                value={values.email}
                />
              <p className="helper-text">{helperText.email}</p>
            </div>
            <div className="input-container">
              <input
                name="username"
                onChange={handleChange("username")}
                type="username"
                placeholder="Username"
                value={values.username}
                />
              <p className="helper-text">{helperText.username}</p>
            </div>
            <div className="input-container">
              <div className="flex-container">
                <input
                  name="password"
                  onChange={handleChange("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={values.password}
                  />
                {showPassword ? (
                  <VisibilityOnIcon
                  onClick={handleToggleVisible}
                  className="visibility-icon"
                  />
                  ) : (
                    <VisibilityOffIcon
                    onClick={handleToggleVisible}
                    className="visibility-icon"
                    />
                    )}
              </div>
              <p className="helper-text">{helperText.password}</p>
            </div>
            <div className="input-container">
              <div className="flex-container">
                <input
                  name="passwordConfirm"
                  onChange={handleChange("passwordConfirm")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={values.passwordConfirm}
                  />
              </div>
            </div>
            <div className="flex-container">
              {status === FormStatus.SUBMITTING && (
                <>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </>
              )}
              {status === FormStatus.INITIAL && (
                <button type='submit'>Submit</button>
                )}
              {status === FormStatus.ERROR && (
                <>
                  <p className="submit-error">{errorMessage}</p>
                  <button onClick={handleReset}>Reset</button>
                  <button type='submit'>Submit Again</button>
                </>
              )}
            </div>
        </form>
          </>
        )}
      </div>
    </div>
    );
}

export default Register;
