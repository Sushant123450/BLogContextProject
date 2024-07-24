import React, { useEffect, useContext } from "react";
import "./App.css";
import Home from "./Pages/Home.js";
import BlogPage from "./Pages/BlogPage.js";
import TagPage from "./Pages/TagPage.js";
import CategoryPage from "./Pages/CategoryPage.js";
import { AppContext } from "./context/AppContext";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";


export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { fetchBlogPosts } = useContext(AppContext)

  useEffect(() => {
    const page = searchParams.get("page") ?? 1;
    if (location.pathname.includes("tags")) {
      const tag = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), tag);
    }
    else if (location.pathname.includes("category")) {
      const category = location.pathname.split("/").at(-1).replaceAll("-", " ");
      fetchBlogPosts(Number(page), null, category);
    }
    else {
      fetchBlogPosts(Number(page));
    }
  }, [location.pathname, location.search]);
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:blogId" element={<BlogPage />} />
        <Route path="/tags/:tag" element={<TagPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </div>
  );
}
