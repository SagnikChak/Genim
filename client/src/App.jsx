import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { WLogo } from "./assets";
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-black sm:px-8 px-4 py-4 border-b border-b-[#232323]">
        <Link to="/">
          <img src={WLogo} alt="logo" className="w-[60px] object-contain" />
        </Link>

        <Link
          to="/create-post"
          className="font-orbitron font-medium bg-[#151651] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#303030] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;