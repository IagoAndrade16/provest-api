/* eslint-disable @typescript-eslint/no-explicit-any */
import { DomainError } from "@errors/DomainError";
import { ValidationsUtils } from "@infra/validation/ValidationUtils";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { MailProvider, SendMailInput } from "../MailProvider";

export class MailProviderImpl implements MailProvider {
  async send(input: SendMailInput): Promise<SMTPTransport.SentMessageInfo> {
    if (!ValidationsUtils.validateEmail(input.to)) {
      throw new DomainError("INVALID_EMAIL");
    }

    const testAccount = await nodemailer.createTestAccount();

    const client = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 2),
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const templateFileContent = fs.readFileSync(input.path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(input.variables);

    const message = await client.sendMail({
      to: input.to,
      from: "Provest <noreply@provest.com.br>",
      subject: input.subject,
      html: templateHTML,
    });

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));

    return message;
  }
}
