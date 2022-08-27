export interface IdentityVerification {
  documentType: string;
  series?: string;
  number: number
  issuedBy?: string
  dateOfIssue: Date;
  file?: File;
}
