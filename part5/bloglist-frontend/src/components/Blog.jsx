import { useState } from "react"

const Blog = ({ blog, likeHandler, deleteHandler, user }) => {
  const [visible, setVisibile] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisibile(!visible)
  }

  const showDeleteButton = () => user.id === blog.user.id
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2, 
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const newLikes = blog.likes + 1
    const updatedBlog = {...blog, likes: newLikes}
    delete updatedBlog.user
    likeHandler(updatedBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      deleteHandler(blog.id);
    }
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <div style={blogStyle}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>View</button>
        </div>  
      </div>
      <div style={showWhenVisible}>
        <div style={blogStyle}>
          <p>
            {blog.title} - {blog.author}
            <button onClick={toggleVisibility}>Hide</button>
          </p>
          <p>{blog.url}</p>
          <p>
            {blog.likes} <button onClick={handleLike}>Like</button>
          </p>
          <p>{blog.user.name}</p>
          {showDeleteButton() && <button onClick={handleDelete}>Delete</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog