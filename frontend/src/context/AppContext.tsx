import * as React from "react";

export type AppContextType = {
  email: string;
  out: boolean;
  sign: boolean;
  log: boolean;
  setEmail: (email: string) => void;
  setOut: (value: boolean) => void;
  setSign: (value: boolean) => void;
  setLog: (value: boolean) => void;
};

export const AppContext = React.createContext<AppContextType | null>(null);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [email, setEmail] = React.useState("");
  const [out, setOut] = React.useState(false);
  const [sign, setSign] = React.useState(true);
  const [log, setLog] = React.useState(true);

  return (
    <AppContext.Provider
      value={{ email, out, sign, log, setEmail, setLog, setOut, setSign }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
