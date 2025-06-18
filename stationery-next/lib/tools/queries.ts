import { QueryClient, useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

import { getUserCart } from "./api";

/**
 * Custom hook to fetch user cart
 *
 * @param {Session} user - The session that contains the user data.
 * @returns {ICartResponse} - The user cart data.
 */
export const useCart = (user: Session) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getUserCart(user),
    enabled: !!user,
  });
};

export async function prefetchCart(queryClient: QueryClient, session: Session) {
  return queryClient.prefetchQuery({
    queryKey: ["cart"],
    queryFn: () => getUserCart(session),
  });
}