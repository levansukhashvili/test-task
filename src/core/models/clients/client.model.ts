export interface Client {
  lastName: string;
  name: string;
  middleName?: string;
  dateOfBirth: Date;
  phoneNumber: string;
  gender?: string;
  clientGroup: string[];
  coordinator?: string;
  doNotSendSMS?: boolean;
}
