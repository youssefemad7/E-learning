import RegisterForm from "../Component/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left image - hidden on mobile */}
      <div className="hidden md:flex w-1/2 p-5">
        <img
          className="w-full h-full object-cover rounded-3xl"
          src="/confident-teacher-explaining-lesson-pupils 1.png"
          alt="Register visual"
        />
      </div>

      {/* Right form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
