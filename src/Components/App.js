import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Context from "../Context/Context";

import Header from "./shared/Header.js"

import RankingWindow from "./pages/RankingWindow.js"
import SingInWindow from "./pages/SingInWindow.js"
import SingUpWindow from "./pages/SingUpWindow.js"
import MyUrlsWindow from "./pages/MyUrlsWindow.js"

export default function App() {
  const [token, setToken] = React.useState("");

  return (
    <>
      <Context.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<RankingWindow />} />
            <Route path="/signin" element={<SingInWindow />} />
            <Route path="/signup" element={<SingUpWindow />} />
            <Route path="/myurls" element={<MyUrlsWindow />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}
