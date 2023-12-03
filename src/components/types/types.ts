export interface IUserInfo {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordRepeat: string;
  gender: string;
  accept?: string;
  file?: FileList;
  country: string;
}
