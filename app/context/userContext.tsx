"use client";
import { createContext, PropsWithChildren, useState } from "react";
import { UserInterface } from "../types/user";

interface UserProps {
  user: UserInterface | undefined;
  onStorageUser: (user: UserInterface) => void;
}

const UserState = createContext<UserProps | undefined>(undefined);

export const UserContext = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserInterface | undefined>(undefined);

  const onStorageUser = (user: UserInterface) => {
    setUser(user);
  };

  return (
    <UserState.Provider
      value={{
        user,
        onStorageUser,
      }}
    >
      {children}
    </UserState.Provider>
  );
};

export default UserState;
