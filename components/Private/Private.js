import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext, { contextProvider } from "../../context/AuthContext";

const Private = (children) => {
    const router = useRouter()
      // Login data added to props via redux-store (or use react context for example)
      const { user } = useContext(contextProvider);
  
      // If user is not logged in, return login component
      if (!user) {
        return (
            router.push('/login')
        );
      }else
      // If user is logged in, return original component
      return {children}
  
  };
  
  export default Private;