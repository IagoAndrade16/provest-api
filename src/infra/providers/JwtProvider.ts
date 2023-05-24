import { IPayload } from "./implementations/JwtProviderImpl";

export type JwtProvider = {
  generate(userId: string): string;
  verify(token: string): IPayload;
};

export const JwtProviderAlias = "JwtProvider";
