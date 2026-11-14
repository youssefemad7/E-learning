// يستخدم useMutation لتشغيل register()، ويتعامل مع نتيجة إنشاء الحساب والأخطاء.
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register as registerApi } from "../../services/ApiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setAccessToken } from "../../services/ApiAuth";

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: register, isPending } = useMutation({
    mutationFn: ({
      name,
      email,
      password,
      role,
    }: {
      name: string;
      email: string;
      password: string;
      role: "student" | "instructor";
    }) => registerApi(name, email, password, role),
    onSuccess: (data) => {
      setAccessToken(data.access_token);
      queryClient.setQueryData(["user"], data.user);
      navigate("/home", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Failed to register. Please try again later.");
    },
  });

  return { register, isPending };
}
