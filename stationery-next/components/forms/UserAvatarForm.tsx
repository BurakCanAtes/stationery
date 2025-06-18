import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarFormValidation } from "@/lib/validation";
import { useUpdateAvatar, useUploadAvatar } from "@/lib/tools/mutations";

const UserAvatarForm = ({ onClose }: { onClose: () => void }) => {
  const { data: session, update } = useSession();

  // update by upload file
  const { mutateAsync: uploadAvatar } = useUploadAvatar(update);
  // update by image url
  const { mutateAsync: updateAvatar } = useUpdateAvatar(update);

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<z.infer<typeof AvatarFormValidation>>({
    resolver: zodResolver(AvatarFormValidation),
  });

  const file = watch("file");
  const avatarUrl = watch("avatarUrl");

  useEffect(() => {
    if (file) {
      resetField("avatarUrl");
    }
  }, [file, resetField]);

  useEffect(() => {
    if (avatarUrl) {
      resetField("file");
    }
  }, [avatarUrl, resetField]);

  async function onSubmit(data: z.infer<typeof AvatarFormValidation>) {
    if (!session || !session.accessToken) {
      toast.error("Token not found! Please login again.");
    } else {
      if (data.file) {
        await uploadAvatar({
          avatar: data.file,
          jwt: session.accessToken,
        });
        onClose();
      }
      if (data.avatarUrl) {
        await updateAvatar({
          avatar: data.avatarUrl,
          jwt: session.accessToken,
        });
        onClose();
      }
    }
  }

  const deleteAvatar = async () => {
    if (!session || !session.accessToken) {
      toast.error("Token not found! Please login again.");
    } else {
      await updateAvatar({
        avatar: null,
        jwt: session.accessToken,
      });
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogHeader className="mb-4">
        <DialogTitle>Edit Avatar</DialogTitle>
        <DialogDescription>
          Upload from your device or paste an image link. Only jpg, png and webp
          files are allowed. Max file size 2MB.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="selectAvatar">Select Avatar</Label>
          <Input id="selectAvatar" type="file" {...register("file")} />
          {errors.file?.message && (
            <p className="text-red-500 text-sm">
              {String(errors.file.message)}
            </p>
          )}
        </div>
        <p>Or</p>
        <div className="grid gap-3">
          <Label htmlFor="avatarLink">Avatar URL</Label>
          <Input
            id="avatarLink"
            placeholder="https://example.com/example.jpg"
            {...register("avatarUrl")}
          />
          {errors.avatarUrl && (
            <p className="text-red-500 text-sm">{errors.avatarUrl.message}</p>
          )}
        </div>
      </div>
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant="outline" onClick={() => onClose()}>Cancel</Button>
        </DialogClose>
        <Button type="button" onClick={deleteAvatar}>Delete Avatar</Button>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  );
};

export default UserAvatarForm;