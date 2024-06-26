'use client'
import { usePathname, useSearchParams } from "next/navigation";

export const useExplorePathname = () => {
	const pathname: string | null = usePathname();
	const searchParams = useSearchParams();
	const roomId: string = searchParams?.get("room_id") || '';
	return [pathname, roomId];
};