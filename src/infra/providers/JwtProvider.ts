export type JwtProvider = {
  generate(userId: string): string;
  verify(token: string): string;
};

export const JwtProviderAlias = "JwtProvider";
