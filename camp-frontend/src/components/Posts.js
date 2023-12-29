import axios from "axios";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "../css/Posts.css";

const Posts = ({ post, userconnected, setPosts, setAllPosts }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const refreshPosts = () => {
    axios
      .get(`http://localhost:8000/api/posts/${userconnected._id}`)
      .then((res) => {
        //console.log(res);
        //console.log(res.data);
        if (res.data) {
          setPosts(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://localhost:8000/api/posts/`)
      .then((res) => {
        //console.log(res);
        //console.log(res.data);
        if (res.data) {
          setAllPosts(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:8000/api/posts/delete/${id}`)
      .then((res) => {
        console.log(res);
        refreshPosts();
      })
      .catch((error) => console.log(error));
  };
  //console.log(post.img);
  return (
    <div className="card mb-4 post-card">
      <div className="card-body">
        <div className="mb-3 d-flex">
          <div>
            <Link to={`/profile/${post.userId?._id}`}>
              <img
                src={`http://localhost:8000/uploads/${post.userId?.img}`}
                className="user"
                alt="pfp"
              />
            </Link>
            <Link to={`/profile/${post.userId?._id}`} className="link">
              <p className="username fw-semibold me-2">
                {post.userId?.firstname} {post.userId?.lastname}
              </p>
            </Link>
            <small className="text-muted">@{post.userId?.username}</small>
          </div>

          {post.userId._id === userconnected?._id && (
            <div className="dropdown ms-auto">
              <button
                className="more-btn"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <i className="fa-solid fa-ellipsis"></i>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark dropdown-menu-md-end"
                aria-labelledby="dropdownMenuButton2">
                <li>
                  <div
                    className="dropdown-item cursor"
                    onClick={() => deletePost(post._id)}>
                    <i className="fa-solid fa-trash-can me-2"></i>
                    Delete post
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>

        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.description}</p>
        <h5 className="card-title">Available Network</h5>
        <p className="card-text">{post.availableNetwork}</p>
        <p className="card-text">
          <small className="text-muted">
            {moment(post.createdAt).startOf("second").fromNow()}
          </small>
        </p>
      </div>
      <Slider {...settings}>
        {post.img.map((el) => {
          return (
            <img
              src={`http://localhost:8000/uploads/${el}`}
              className="card-img-bottom"
              alt="..."
              key={el}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default Posts;
