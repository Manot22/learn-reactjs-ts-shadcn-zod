import type { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  titleAuth: string;
  type: string;
}

const AuthLayouts: FC<AuthLayoutProps> = ({ children, titleAuth, type }) => {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="p-8 flex flex-col max-w-sm w-full">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-blue-500">{titleAuth}</h1>
          <p className="text-gray-500 text-sm">Please, enter your details</p>
        </div>
        {children}
        <div className="flex justify-center py-2">
          {type === "login" && (
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          )}

          {type === "register" && (
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default AuthLayouts;
