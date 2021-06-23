interface IUserRequestDTO {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

export { IUserRequestDTO };
