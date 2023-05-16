import { DomainError } from "@errors/DomainError";
import { resolve } from "path";

import { MailProviderImpl } from "../implementations/MailProviderImpl";
import { MailProvider } from "../MailProvider";

let mailProvider: MailProvider;

beforeAll(() => {
  mailProvider = new MailProviderImpl();
});

describe("send", () => {
  it("should throw INVALID_EMAIL if to is invalid email", async () => {
    const path = resolve(__dirname, ".", "templates", "test.hbs");

    await expect(
      mailProvider.send({
        subject: "Subject of email",
        to: "invalid email",
        variables: {},
        path,
      })
    ).rejects.toEqual(new DomainError("INVALID_EMAIL"));
  });

  it("should send mail", async () => {
    const path = resolve(__dirname, ".", "templates", "test.hbs");

    const message = await mailProvider.send({
      subject: "Subject of email",
      to: "iago@gmail.com",
      variables: {},
      path,
    });

    console.log(message.messageId);

    expect(message).toHaveProperty("messageId");
  });
});
