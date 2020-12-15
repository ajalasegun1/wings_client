import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [centralUser, setCentralUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div>
      <AuthContext.Provider value={{centralUser, setCentralUser, isLoggedIn, setIsLoggedIn}}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider
