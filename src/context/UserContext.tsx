
import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  name: string;
  setName: (name: string) => void;
}

const defaultContext: UserContextType = {
  name: "Admin",
  setName: () => {},
};

const UserContext = createContext<UserContextType>(defaultContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("Admin");

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
