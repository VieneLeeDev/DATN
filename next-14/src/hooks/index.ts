import { usePathname, useSearchParams } from "next/navigation";

export const useExplorePathname = () => {
  const pathname: string = usePathname();
  const searchParams = useSearchParams();
  const roomId: string = searchParams.get("room_id") || "";
  return [pathname, roomId];
};
