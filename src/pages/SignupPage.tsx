
import Layout from "@/components/layout/layout";
import SignupForm from "@/components/auth/signup-form";

const SignupPage = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <SignupForm />
      </div>
    </Layout>
  );
};

export default SignupPage;
