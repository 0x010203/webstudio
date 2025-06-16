import { UserActionType } from './user-active-type.type';

export type UserRequestType = {
  name: string;
  phone: string;
  service?: string;
  type: UserActionType;
};
