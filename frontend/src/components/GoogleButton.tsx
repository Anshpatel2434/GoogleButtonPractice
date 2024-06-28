import {
  useGoogleLogin,
  TokenResponse,
  googleLogout,
} from "@react-oauth/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { SingupInput } from "../zod-types";

type User = Omit<TokenResponse, "error" | "error_description" | "error_uri">;

interface UserProfile {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

const GoogleButton = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState<User | undefined>(undefined);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  //setting up the user in the backend
  async function sendRequest(signup: SingupInput) {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signup);
    } catch (error) {
      alert("Error while signing up");
    }
  }

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

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

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
          console.log(res.data.name);
          const signup: SingupInput = {
            name: res.data.name,
            email: res.data.email,
            password: res.data.id,
          };
          sendRequest(signup);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {profile ? (
        <div className="text-center p-8 rounded-lg shadow-lg bg-gray-800">
          <img
            src={profile.picture}
            alt="user image"
            className="rounded-full w-20 h-20 mx-auto mb-4 border-4 border-gray-600"
          />
          <h3 className="text-xl font-bold">User Logged in</h3>
          <p className="mt-2">Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <p>ID: {profile.id}</p>
          <p>Given Name: {profile.given_name}</p>
          <p>Family Name: {profile.family_name}</p>
          <p>Locale: {profile.locale}</p>
          <br />
          <button
            onClick={logOut}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            Log out
          </button>
        </div>
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
