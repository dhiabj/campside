import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Home.css";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [userconnected, setUserconnected] = useState({});
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

      axios
        .get(`http://localhost:8000/api/posts`, {
          headers: { authorization: token },
        })
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
    }
    // eslint-disable-next-line
  }, []);
  //console.log(userconnected);

  useEffect(() => {
    if (posts.length === 0) return;
    setFilteredposts(posts);
  }, [posts]);

  return (
    <div>
      <Navbar
        userconnected={userconnected}
        posts={posts}
        setFilteredposts={setFilteredposts}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 center-col">
            <CreatePost setPosts={setPosts} userconnected={userconnected} />
            {filteredposts.map((post) => (
              <Posts
                key={post._id}
                post={post}
                userconnected={userconnected}
                setAllPosts={setPosts}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
