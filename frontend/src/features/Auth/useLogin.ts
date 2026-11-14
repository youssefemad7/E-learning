import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/ApiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setAccessToken } from "../../services/ApiAuth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi(email, password),
    onSuccess: (data) => {
      setAccessToken(data.access_token);
      queryClient.setQueryData(["user"], data.user);
      navigate("/home", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Failed to login. Please try again later.");
    },
  });

  return { login, isPending };
}
