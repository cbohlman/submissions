import { useState } from "react";
import PropTypes from "prop-types";
import Blog from "./Blog";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    createBlog(blogObject);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <form onSubmit={addBlog}>
        <p>
          Title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </p>
        <p>
          Author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </p>
        <p>
          URL:
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </p>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
