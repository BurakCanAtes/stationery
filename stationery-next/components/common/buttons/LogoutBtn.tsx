"use client";

import { MenuItem } from "@headlessui/react";
import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  // TODO: add notification, redirect user to login
  const handleLogout = () => {
    signOut();
    console.log("Logout success");
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
