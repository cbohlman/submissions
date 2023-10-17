const LoginForm = ({ handleLogin, username, setUsername, password, setPassword}) => (
  <>
    <h1>Login to Application</h1>
    <form onSubmit={handleLogin}>
        <div>
        username
        <input 
            type='text' 
            value={username} 
            name='Username' 
            onChange={({ target }) => setUsername(target.value)}
        />
        </div>
        <div>
        password
        <input
            type='text'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
        />
        </div>
        <button type="submit">login</button>
    </form>
  </>
)

export default LoginForm