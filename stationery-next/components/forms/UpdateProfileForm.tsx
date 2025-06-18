"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UpdateProfileValidation } from "@/lib/validation";
import ControlledInput from "../controlled/ControlledInput";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/types/responses/user.type";
import { useUpdateProfile } from "@/lib/tools/mutations";
import { Dialog, DialogContent } from "../ui/dialog";
import UserAvatarForm from "./UserAvatarForm";

const defaultValues = {
  firstName: "",
  lastName: "",
};

const UpdateProfileForm = () => {
  const { data: session, status, update } = useSession();
  const { mutateAsync, isPending } = useUpdateProfile(update);

  const user: User | undefined = session?.user;
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof UpdateProfileValidation>>({
    resolver: zodResolver(UpdateProfileValidation),
    defaultValues,
  });

  useEffect(() => {
    form.reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
    });
  }, [status]);

  async function onSubmit(data: z.infer<typeof UpdateProfileValidation>) {
    if (!session || !session?.accessToken) {
      toast.error("Token not found! Please login again.");
    } else {
      await mutateAsync({
        user: data,
        jwt: session.accessToken,
      });
    }
  }

  return (
    <>
      <Dialog open={avatarDialogOpen} onOpenChange={setAvatarDialogOpen}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3 md:space-y-4"
          >
            <div
              className="w-max mx-auto cursor-pointer hover:opacity-90"
              onClick={() => setAvatarDialogOpen(true)}
            >
              <Avatar className="size-48">
                <AvatarImage src={user?.avatar || undefined} />
                <AvatarFallback className="text-5xl font-semibold">
                  {user?.firstName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col gap-4">
              <ControlledInput<z.infer<typeof UpdateProfileValidation>>
                control={form.control}
                name="firstName"
                label="FirstName"
                type="text"
                placeholder="John"
                required={true}
              />
              <ControlledInput<z.infer<typeof UpdateProfileValidation>>
                control={form.control}
                name="lastName"
                label="Last Name"
                type="text"
                placeholder="Doe"
                required={true}
              />
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={user?.email || ""}
                  disabled
                />
              </div>
            </div>
            <div>
              <div className="grid w-full max-w-sm items-center gap-3">
                <Label>Adresses</Label>
                {user?.addresses.length === 0 && (
                  <Link
                    href={"/profile/addresses"}
                    className="text-sm hover:opacity-90 hover:underline"
                  >
                    Add New Address
                  </Link>
                )}
              </div>
            </div>
            <Button type="submit" disabled={isPending}>
              Update Profile
            </Button>
          </form>
        </Form>

        <DialogContent className="sm:max-w-[425px]">
          <UserAvatarForm onClose={() => setAvatarDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateProfileForm;