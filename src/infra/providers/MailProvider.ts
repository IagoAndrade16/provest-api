/* eslint-disable @typescript-eslint/no-explicit-any */

import SMTPTransport from "nodemailer/lib/smtp-transport";

export type SendMailInput = {
  to: string;
  subject: string;
  variables: any;
  path: string;
};

export type MailProvider = {
  send(input: SendMailInput): Promise<SMTPTransport.SentMessageInfo>;
};

export const mailProviderAlias = "MailProvider";
