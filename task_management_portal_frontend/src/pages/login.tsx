import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"

const Login: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated){
      navigate("/dashboard")
    }
  },[])

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Log In</button>
    </div>
  )
}

export default Login