import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const { BUCKET_NAME, BUCKET_REGION, AWS_ACSESS_KEY, AWS_ACSESS_SECRET } =
  process.env;

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_ACSESS_KEY,
    secretAccessKey: AWS_ACSESS_SECRET,
  },
  region: BUCKET_REGION,
});

export async function uploadPhoto(fileName: string, file: Express.Multer.File) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  const comand = new PutObjectCommand(params);
  const result = await s3.send(comand);
  return result;
}

// export async function downloadImage(key: string) {
//   import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
//   import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
//   const client = new S3Client(clientParams);
//   const command = new GetObjectCommand(getObjectParams);
//   const url = await getSignedUrl(client, command, { expiresIn: 3600 });
// }
