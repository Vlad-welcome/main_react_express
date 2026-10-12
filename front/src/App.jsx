import React from "react";
import { Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { Register, Login, Main, Layout, ProtectedLayout } from "./pages/index.js";
import { Header, Footer } from "./components";

import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { AllFruit } from "./pages/AllFruit/AllFruit.jsx";

export default function App() {
  //deploy Vercel

  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (isAuth) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        {/* Публичные */}
        <Route element={<Layout header={Header} footer={Footer} />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Защищённые */}
        <Route element={<ProtectedLayout />}>
          <Route element={<Layout header={Header} footer={Footer} />}>
            <Route path="/" element={<Main />} />
            <Route path="/allFruit" element={<AllFruit />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
