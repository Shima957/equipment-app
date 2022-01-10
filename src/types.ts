export type SignInFormValue = {
  email: string;
  password: string;
}

export type SignUpFormValue = {
  email: string;
  userId: string;
  displayName: string;
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
  title: string | undefined | null;
  onClick?: (args?: any) => any
};
