import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../features/Auth/useLogin.ts";

export default function LoginForm() {
  const [email, setEmail] = useState("emad@test.com");
  const [password, setPassword] = useState("12345678");
  const { login, isPending } = useLogin();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    // console.log("Login attempted with:", { email, password });
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto flex flex-col py-10"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl text-[#49BBBD] font-semibold">
          Login
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Welcome back! Please login to continue.
        </p>
      </div>
      {/* Tabs - Login is active */}
      <div className="flex items-center gap-2 p-1.5 w-full bg-[#49bbbd55] rounded-full mb-6">
        <span className="flex-1 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-[#49BBBD] text-white shadow-sm">
          Login
        </span>
        <Link
          to="/register"
          className="flex-1 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white/80 hover:text-white transition-colors"
        >
          Register
        </Link>
      </div>
      {/* Email */}
      <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-5 focus-within:border-[#49BBBD] focus-within:ring-1 focus-within:ring-[#49BBBD]/40 transition-all">
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent text-gray-600 placeholder-gray-400 outline-none text-sm w-full h-full pr-4"
          autoComplete="email"
          required
          disabled={isPending}
        />
      </div>
      {/* Password */}
      <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-5 mt-4 focus-within:border-[#49BBBD] focus-within:ring-1 focus-within:ring-[#49BBBD]/40 transition-all">
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent text-gray-600 placeholder-gray-400 outline-none text-sm w-full h-full pr-4"
          autoComplete="current-password"
          required
          disabled={isPending}
        />
      </div>
      {/* Remember me + Forgot */}
      <div className="w-full flex items-center justify-between mt-5 text-gray-500">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" className="w-4 h-4 accent-[#49BBBD]" />
          <span className="text-sm">Remember me</span>
        </label>
        <a href="#" className="text-sm text-[#49BBBD] hover:underline">
          Forgot password?
        </a>
      </div>
      {/* Submit */}
      <button
        type="submit"
        className="mt-7 w-full h-11 rounded-full text-white bg-[#49BBBD] hover:bg-[#3da9ab] active:scale-[0.98] transition-all font-medium"
        disabled={isPending}
      >
        Login
      </button>
      {/* Footer */}
      <p className="text-gray-500 text-sm mt-5 text-center">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="text-[#49BBBD] hover:underline font-medium"
        >
          Register
        </Link>
      </p>
    </form>
  );
}
