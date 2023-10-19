import PropTypes from "prop-types";
import { useState } from "react";

const LoginForm = ({ loginHandler }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await loginHandler({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h1>Login to Application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired,
};

export default LoginForm;
