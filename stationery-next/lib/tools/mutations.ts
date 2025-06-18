import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { IUpdateCartRequest } from "../types/requests/cart.type";
import { updateCart } from "./api";

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { product: IUpdateCartRequest; user: Session }) =>
      updateCart(payload.product, payload.user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      let errorMessage = "Something went wrong.";

      if (error instanceof AxiosError && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });
};