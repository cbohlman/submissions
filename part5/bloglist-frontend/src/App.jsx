import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type, time) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage('')
      setNotificationType('')
    }, time)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login( {username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception.response.data.error)
      showNotification(exception.response.data.error, 'error', 5000)
    }
  } 
  
  const handleLogout = () => {
    setUser('')
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: title, 
      author: author,
      url: url
    }

    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog))
    showNotification(`Added ${title} by ${author}`, 'success', 5000)
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <div>
      <Notification message={notificationMessage} type={notificationType} />
      {!user && <LoginForm 
        handleLogin={handleLogin} 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        />}
      <BlogForm
        user={user} 
        addBlog={addBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
      />
      <BlogList
        blogs={blogs} 
        user={user} 
        handleLogout={handleLogout}/>
    </div>
  )
}

export default App