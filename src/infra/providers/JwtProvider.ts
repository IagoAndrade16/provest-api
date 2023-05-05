export interface IJwtProvider {
  generate(userId: string): string;
}

export const JwtProviderAlias = "JwtProvider";
