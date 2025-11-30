import { Storage } from "@google-cloud/storage";
import { config } from "../env.config";

const storage = new Storage({
  projectId: config.GCP_PROJECT_ID,
  credentials: {
    client_email: config.GCP_CLIENT_EMAIL,
    private_key: config.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

export const uploadFileToGCS = async (
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<{ url: string }> => {
  try {
    const bucket = storage.bucket(config.GCS_BUCKET_NAME!);
    const blob = bucket.file(fileName);

    await blob.save(file, {
      contentType: contentType,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    });

    await blob.makePublic();

    const publicUrl = `https://storage.googleapis.com/${config.GCS_BUCKET_NAME}/${fileName}`;

    return {
      url: publicUrl,
    };
  } catch (error) {
    console.error("Error uploading file to GCS:", error);
    throw error;
  }
};
