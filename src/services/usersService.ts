import { UserJiraLoginModel, UserJiraModel, UserJiraModelUpdateModel } from 'models/usersModel';
import { https } from './baseService';

class UsersService {
  signUp = (signUpFormValues: UserJiraModel) => {
    let url = '/api/Users/signup';
    return https.post(url, signUpFormValues);
  };

  signIn = (signInFormValues: UserJiraLoginModel) => {
    let url = '/api/Users/signin';
    return https.post(url, signInFormValues);
  };

  getuser = (keyword: string | undefined) => {
    let url = '/api/Users/getUser';
    if (keyword) {
      url = `/api/Users/getUser?keyword=${keyword}`;
    }
    return https.get(url);
  };

  editUser = (editUser: UserJiraModelUpdateModel) => {
    let url = '/api/Users/editUser';
    return https.put(url, editUser);
  };

  deleteUser = (id: number) => {
    let url = '/api/Users/deleteUser';
    if (id) {
      url = `/api/Users/deleteUser?id=${id}`;
    }
    return https.delete(url);
  };
}

export const usersService = new UsersService();
