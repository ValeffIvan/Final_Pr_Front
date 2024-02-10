import React from 'react'
import Post from '../components/Home/Post';
import FormPost from '../components/Home/PostForm';


const Home = () => {
  return (
    <section>    
      <br />
      <br />
      <FormPost/>  
      <Post />
    </section>
  );
}

export default Home