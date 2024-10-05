export interface UserResponseApi {
  data: UserInterface;
  status: number;
}

export interface UserInterface {
  name: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}
