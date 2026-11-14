import { Link } from "react-router-dom";
import { useState } from "react";
import { useRegister } from "../../features/Auth/useRegister.ts";
export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"student" | "instructor">("student");
  const { register, isPending } = useRegister();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    // console.log("Login attempted with:", { email, password });
    if (!email || !password || !name || !role) return;
    register(
      {
        name,
        email,
        password,
        role,
      },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
          setName("");
          setRole("student");
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
          Register
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Create your account to get started.
        </p>
      </div>

      {/* Tabs - Register is active */}
      <div className="flex items-center gap-2 p-1.5 w-full bg-[#49bbbd55] rounded-full mb-6">
        <Link
          to="/"
          className="flex-1 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white/80 hover:text-white transition-colors"
        >
          Login
        </Link>
        <span className="flex-1 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-[#49BBBD] text-white shadow-sm">
          Register
        </span>
      </div>

      {/* Email */}
      <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-5 focus-within:border-[#49BBBD] focus-within:ring-1 focus-within:ring-[#49BBBD]/40 transition-all">
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent text-gray-600 placeholder-gray-400 outline-none text-sm w-full h-full pr-4"
          autoComplete="email"
          required
          disabled={isPending}
        />
      </div>

      {/* Username */}
      <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-5 mt-4 focus-within:border-[#49BBBD] focus-within:ring-1 focus-within:ring-[#49BBBD]/40 transition-all">
        <input
          type="text"
          placeholder="Enter your username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent text-gray-600 placeholder-gray-400 outline-none text-sm w-full h-full pr-4"
          autoComplete="username"
          required
          disabled={isPending}
        />
      </div>

      {/* Password */}
      <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-5 mt-4 focus-within:border-[#49BBBD] focus-within:ring-1 focus-within:ring-[#49BBBD]/40 transition-all">
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent text-gray-600 placeholder-gray-400 outline-none text-sm w-full h-full pr-4"
          autoComplete="new-password"
          required
          disabled={isPending}
        />
      </div>
      {/* Role */}
      <select
        name="role"
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value as "student" | "instructor")}
        disabled={isPending}
        className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-5 mt-4 focus-within:border-[#49BBBD] focus-within:ring-1 focus-within:ring-[#49BBBD]/40 transition-all"
      >
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
      </select>

      {/* Submit */}
      <button
        type="submit"
        className="mt-7 w-full h-11 rounded-full text-white bg-[#49BBBD] hover:bg-[#3da9ab] active:scale-[0.98] transition-all font-medium"
        disabled={isPending}
      >
        Register
      </button>

      {/* Footer */}
      <p className="text-gray-500 text-sm mt-5 text-center">
        Already have an account?{" "}
        <Link to="/" className="text-[#49BBBD] hover:underline font-medium">
          Login
        </Link>
      </p>
    </form>
  );
}
