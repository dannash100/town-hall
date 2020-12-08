import React, { ChangeEvent, useEffect, useState } from "react";
import Header from "../Header";

import { useBlogStore, useUserStore } from "../../state";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { FormStatus } from "../../types/Forms";

const initialState = {
  name: "",
  description: ""
};

function CreateTag() {
  const history = useHistory();
  const userStore = useUserStore();
  const blogStore = useBlogStore();

  const [showForm, setShowForm] = useState<null | Boolean>(null);

  const [status, setStatus] = useState<FormStatus>(FormStatus.INITIAL);
  const [errorMessage, setErrorMessage] = useState("");
  const [helperText, setHelperText] = useState(initialState);
  const [values, setValues] = useState(initialState);

  const handleChange = (name: string) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e?.target) {
      setValues((oldVals) => ({ ...oldVals, [name]: e.target.value }));
    }
  };

  const handleReset = () => {
    setValues(initialState);
    setHelperText(initialState);
    setStatus(FormStatus.INITIAL);
    setErrorMessage("");
  };

  const updateHelperText = (name: string, text: string) =>
    setHelperText((oldVals) => ({
      ...oldVals,
      [name]: text,
    }));

  const validateValues = () => {
    setHelperText(initialState);
    const { name, description } = values;
    if (!name) {
      updateHelperText("name", "Name is Required");
    }
    if (!description) {
      updateHelperText("description", "Description is Required");
    }

    return Object.values(helperText).some((text) => !text);
  };

  const handleSubmit = async () => {
    const valid = validateValues();
    if (!valid) return;
    setStatus(FormStatus.SUBMITTING);
    try {
      // await blogStore.createPost(values);
      setStatus(FormStatus.SUCCESS);
      setTimeout(() => {
        history.push("/dashboard");
      }, 2000);
    } catch (err) {
      console.log(err);
      setStatus(FormStatus.ERROR);
    }
  };

  const handleLogoutDashboard = () => history.push("/login");

  const login = async () => {
    try {
      await userStore.login();
      if (userStore.user?.approved) {
        setShowForm(true);
      } else {
        setShowForm(false);
      }
    } catch (err) {
      handleLogoutDashboard();
      console.log(err);
    }
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <div className="Register">
      <Header onLogout={handleLogoutDashboard} />
      <div className="container">
        {showForm ? (
          <>
            <h4 className="title">Create Tag</h4>
            {status === FormStatus.SUCCESS ? (
              <p className="subtitle">
                Successfully created tag <i>{values.name}</i>
                Redirecting to Dashboard
              </p>
            ) : (
              <>
                <div className="input-container">
                  <input
                    name="name"
                    onChange={handleChange("name")}
                    placeholder="Name"
                    value={values.name}
                  />
                  <p className="helper-text">{helperText.name}</p>
                </div>

                <div className="input-container">
                  <input
                    name="description"
                    onChange={handleChange("description")}
                    placeholder="Description"
                    value={values.description}
                  />
                  <p className="helper-text">{helperText.description}</p>
                </div>
=
          
                <div className="flex-container">
                  {status === FormStatus.SUBMITTING && (
                    <>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </>
                  )}
                  {status === FormStatus.INITIAL && (
                    <button onClick={handleSubmit}>Submit</button>
                  )}
                  {status === FormStatus.ERROR && (
                    <>
                      <p className="submit-error">{errorMessage}</p>
                      <button onClick={handleReset}>Reset</button>
                      <button onClick={handleSubmit}>Submit Again</button>
                    </>
                  )}
                </div>
              </>
            )}
          </>
        ) : showForm === false ? (
          <h6 className="subtitle">
            {userStore.user
              ? "Please await approval before attempting to create tags"
              : "Please login to create tags"}
          </h6>
        ) : (
          <h6 className="subtitle">Loading Please Wait</h6>
        )}
      </div>
    </div>
  );
}

export default observer(CreateTag);
