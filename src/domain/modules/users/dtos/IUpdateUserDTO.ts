export type IUpdateUserDTO = {
  name?: string;
  email?: string;
  password?: string;
  logged_token?: string | null;
  avatar_url?: string | null;
};
