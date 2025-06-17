"use client";

import { MenuItem } from "@headlessui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutBtn() {
  const router = useRouter();

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/auth/login" });
    toast.success("Logout successful!", { id: "logout-success" });
    router.push(data.url);
  };
  
  return (
    <MenuItem as="div" onClick={handleLogout}>
      <div
        className={
          "block px-4 py-2 text-sm text-popover-foreground data-focus:outline-hidden cursor-pointer"
        }
      >
        Sign out
      </div>
    </MenuItem>
  );
}
