export interface IUploadAvatarResponse {
  asset_id: string;
  public_id: string;
  version: number;
  width: number;
  height: number;
  format: string;
  created_at: string;
  bytes: number;
  url: string;
  secure_url: string;
  asset_folder: "avatars";
}