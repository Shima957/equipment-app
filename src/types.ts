import { ApiError } from "@supabase/gotrue-js";

export type SignInFormValue = {
  email: string;
  password: string;
}

export type SignUpFormValue = {
  email: string;
  userId: string;
  password: string;
  confirm: string;
}

export type CreateGearValue = {
  category: string;
  name: string;
  maker: string;
  url: string | null;
  img: File[]
}

export type MenuItems = {
  title: string | undefined;
  onClick?: () => (void | Promise<boolean> | Promise<{
    error: ApiError | null;
  }>)
};
