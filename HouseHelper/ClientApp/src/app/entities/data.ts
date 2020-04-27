import { Alert } from './alert';

export interface Data {
  description: string;
  creationDate: Date;
  alert?: Alert;
}
