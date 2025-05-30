import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/lib/ProtectedRoute";
import LogoutDialog from "@/components/Modal/LogoutDialog";

const ProductsPage = () => {
  const { logout } = useAuth();
  const [showDialog, setShowDialog] = useState(false);

  const handleConfirmLogout = () => {
    logout();
    setShowDialog(false);
  };

  return (
    <ProtectedRoute>
      <div>This products page</div>
      <Button onClick={() => setShowDialog(true)}>Logout</Button>

      <LogoutDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={handleConfirmLogout}
      />
    </ProtectedRoute>
  );
};

export default ProductsPage;
