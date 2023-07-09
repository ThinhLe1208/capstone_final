// signup
export type UserJiraModel = {
  email: string;
  passWord: string;
  name: string;
  phoneNumber: string;
};

// signin
export type UserJiraLoginModel = {
  email: string;
  passWord: string;
};

export type UserLoginModel = {
  id: number;
  email: string;
  avatar: string;
  phoneNumber: string;
  name: string;
  accessToken: string;
};

// getUser
export type User = {
  userId: number;
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
};

// editUser
export type UserJiraModelUpdateModel = {
  id: string;
  passWord: string;
  email: string;
  name: string;
  phoneNumber: string;
};
