import { S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "../../../domain/middlewares/uploadFile";
import { S3Provider } from "../S3Provider";

export class S3ProviderImpl implements S3Provider {
  private client: S3;
  constructor() {
    this.client = new S3({
      region: process.env.AWS_REGION,
    });
  }
  async save(file: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    const saveObjectInS3 = this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: file,
      ACL: "public-read",
      Body: fileContent,
      ContentType,
    });

    const removeLocalObject = fs.promises.unlink(originalName);

    await Promise.all([saveObjectInS3, removeLocalObject]);

    return process.env.AWS_LINK_TO_FILE + file;
  }
  async delete(fileUrl: string): Promise<void> {
    const [, file] = fileUrl.split("avatar/");

    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}`,
      Key: file,
    });
  }
}
