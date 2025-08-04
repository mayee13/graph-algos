import { useNavigate } from "react-router"
import { useState } from "react";
import { loginUser, registerUser } from "../api/auth"; 
import './styles/Login.css'; 

export default function Login({setUser} : { setUser: (username: string) => void}) { 
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    const handleLogin = async () => {
        try {
          await loginUser(username);
          localStorage.setItem("username", username); // store logged-in user
          setUser(username); // update username state
          navigate("/savedgraphs"); // redirect to graph editor
        } catch (err) {
          alert("Login failed. Try registering first.");
        }
      };
    
      const handleRegister = async () => {
        try {
          await registerUser(username);
          localStorage.setItem("username", username); // store new user
          alert("Registration successful. You can now log in.");
        } catch (err) {
          alert("Registration failed. Username might already exist.");
        }
      };
    
    return (
        <div>
        <div className="container">
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    required>
                </input>
            </div>
            <div>
                <button className="button-17" id="login" onClick={handleLogin}>Login</button>
            </div>
            <div>
                <button className="button-17" id="register" onClick={handleRegister}>Register</button>
            </div>
        </div>
        </div>
    )
}