import { readFile } from "node:fs/promises";

import {
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";

import { fromEnv } from "@aws-sdk/credential-providers";

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

async function deploy() {
  console.log("accessKeyId", accessKeyId);
  console.log("secretAccessKeyy", secretAccessKey);
  //if (!accessKeyId || !secretAccessKey) {
  //  console.error("Invalid credentials");
  //  return;
  //}

  const client = new S3Client({
    region: "us-east-1",
    credentials: fromEnv(),
  });

  const command = new PutObjectCommand({
    Bucket: "ad-unit-cdn",
    Key: "index.js",
    Body: await readFile("./dist/index.min.js"),
  });

  try {
    const response = await client.send(command);
    if (response.$metadata.httpStatusCode === 200) {
      console.log("Deployed code!!!!!!!");
    }
  } catch (caught) {
    if (
      caught instanceof S3ServiceException &&
      caught.name === "EntityTooLarge"
    ) {
      console.error(
        `Error from S3 while uploading object to ${"ad-unit-cdn"}. \
The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
or the multipart upload API (5TB max).`,
      );
    } else if (caught instanceof S3ServiceException) {
      console.error(
        `Error from S3 while uploading object to ${"ad-unit-cdn"}.  ${caught.name}: ${caught.message}`,
      );
    } else {
      throw caught;
    }
  }
}

deploy();
