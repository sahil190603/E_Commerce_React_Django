// import React, { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [isAuth, setIsAuth] = useState(false);
//   const [role, setRole] = useState("");


//   useEffect(() => {
//     const storedToken = localStorage.getItem("authTokens");
//     if (storedToken) {
//       const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
//       setUser(tokenPayload);
//       setToken(storedToken);
//       setIsAuth(true);
//       setRole(tokenPayload.role);
//     }
//   }, []);

//   const logoutUser = () => {
//     setUser(null);
//     setToken(null);
//     setIsAuth(false);
//     setRole("");
//     localStorage.removeItem("authTokens");
//     localStorage.removeItem('userDetails');
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//     localStorage.removeItem('userId')
//     navigate("/", { replace: true });
//   };
//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser, 
//         token,
//         setToken,
//         logoutUser,
//         isAuth,
//         setIsAuth, 
//         role,
//         setRole, 
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;


import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const checkAndSetAllValues = () => {
    const storedToken = localStorage.getItem("authTokens");
    if (storedToken) {
      const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
      setUser(tokenPayload);
      setToken(storedToken);
      setIsAuth(true);
      setRole(tokenPayload.role);
      setIsLoading(false);
    } 
    else {
        setTimeout(() => {
            setUser(null);
            setIsLoading(false);
        }, 500);
    }
  };

  useEffect(() => {
      const ac = new AbortController();
      checkAndSetAllValues();
      return () => ac.abort();
  }, [isAuth]);

  useEffect(() => {
      checkAndSetAllValues();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("authTokens");
    if (storedToken) {
      const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
      setUser(tokenPayload);
      setToken(storedToken);
      setIsAuth(true);
      setRole(tokenPayload.role);
    }
  }, []);

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    setIsAuth(false);
    setRole("");
    localStorage.clear();
    navigate("/", { replace: true });
  };

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser, 
        token,
        setToken,
        logoutUser,
        isAuth,
        setIsAuth, 
        role,
        setRole, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;