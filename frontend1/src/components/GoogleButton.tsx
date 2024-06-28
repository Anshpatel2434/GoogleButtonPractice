import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AskPassword from "../pages/AskPassword";
import { AppContext } from "../context/AppContext";

type User = Omit<TokenResponse, "error" | "error_description" | "error_uri">;

export interface UserProfile {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

const GoogleButton: React.FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("GoogleButton must be used within an AppContextProvider");
  }

  const { profile, setProfile } = context;

  //getting the main object after the user is logged in
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      const { error, error_description, error_uri, ...userWithoutErrors } =
        tokenResponse;
      setUser(userWithoutErrors as User);
      console.log(userWithoutErrors);
    },
    onError: (error) => console.log("Login failed: ", error),
  });

  //getting the creditials of the loggined user
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {profile ? (
        <AskPassword />
      ) : (
        <button
          onClick={() => login()}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md mt-4"
        >
          Sign in with Google 🚀
        </button>
      )}
    </div>
  );
};

export default GoogleButton;
