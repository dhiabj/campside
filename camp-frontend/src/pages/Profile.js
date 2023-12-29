import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import "../css/Profile.css";

const Profile = () => {
  const [userconnected, setUserconnected] = useState({});
  const [selecteduser, setSelecteduser] = useState({});
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [filteredposts, setFilteredposts] = useState(posts);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      //console.log(token);
      axios
        .get(`http://localhost:8000/api/users/userconnected`, {
          headers: { authorization: token },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          if (res.data.user) {
            setUserconnected(res.data.user);
          } else {
            localStorage.removeItem("token");
            navigate("/login");
          }
        });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data) {
          setPosts(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:8000/api/users/user/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data) {
          setSelecteduser(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    if (posts.length === 0) return;
    setFilteredposts(posts);
  }, [posts]);

  console.log(selecteduser);
  return (
    <div>
      <Navbar
        userconnected={userconnected}
        setFilteredposts={setFilteredposts}
        posts={posts}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 center-col">
            <div className="card mb-3 profile-card">
              {selecteduser.img && (
                <img
                  src={`http://localhost:8000/uploads/${selecteduser.img}`}
                  className="user-profile mt-3"
                  alt="pfp"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">
                  {selecteduser.firstname} {selecteduser.lastname}
                </h5>
                <p className="card-text">
                  <small className="text-muted">@{selecteduser.username}</small>
                </p>
                <div className="d-flex">
                  <p className="card-text fw-semibold me-3">
                    <i className="fa-solid fa-location-dot me-2"></i>
                    {selecteduser.address}
                  </p>
                  <p className="card-text fw-semibold me-3">
                    <i className="fa-solid fa-cake-candles me-2"></i>
                    Born {moment(selecteduser.birthday).format("LL")}
                  </p>
                  <p className="card-text fw-semibold">
                    <i className="fa-solid fa-calendar-days me-2"></i>
                    Joined {moment(selecteduser.createdAt).format("MMM Do YY")}
                  </p>
                </div>
              </div>
            </div>

            {filteredposts.map((post) => (
              <Posts
                key={post._id}
                post={post}
                userconnected={userconnected}
                setPosts={setPosts}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
