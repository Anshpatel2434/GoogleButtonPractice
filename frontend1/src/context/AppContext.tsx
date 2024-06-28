import { createContext, useState } from "react";
import { UserProfile } from "../components/GoogleButton";

export interface Context {
  profile: UserProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<Context | null>(null);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ profile, setProfile, loggedIn, setLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
