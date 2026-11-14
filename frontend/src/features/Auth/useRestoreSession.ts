import { useQuery } from "@tanstack/react-query";
import { restoreSession } from "../../services/ApiAuth";

export function useRestoreSession() {
  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await restoreSession();
      return data.user;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  return {
    isRestoring: isPending,
    user: user ?? null,
  };
}
