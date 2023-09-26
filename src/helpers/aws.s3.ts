import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const { BUCKET_NAME, BUCKET_REGION, AWS_ACSESS_KEY, AWS_ACSESS_SECRET } =
  process.env;

export class PhotoS3Loader {
  private readonly s3 = new S3Client({
    credentials: {
      accessKeyId: AWS_ACSESS_KEY,
      secretAccessKey: AWS_ACSESS_SECRET,
    },
    region: BUCKET_REGION,
  });

  async uploadPhoto(fileName: string, file: Express.Multer.File) {
    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const comand = new PutObjectCommand(params);
    const result = await this.s3.send(comand);
    return result;
  }

  async getPhotoUrl(protoName: string) {
    const getObjParam = {
      Bucket: BUCKET_NAME,
      Key: protoName,
    };

    const comand = new GetObjectCommand(getObjParam);
    const url = await getSignedUrl(this.s3, comand, { expiresIn: 10000 });

    return url;
  }

  async deleteFromS3(photoName: string) {
    const param = {
      Bucket: BUCKET_NAME,
      Key: photoName,
    };

    const comand = new DeleteObjectCommand(param);
    const result = await this.s3.send(comand);

    return result;
  }
}

// export async function downloadImage(key: string) {
//   import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
//   import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
//   const client = new S3Client(clientParams);
//   const command = new GetObjectCommand(getObjectParams);
//   const url = await getSignedUrl(client, command, { expiresIn: 3600 });
// }
