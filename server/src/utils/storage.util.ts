import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "../env.config";

const s3 = new S3Client({
  region: config.AWS_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID!,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadFileToS3 = async (
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<{ url: string }> => {
  try {
    const params = {
      Bucket: config.AWS_BUCKET_NAME!,
      Key: fileName,
      Body: file,
      ContentType: contentType,
    };

    await s3.send(new PutObjectCommand(params));

    const location = `https://${config.AWS_BUCKET_NAME}.s3.${config.AWS_REGION}.amazonaws.com/${fileName}`;

    return {
      url: location,
    };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};
