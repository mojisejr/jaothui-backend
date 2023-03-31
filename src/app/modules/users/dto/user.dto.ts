export interface CreateUserDTO {
  walletAddress: string;
  name: string;
  email?: string;
  profile?: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  profile?: string;
}
