import LoginForm from "../Component/auth/LoginFrom";

const Login = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left image - hidden on mobile */}
      <div className="hidden md:flex w-1/2 p-5">
        <img
          className="w-full h-full object-cover rounded-3xl"
          src="/istockphoto-2160439321-1024x1024.jpg"
          alt="Login visual"
        />
      </div>

      {/* Right form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
