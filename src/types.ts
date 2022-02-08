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

export type GearFormValue = {
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

export type GearLabel = '製品' | 'メーカー' | '製品Url'
