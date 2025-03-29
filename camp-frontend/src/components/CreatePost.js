import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UploadGallery from './UploadGallery';
import { uploadMultipleFiles } from '../lib/utils';
import { MutatingDots } from 'react-loader-spinner';

const CreatePost = ({ userconnected, setPosts }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [availableNetwork, setAvailableNetwork] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [loading, setLoading] = useState(false);

  const onValueChange = (e) => {
    setAvailableNetwork(e.target.value);
  };

  const setFiles = (files) => {
    setSelectedFiles(files);
  };

  const createPost = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      toast.error('Please select at least one image!');
      return;
    }
    try {
      setLoading(true);
      const imgUrls = await uploadMultipleFiles(selectedFiles);
      const res = await axios.post('http://localhost:8000/api/posts/add', {
        title,
        description,
        availableNetwork,
        gallery: imgUrls,
        userId: userconnected._id,
      });
      toast.success('Post created successfully!');
      setLoading(false);
      setPosts((prev) => [res.data, ...prev]);
    } catch (error) {
      console.log(error);
      toast.error('Error creating post!');
    }
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
          {loading && (
            <MutatingDots
              visible={true}
              height="100"
              width="100"
              color="#4fa94d"
              secondaryColor="#4fa94d"
              radius="12.5"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
          <button type="submit" className="btn btn-primary post-btn">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
