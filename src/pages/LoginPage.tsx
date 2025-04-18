
import Layout from "@/components/layout/layout";
import LoginForm from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
