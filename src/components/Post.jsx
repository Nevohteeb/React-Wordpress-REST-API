import React from 'react';
import { useAxios } from "use-axios-client";
import { useParams } from 'react-router-dom';
import PlaceholderImage from "../assets/placeholder-no-image.png"

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;
console.log(baseUrl);

const RenderedPost = () => {
  const { id } = useParams();
  
  const endpoint = `${baseUrl}/posts/${id}?_embed`

  console.log(endpoint);

  const { data : post, error, loading } = useAxios({
      url: endpoint
  })

  // Check State of dinosaur
  if (loading) return "Loading...";
  if (!post) return "No data...";
  if (post.length === 0) return "No results found!";
  if (error) return "Error!";
  console.log(post)

  const GetImageorPlaceholder = () => {
      if (post._embedded['wp:featuredmedia']) {
          return (
            <img src={post._embedded['wp:featuredmedia']['0'].source_url} alt={post.title.rendered}/>
            )
      } else {
          return (
            <img src={PlaceholderImage} alt="placeholder" />
          )
      }
  }

  return (
      <div>
        <h2>{post.title.rendered}</h2>
        <GetImageorPlaceholder />
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
    );
  
}

const Post = () => {
    return (
        <div className='container'>
            <RenderedPost />
        </div>
    )
}

export default Post;