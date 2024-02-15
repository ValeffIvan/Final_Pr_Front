import { createContext, useContext, useEffect, useState } from "react";
import { LogInRequest, ValidateToken, GetUserByEmail } from "../services/User/Http";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Error en el contexto del usuario");
  return context;
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({
    idUsers: 0,
    username: "",
    email: "",
    createTime: "",
    role: "",
  });

  const [isAuth, setIsAuth] = useState(false);

  const [errors, setErrors] = useState([]);

  const signin = async (userData) => {
    try {
      const res = await LogInRequest(userData);
      localStorage.setItem('token',res.token);
      res.user.createTime = new Date(res.user.createTime).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      setUser(res.user)
      setIsAuth(true);
    } catch (error) {
      console.log(error)
    }
  };


  const signout = () => {
    localStorage.clear();
    setUser({    
      idUsers: 0,
      username: "",
      email: "",
      createTime: "",
      role: "",
    });
    setIsAuth(false);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function verifyLogin() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await ValidateToken(token);
          if (res) {
            const decodeUser = jwtDecode(token) 
            const userDetail = await GetUserByEmail(decodeUser.email);
            setUser(userDetail)
            setIsAuth(true);
          } else {
            setIsAuth(false);
            localStorage.clear();
          }
        } catch (error) {
          setIsAuth(false);
          console.log(error)
          localStorage.clear();
        }
      }
    }
    verifyLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signin,
        signout,
        isAuth,
        user,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
