import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );

  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const authorizationToken =  `Bearer ${token}`;
  const [isLoading , setIsLoading] = useState(true);

  const API = import.meta.env.VITE_APP_URI_API;


  const storetokenInLS = (servertoken) => {
    setToken(servertoken);
    localStorage.setItem("token", servertoken);
  };


  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  //JWT Authenication - to get currently login user data

  const userAuthentication = async ()=>{
    try {
      setIsLoading(true);

      const response = await fetch(`${API}/api/auth/user`,
        {
          method: "GET",
          headers:{
            Authorization:authorizationToken,
          },
        }
      );

      if(response.ok){
        const data = await response.json();
        console.log("data from login user ",data.userData);
        setUser(data.userData);
        setIsLoading(false);
      }else{
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data");
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch(
        `${API}/api/data/service`,
        {
          method: "GET",
        }
      );

      if(response.ok){
        const data = await response.json();
        console.log("data from service: ",data.msg);
        setServices(data.msg);
      }
    } catch (error) {
      console.log(`services frontend error: ${error}`);
    }
  }

  useEffect(()=>{
    getServices();
    userAuthentication();
  },[]);



  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token, // Dynamically calculate isLoggedIn
        storetokenInLS,
        LogoutUser,
        user,
        services,
        authorizationToken,
        isLoading,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of AuthProvider");
  }
  return authContextValue;
};
