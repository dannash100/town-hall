import React, { ChangeEvent, useEffect, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Select from "react-select";
import Header from "../Header";
import "./Create.css";

import { useBlogStore, useUserStore } from "../../state";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { FormStatus } from "../../types/Forms";
import { createPostToTag } from "../../api/posts";

const initialState = {
  title: "",
  pdf: "",
  excerpt: "",
  author: "",
  image: "",
  tags: [] as Array<number>,
};

const selectStyles = {
  multiValue: (styles: any) => {
    return {
      fontSize: 16,
      fontFamily: "LifeEFRegular",
      ...styles,
    };
  },
};

function CreatePost() {
  const history = useHistory();
  const userStore = useUserStore();
  const blogStore = useBlogStore();

  const [showForm, setShowForm] = useState<null | Boolean>(null);

  const [numPages, setNumPages] = useState<null | number>(null);
  const [pageNumber, setPageNumber] = useState(1);

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

  const handleChangeTags = (values: any) => {
    if (!values) {
      setValues((oldVals) => ({ ...oldVals, tags: [] }));
    } else {
      setValues((oldVals) => ({
        ...oldVals,
        tags: values.map((tag: any) => tag.value),
      }));
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleDocumentPrev = (e: any) => {
    e.preventDefault();
    setPageNumber((n) => n - 1);
  };

  const handleDocumentNext = (e: any) => {
    e.preventDefault();
    setPageNumber((n) => n + 1);
  };

  const handleUpload = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget || !e.currentTarget.files) return;
    const file = e.currentTarget.files.length && e.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if (typeof reader.result === "string") {
          setValues((oldVals) => ({
            ...oldVals,
            [name]: reader.result as string,
          }));
        }
      };
      reader.onerror = function (err) {
        console.log(err);
      };
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
    const { title } = values;
    if (!title) {
      updateHelperText("title", "Title is Required");
    }

    return Object.values(helperText).some((text) => !text);
  };

  const handleSubmit = async () => {
    const valid = validateValues();
    if (!valid) return;
    setStatus(FormStatus.SUBMITTING);
    try {
      const { tags, ...postValues } = values;
      const post = await blogStore.createPost(postValues);
      await blogStore.createPostToTags(post.id, tags)
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
            <h4 className="title">Create Post</h4>
            {status === FormStatus.SUCCESS ? (
              <p className="subtitle">
                Successfully created post <i>{values.title}</i>{" "}
                Redirecting to Dashboard
              </p>
            ) : (
              <>
                <div className="input-container">
                  <input
                    name="title"
                    onChange={handleChange("title")}
                    placeholder="Title"
                    value={values.title}
                  />
                  <p className="helper-text">{helperText.title}</p>
                </div>

                <div className="input-container">
                  <input
                    name="author"
                    onChange={handleChange("author")}
                    placeholder="Author"
                    value={values.author}
                  />
                  <p className="helper-text">{helperText.author}</p>
                </div>

                <div className="input-container">
                  <Select
                    styles={selectStyles}
                    placeholder="Tags"
                    isMulti
                    name="tags"
                    onChange={handleChangeTags}
                    options={blogStore.tags?.map((tag) => ({
                      label: tag.name,
                      value: tag.id,
                    }))}
                    className="basic-multi-select"
                  />
                </div>

                <div className="input-container">
                  <textarea
                    name="excerpt"
                    onChange={handleChange("excerpt")}
                    placeholder="Post Excerpt"
                    value={values.excerpt}
                  />
                  <p className="helper-text">{helperText.excerpt}</p>
                </div>

                <div className="input-container">
                  <div className="upload-label">Upload PDF document</div>
                  <input
                    type="file"
                    name="pdf"
                    onChange={handleUpload("pdf")}
                    accept=".pdf"
                  />
                  {values.pdf && (
                    <div className="pdf-container">
                      <Document
                        className="pdf"
                        file={values.pdf}
                        onLoadSuccess={onDocumentLoadSuccess}
                      >
                        <Page pageNumber={pageNumber} />
                      </Document>
                      <div className="pdf-controls">
                        <p className="pdf-page-text">
                          Page {pageNumber} of {numPages}
                        </p>
                        {numPages && numPages > 1 && (
                          <>
                            {pageNumber > 1 && (
                              <button
                                onClick={handleDocumentPrev}
                                className="button"
                              >
                                Previous
                              </button>
                            )}
                            {pageNumber < numPages && (
                              <button
                                onClick={handleDocumentNext}
                                className="button"
                              >
                                Next
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="input-container">
                  <div className="upload-label">Upload Image</div>
                  <input
                    onChange={handleUpload("image")}
                    type="file"
                    name="image"
                    accept={"image/x-png,image/gif,image/jpeg"}
                  />
                  {values.image && (
                    <img
                      src={values.image}
                      alt="post-image"
                      className="image-preview"
                    />
                  )}
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
              ? "Please await approval before attempting to create posts"
              : "Please login to create posts"}
          </h6>
        ) : (
          <h6 className="subtitle">Loading Please Wait</h6>
        )}
      </div>
    </div>
  );
}

export default observer(CreatePost);
