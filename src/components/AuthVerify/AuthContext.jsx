import { createContext, useContext, useEffect, useState } from "react";
import { LogInRequest, ValidateToken } from "../../services/Session";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Error en el contexto del usuario");
  return context;
};

export const AuthProvider = ({ children }) => {
  //datos del usuario que va a ser leido en toda la aplicación.
  const [user, setUser] = useState(null);

  //informe si esta o no Autenticado
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
  // Validación del Login
  const signin = async (user) => {
    try {
      const res = await LogInRequest(user);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {

    }
  };

  //Logout

  const signout = () => {
    localStorage.clear();
    setIsAuth(false);
    setUser(null);
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
            setIsAuth(true);
            setUser(res.data);
          } else {
            setIsAuth(false);
          }
        } catch (error) {
          setIsAuth(false);
          setUser(null);
        }
      }
    }
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
        user,
        isAuth,
        //updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
