import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Navbar from "../components/Navbar";

const Error = () => {
  const error = useRouteError();
  return (
    <>
      <Navbar />
      <div className="w-screen p-5 flex flex-col justify-center">
        <h1 className="text-xl">Oops</h1>
        <p>
          {" "}
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "An unexpected error occurred."}
        </p>
      </div>
    </>
  );
};

export default Error;
