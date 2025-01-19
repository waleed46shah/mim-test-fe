import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface DecodedToken {
  _id: string;
  iat: number;
  exp: number;
}

export const getUserId = (): string | null => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode<DecodedToken>(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }

    return decoded._id;
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
};

export const isAuthenticated = async () => {
  const isGoogleLogin = localStorage.getItem("isGoogleLogin") === "true";
  const accessToken = localStorage.getItem("googleAccessToken");

  if (isGoogleLogin && accessToken) {
    try {
      // Verify if Google token is still valid
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.status === 200;
    } catch (error) {
      // Token is invalid or expired
      localStorage.removeItem("isGoogleLogin");
      localStorage.removeItem("googleAccessToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userPicture");
      return false;
    }
  }

  // Fall back to your existing auth check for non-Google login
  const token = localStorage.getItem("token");
  return !!token;
};
