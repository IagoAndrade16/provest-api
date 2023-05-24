export type S3Provider = {
  save(file: string, folder: string): Promise<string>;
  delete(file: string, folder: string): Promise<void>;
};

export const S3ProviderAlias = "S3Provider";
