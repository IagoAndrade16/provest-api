import * as fs from "fs";
import path from "path";

import { S3ProviderImpl } from "../implementations/S3ProviderImpl";
import { S3Provider } from "../S3Provider";

let s3Provider: S3Provider;

beforeEach(() => {
  s3Provider = new S3ProviderImpl();

  const tempFolderPath = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "domain",
    "temp"
  );
  const fileName = "foto.jpeg";

  const fullPath = path.join(tempFolderPath, fileName);

  const buffer = Buffer.alloc(0);

  fs.writeFileSync(fullPath, buffer);
});

it("should save a new file in aws bucket and delete after save", async () => {
  const fileUrl = await s3Provider.save("foto.jpeg", "avatar");

  await s3Provider.delete(fileUrl, "avatar");

  expect(fileUrl).toContain("foto");
});
