import { useState } from "react";
import LogoutDialog from "../Modal/LogoutDialog";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { logout } = useAuth();
  const [showDialog, setShowDialog] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    setShowDialog(false);
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-gray-500">
      <h1 className="text-xl font-semibold text-white">FakeStore</h1>
      <div>
        <Button
          className="bg-red-500"
          onClick={() => setShowDialog(true)}
          size={"sm"}
        >
          Logout
        </Button>

        <LogoutDialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          onConfirm={handleConfirmLogout}
        />
      </div>
    </div>
  );
};
export default Header;
