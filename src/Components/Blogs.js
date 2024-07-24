import React, { useContext } from "react";
import { AppContext } from "../context/AppContext"
import Spinner from "./Spinner";
import BlogDetails from "./BlogDetails";



export default function Blogs() {
  const { posts, loading,fetchBlogPosts } = useContext(AppContext);

  return (
    <div className="py-3 flex flex-col gap-y-7 mt-[66px] mb-[66px]">
      {
        loading ?
          (<Spinner />) :
          (posts.length === 0 ?
            (<div>No Post Found</div>) :
            (posts.map(post =>
              <BlogDetails post={post} />
            ))
          )
      }

    </div>
  );
}
