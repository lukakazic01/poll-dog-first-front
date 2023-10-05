import './Login.css'
import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

function Login () {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async () => {
        try {
            const {data} = await axios.post("https://localhost:7070/LoginAPI", {
                username,
                password
            });
            toast.success("You successfully logged in",{
                position: "bottom-center",
                autoClose: 3000,
                theme: 'colored'
            })
        } catch(err) {
            toast.error("User already exists",{
                position: "bottom-center",
                autoClose: 3000,
                theme: 'colored'
            })
        } finally {

        }
    }

    return (
        <>
           <div className="login-wrapper">
                <div className="login-container">
                    <label>Username:</label>
                    <input placeholder="enter username" onChange={(e) => setUsername(e.target.value)} />
                    <label>Password:</label>
                    <input placeholder="enter password" onChange={(e) => setPassword(e.target.value)}/>
                    <button className="btn" onClick={() => handleSubmit()}>Submit</button>
                </div>
           </div>
        </>
    );
}

export default Login;