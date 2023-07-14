import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./views/LoginPage";
import Jobs from "./views/Jobs";
import JobDetail from "./views/Jobs/detail";

function App() {
  return (
    <GoogleOAuthProvider clientId="1043812376775-7sl01ai62a4au81ch7kuqevu0um8p1ao.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
