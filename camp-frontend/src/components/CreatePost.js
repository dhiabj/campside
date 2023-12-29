import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
import UploadGallery from "./UploadGallery";

const CreatePost = ({ userconnected, setPosts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [availableNetwork, setAvailableNetwork] = useState("");
  const [selectedFiles, setSelectedFiles] = useState("");
  const [progress, setProgress] = useState(0);

  const onValueChange = (e) => {
    setAvailableNetwork(e.target.value);
  };

  const setFiles = (files) => {
    setSelectedFiles(files);
  };

  const createPost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("availableNetwork", availableNetwork);
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("gallery", selectedFiles[i]);
    }
    formData.append("userId", userconnected._id);
    //console.log(userId);
    //console.log(post);

    const config = {
      onUploadProgress: (progressEvent) => {
        setProgress(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
        //console.log(progress);
      },
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post(`http://localhost:8000/api/posts/add`, formData, config)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        const newPost = res.data;
        if (res.status === 200) {
          toast.success("Post added successfully!");
          setPosts((prev) => [newPost, ...prev]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => setProgress(0), 10000);
    //console.log(selectedFiles);
  };

  return (
    <div className="card post-card mb-3">
      <div className="card-header">Create post</div>
      <div className="card-body">
        <form onSubmit={createPost}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"></textarea>
          </div>
          <div className="mb-3">
            <legend className="form-label">Available Network</legend>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="Tunisie Telecom"
                onChange={onValueChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Tunisie Telecom
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="Orange"
                onChange={onValueChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Orange
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="Oreedo"
                onChange={onValueChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Oreedo
              </label>
            </div>
          </div>
          <UploadGallery setGallery={setFiles} />
          <ProgressBar percentage={progress} />
          <button type="submit" className="btn btn-primary post-btn">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
