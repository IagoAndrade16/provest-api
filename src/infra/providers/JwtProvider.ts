export interface IJwtProvider {
  generate(userId: string): string;
  verify(token: string): string;
}

export const JwtProviderAlias = "JwtProvider";
