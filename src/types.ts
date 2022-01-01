export type SignInFormValue = {
  email: string;
  password: string;
}

export type SignUpFormValue = {
  email: string;
  name: string;
  password: string;
  confirm: string;
}

export type CreateGearValue = {
  category: string;
  name: string;
  maker: string;
  url: string;
  img: File[];
}
