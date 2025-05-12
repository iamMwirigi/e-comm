import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth"; // Assuming you will use Google Sign-In
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  function initializeUser(user) { // async is not strictly needed here as there's no await
    if (user) {

      setCurrentUser({ ...user });

      // check if provider is email and password login
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      // check if the auth provider is google or not
      // Uncomment if you implement Google Sign-In
      const isGoogle = user.providerData.some(
        (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
      );
      setIsGoogleUser(isGoogle);

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      setIsEmailUser(false); // Reset on logout
      setIsGoogleUser(false); // Reset on logout
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn, // You can keep this, or derive it from currentUser !== null
    isEmailUser,
    isGoogleUser,
    currentUser,
    // setCurrentUser // Consider if this needs to be exposed directly
                     // Auth actions (login/logout) are usually handled by Firebase methods
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}