import "./../styles/Login.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password }
      );

      login(res.data.token);
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">

        <h1>Login</h1>

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
        )}

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={loginUser} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="link">
          <Link to="/">Create Account</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
