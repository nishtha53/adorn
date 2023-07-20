import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginService, signupService } from "../services/authService";
import { toast } from "react-hot-toast";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const localStorageToken = JSON.parse(localStorage.getItem("logindetail"));

    const [token, setToken] = useState(localStorageToken?.token || "");

    const [currentUser, setCurrentUser] = useState(localStorageToken?.user);

    const signupHandler = async ({ firstName, lastName, email, password }) => {
        try {
          const response = await signupService(
            firstName,
            lastName,
            email,
            password
          );
          console.log(response)
          const {
            status,
            data: { createdUser, encodedToken },
          } = response;
          if (status === 200 || status === 201) {
            localStorage.setItem(
              "logindetail",
              JSON.stringify({ user: createdUser, token: encodedToken })
            );
            setToken(encodedToken);
            setCurrentUser(createdUser);
            toast.success(`Hi, ${createdUser.firstName}!`, {
              icon: "👋",
            });
            navigate("/", { replace: true });
          }
        } catch (error) {
          toast.error("There was an error signing you up.");
        }
      };
    
      const loginHandler = async ({ email, password }) => {
        try {
          const response = await loginService(email, password);
          console.log(response)
          const {
            status,
            data: { foundUser, encodedToken },
          } = response;
          if (status === 200 || status === 201) {
            localStorage.setItem(
              "logindetail",
              JSON.stringify({ user: foundUser, token: encodedToken })
            );
            setToken(encodedToken);
            setCurrentUser(foundUser);
            toast.success(`Welcome back, ${foundUser.firstName}!`, {
              icon: "👋",
            });
            navigate(location?.state?.from?.pathname || "/", { replace: true });
          }
        } catch (error) {
          console.error(error);
          toast.error("User does not exist! Please sign up.");

        }
      };
    
      const logoutHandler = () => {
        localStorage.removeItem("login");
        setToken(null);
        setCurrentUser(null);
        toast.success("Logged out successfully!");
      };

      return (
        <AuthContext.Provider
          value={{ signupHandler, token, currentUser, loginHandler, logoutHandler }}
        >
          {children}
        </AuthContext.Provider>
      );

}

export const useAuth = () => useContext(AuthContext);