import AWS from 'aws-sdk';

const { BUCKET_NAME, BUCKET_REGION, AWS_ACSESS_KEY, AWS_ACSESS_SECRET } =
  process.env;

const s3 = new AWS.S3({
  accessKeyId: AWS_ACSESS_KEY,
  secretAccessKey: AWS_ACSESS_SECRET,
  region: BUCKET_REGION,
});

export async function uploadPhoto(
  fileName: string,
  file: Express.Multer.File['buffer'],
) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file,
  };

  return s3.upload(params).promise();
}
