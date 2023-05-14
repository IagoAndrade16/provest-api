/* eslint-disable @typescript-eslint/no-explicit-any */

export type SendMailInput = {
  to: string;
  subject: string;
  variables: any;
  path: string;
};

export type MailProvider = {
  send(input: SendMailInput): Promise<void>;
};

export const mailProviderAlias = "MailProvider";
