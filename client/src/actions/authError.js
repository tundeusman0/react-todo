import { User_Auth_Fail, Get_User_Fail } from './types';

export const returnAuthError = payload => ({
  type: User_Auth_Fail,
  payload
});

export const GetUserFail = payload => ({
  type: Get_User_Fail,
  payload
});
