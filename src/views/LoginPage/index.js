import React, { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (userData) {
      navigate("/jobs");
    }
  }, userData);

  const loginGoogle = useGoogleLogin({
    onSuccess: (res) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${res.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${res.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          localStorage.setItem("userData", JSON.stringify(res));
          navigate("/jobs");
          return;
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title">Login GitHub Jobs</h5>
              <button className="btn btn-primary" onClick={() => loginGoogle()}>
                Login Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
