import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [centralUser, setCentralUser] = useState(null);

  return (
    <div>
      <AuthContext.Provider value={{centralUser, setCentralUser}}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider
