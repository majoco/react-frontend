import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SingUp";
import TaskForm from "./TaskForm";
import TaskList from "./Tasks";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/taskform" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
