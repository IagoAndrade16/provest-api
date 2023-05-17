import { User } from "../User";

describe("isBasicSequencePassword", () => {
  it("should return true if password contain basic sequence: 123456", () => {
    const password = "123456";

    const invalidPassoword = User.isBasicSequencePassword(password);

    expect(invalidPassoword).toBe(true);
  });

  it("should return true if password contain inverse basic sequence: 654321", () => {
    const password = "654321";

    const invalidPassoword = User.isBasicSequencePassword(password);

    expect(invalidPassoword).toBe(true);
  });

  it("should return true if password contain at most 3 numbers in sequence", () => {
    const password = "3026123";

    const invalidPassoword = User.isBasicSequencePassword(password);

    expect(invalidPassoword).toBe(true);
  });

  it("should return false if password does not contain basic sequences", () => {
    const password = "30260389";

    const invalidPassoword = User.isBasicSequencePassword(password);

    expect(invalidPassoword).toBe(false);
  });
});

describe("passwordIncludesName", () => {
  it("should return true if password contain name", () => {
    const password = "3026iago";
    const name = "IAGO";

    const includesNamePassword = User.passwordIncludesName(password, name);

    expect(includesNamePassword).toBe(true);
  });

  it("should return true if password does not contain name", () => {
    const password = "3026iago";
    const name = "alexandre";

    const includesNamePassword = User.passwordIncludesName(password, name);

    expect(includesNamePassword).toBe(false);
  });
});

describe("getSecurityPasswordStatus", () => {
  it("should return BASIC_SEQUENCE if password contain basic sequence: 123456", () => {
    const password = "123456";
    const name = "IAGO";

    const passwordSecurityStatus = User.getSecurityPasswordStatus(
      password,
      name
    );

    expect(passwordSecurityStatus).toBe("BASIC_SEQUENCE");
  });

  it("should return BASIC_SEQUENCE if password contain at most 3 numbers in sequence", () => {
    const password = "3026123";
    const name = "IAGO";

    const passwordSecurityStatus = User.getSecurityPasswordStatus(
      password,
      name
    );

    expect(passwordSecurityStatus).toBe("BASIC_SEQUENCE");
  });

  it("should return INCLUDES_NAME if password contain name", () => {
    const password = "3026iago";
    const name = "IAGO";

    const includesNamePassword = User.getSecurityPasswordStatus(password, name);

    expect(includesNamePassword).toBe("INCLUDES_NAME");
  });

  it("should return SECURE if password does not have basic sequence and does not includes name", () => {
    const password = "30260389";
    const name = "IAGO";

    const includesNamePassword = User.getSecurityPasswordStatus(password, name);

    expect(includesNamePassword).toBe("SECURE");
  });
});
