import React, { ChangeEvent, useState } from "react";
import Header from "./Header";

import VisibilityOnIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { FormStatus } from "../types/Forms";
import { useUserStore } from "../state";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
};

function Login() {
  const history = useHistory();
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
    const { username, password } = values;
    if (!username) {
      updateHelperText("username", "Username is Required");
    }
    if (!password) {
      updateHelperText("password", "Password is Required");
    }
    return Object.values(helperText).some((text) => !text);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = validateValues();
    if (!valid) return;
    setStatus(FormStatus.SUBMITTING);
    try {
      const { username, password } = values;
      await userStore.login({ username, password });
      setStatus(FormStatus.SUCCESS);
      setTimeout(() => {
        history.push("/dashboard");
      }, 2000);
    } catch (err) {
      setStatus(FormStatus.ERROR);
      if (err.message === "Invalid login") {
        setErrorMessage("incorrect credentials");
      } else {
        setErrorMessage("failed to login please try again");
      }
      // const [error] = err.errors;
    }
  };

  return (
    <div className="Register">
      <Header />
      <div className="container">
        <div className="title-container">
          <div className="line" />
          <h4 className="dashboard-title">Login</h4>
          <div className="line" />
        </div>
          {status === FormStatus.SUCCESS ? (
            <>
              <p className="subtitle">
                Hello {userStore.user?.username}! Redirecting to Dashboard
              </p>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
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
              <div className="flex-container">
                {status === FormStatus.SUBMITTING && (
                  <>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </>
                )}
                {status === FormStatus.INITIAL && (
                  <button type="submit">Submit</button>
                )}
                {status === FormStatus.ERROR && (
                  <>
                    <p className="submit-error">{errorMessage}</p>
                    <button onClick={handleReset}>Reset</button>
                    <button type="submit">Submit Again</button>
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

export default observer(Login);
