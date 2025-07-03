import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
        const res = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (res.ok) {
            onLogin(data.token, data.role);
            navigate(data.role === "hr" ? "/hr" : "/security");
        } else {
            setMessage(data.error);
        }
        } catch {
        setMessage("Network error");
        }
    };

    return (
        <div className={styles["login-background"]}>
        <div className={styles["login-box"]}>
            <h2 className={styles["login-title"]}>Login</h2>
            {message && <p className={styles["login-footer"]}>{message}</p>}

            <div className={styles["input-group"]}>
            <label>Username</label>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles["login-input"]}
                required
            />
            </div>

            <div className={styles["input-group"]}>
            <label>Password</label>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles["login-input"]}
                required
            />
            </div>

            <button onClick={handleLogin} className={styles["login-button"]}>
            Login
            </button>
        </div>
        </div>
    );
}
