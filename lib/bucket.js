import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
    region: process.env.BUCKET_REGION
});

export async function sendToBucket(picture, filename) {
    const bufferedImage = await picture.arrayBuffer();
    s3.putObject({
        Bucket: process.env.BUCKET_NAME,
        Key: filename,
        Body: Buffer.from(bufferedImage),
        ContentType: picture.type,
    });
}

export function getBucketUrl() {
    return `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com`;
}

export function getPictureUrl(filename) {
    return getBucketUrl() + '/' + filename;
}