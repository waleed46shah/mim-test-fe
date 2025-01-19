import GoogleLogo from "../assets/google.svg";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface GoogleButtonProps {
  onClick?: () => void;
  label: string;
}

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
}

const GoogleButton = ({ onClick, label }: GoogleButtonProps) => {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get<GoogleUser>(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        localStorage.setItem("userEmail", userInfo.data.email);
        localStorage.setItem("userName", userInfo.data.name);
        localStorage.setItem("userPicture", userInfo.data.picture);
        localStorage.setItem("isGoogleLogin", "true");
        localStorage.setItem("googleAccessToken", tokenResponse.access_token);
        navigate("/");
        if (onClick) onClick();
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
    scope: "email profile",
  });

  return (
    <div className="px-6 sm:px-0 max-w-sm">
      <button
        type="button"
        className="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 font-medium rounded-lg px-5 py-2.5 inline-flex items-center justify-center gap-2"
        onClick={() => login()}
      >
        <img width={16} src={GoogleLogo} alt="google" />
        {label}
      </button>
    </div>
  );
};

export default GoogleButton;
