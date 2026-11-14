// يستخدم useMutation لتشغيل logout()، وبعد نجاحه هنحدّث حالة المصادقة في الـ Frontend.
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout, setAccessToken } from "../../services/ApiAuth";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAccessToken(null);
      queryClient.setQueryData(["user"], null);
      //   queryClient.removeQueries({ queryKey: ["user"], exact: true });
      navigate("/", { replace: true });
    },
  });

  return {
    logoutUser,
    isLoggingOut: isPending,
  };
}
