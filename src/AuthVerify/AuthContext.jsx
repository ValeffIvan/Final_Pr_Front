import { createContext, useContext, useEffect, useState } from "react";
import { LogInRequest, ValidateToken } from "../services/Session";
import { jwtDecode } from "jwt-decode";
import { GetUserByEmail } from "../services/User/Http";

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
/*
  //datos del registro
  const signup = async (user) => {
    try {
      const res = await registerReq(user);
      //actualizacion del usuario
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      
      setErrors(error.response.data);
    }
  };
*/

  const signin = async (user) => {
    try {
      const res = await LogInRequest(user);
      console.log(res)
      localStorage.setItem('token',res.token);
      res.user.createTime = new Date(res.user.createTime).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      setUser(res.user)
      setIsAuth(true);
    } catch (error) {
      console.log(error)
    }
  };


  const signout = () => {
    //localStorage.clear();
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
      console.log(token)
      if (token) {
        try {
          const res = await ValidateToken(token);
          if (res) {
            console.log(user)
            setIsAuth(true);
          } else {
            setIsAuth(false);
            console.log("token invalido")
            //localStorage.clear();
          }
        } catch (error) {
          setIsAuth(false);
          console.log(error)
          //localStorage.clear();
        }
      }
    }
    console.log(user)
    verifyLogin();
  }, []);
/*
    const updateProfile = async (id, user) => {
    try {
      const res = await updateProfileReq(id, user);
    } catch (error) {
      console.log(error);
    }
  };
*/
  return (
    <AuthContext.Provider
      value={{
        //signup,
        signin,
        signout,
        isAuth,
        user,
        errors,
        //updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
