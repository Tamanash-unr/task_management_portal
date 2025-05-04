import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"

const Login: React.FC = () => {
  const { authState, handleLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(authState.isAuthenticated){
      navigate("/dashboard")
    }
  },[])

  const login = () => {
    handleLogin("jdoe");
    navigate("/dashboard");
  }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={login}>Log In</button>
    </div>
  )
}

export default Login