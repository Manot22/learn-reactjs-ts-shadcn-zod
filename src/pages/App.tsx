import LoginForm from "@/components/Fragments/LoginForm";
import AuthLayouts from "@/components/Layouts/AuthLayouts";

const App = () => {
  return (
    <AuthLayouts titleAuth="Sign in" type="login">
      <LoginForm />
    </AuthLayouts>
  );
};
export default App;
