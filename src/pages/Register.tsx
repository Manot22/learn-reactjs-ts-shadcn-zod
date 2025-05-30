import RegisterForm from "@/components/Fragments/RegisterForm";
import AuthLayouts from "@/components/Layouts/AuthLayouts";

const RegisterPage = () => {
  return (
    <AuthLayouts titleAuth="Sign up" type="register">
      <RegisterForm />
    </AuthLayouts>
  );
};
export default RegisterPage;
