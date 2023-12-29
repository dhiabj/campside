import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";
import logo from "../assets/camp-logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import UploadFile from "../components/UploadFile";
import ProgressBar from "../components/ProgressBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [address, setAddress] = useState("");
  const [filename, setFilename] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [progress, setProgress] = useState(0);

  const setFile = (file, filename) => {
    setSelectedFile(file);
    setFilename(filename);
  };

  const registerUser = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("birthday", birthday);
    formData.append("address", address);
    formData.append("pfp", selectedFile, filename);
    //console.log(selectedFile);

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
    //console.log(user);
    axios
      .post(`http://localhost:8000/api/users/register`, formData, config)
      .then((res) => {
        console.log(res);
        console.log(res.data.status);
        if (res.data.status === "ok") {
          toast.success("Account created successfully!");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="row g-0">
        <div className="col-md-6 center-col">
          <div className="card register-card">
            <div className="card-body">
              <img
                src={logo}
                alt="camp-logo"
                className="img-fluid register-img"
              />
              <form className="container-fluid" onSubmit={registerUser}>
                <div className="mb-3">
                  <label htmlFor="exampleInputUsername" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputUsername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputFirstname" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputFirstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputLastname" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputLastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputAddress"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-2">Birthday</label>
                  <DatePicker
                    selected={birthday}
                    onChange={(date) => setBirthday(date)}
                  />
                </div>
                <div>
                  <label className="mb-3">Photo</label>
                  <UploadFile setPfp={setFile} />
                  <ProgressBar percentage={progress} />
                </div>

                <div className="d-grid col-12 mx-auto">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
