import React, { useState, useEffect } from 'react';
// import { getFacebookPosts, uploadFacebookPost } from '../services/api';
import { AiOutlineUpload } from 'react-icons/ai';

const Meta = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    // fetchPosts();
  }, []);

  const fetchPosts = async () => {
    // try {
    //   const response = await getFacebookPosts();
    //   setPosts(response);
    //   setLoading(false);
    // } catch (error) {
    //   setError('Failed to fetch Facebook posts');
    //   setLoading(false);
    // }
  };

  const handleUpload = async () => {
    // if (newPost) {
    //   try {
    //     await uploadFacebookPost(newPost);
    //     setNewPost('');
    //     fetchPosts();
    //   } catch (error) {
    //     setError('Failed to upload Facebook post');
    //   }
    // }
  };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Facebook Posts</h2>
        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post.id} className="border border-gray-300 rounded-md p-4">
              <h3 className="text-lg font-bold mb-2">{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Upload New Post</h2>
        <div className="flex">
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 mr-4"
            rows="4"
            placeholder="Enter your new post here..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={handleUpload}
          >
            <AiOutlineUpload className="mr-2" />
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Meta;
