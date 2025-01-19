export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    token: string;
    name: string;
    email: string;
  };
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  status: string;
  message: string;
  data: {
    name: string;
    email: string;
    password: string;
    _id: string;
    __v: number;
  };
}
