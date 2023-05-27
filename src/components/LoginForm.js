import { useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";

function LoginForm({ existingUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      //for sign up
      //   await FirebaseAuthService.registerUser(username, password);
      await FirebaseAuthService.loginUser(username, password);
      setUsername("");
      setPassword("");
    } catch (e) {
      alert(e.message);
    }
  }

  function handleLogout() {
    FirebaseAuthService.logoutUser();
  }

  async function handleSendResetPasswordEmail() {
    if (!username) {
      alert("missing username!");
      return;
    }
    try {
      await FirebaseAuthService.sendPasswordResetEmail(username);
      alert("sent the password reset email");
    } catch (e) {
      alert(e.message);
    }
  }

  //   async function handleLoginWithGoogle() {
  //     try {
  //       await FirebaseAuthService.loginWithGoogle();
  //     } catch (e) {
  //       alert(e.message);
  //     }
  //   }

  return (
    <div className="login-form-container">
      {existingUser ? (
        <div className="row">
          <h3>Welcome, {existingUser.email}</h3>
          <button type="button" className="primary-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label login-label">
            Username (email):
            <input className="input-text" type="email" required value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>

          <label className="input-label login-label">
            password:
            <input className="input-text" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          <div className="button-box">
            <button className="primary-button">Login</button>
            <button type="button" className="primary-button" onClick={handleSendResetPasswordEmail}>
              Reset Password
            </button>
            {/* <button type="button" onClick={handleLoginWithGoogle} className="primary-button">
              Login With Google
            </button> */}
          </div>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
