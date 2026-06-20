import { put } from '@vercel/blob';
import getSession from '@/app/api/(auth)/_lib/getSession';
import { prisma } from '@/src/lib/prisma';

async function uploadBlobs(files: File[]) {
  if (files.length === 1 && files[0].name === '' && files[0].size === 0) {
    throw new Error('No file selected');
  }

  const promises = files.map((file) =>
    put(file.name, file, { access: 'public', addRandomSuffix: true }),
  );
  const blobs = await Promise.all(promises);
  const blobsWithSize = blobs.map((b, i) => ({ ...b, size: files[i].size }));

  return blobsWithSize;
}

export default async function uploadFiles(files: File[]) {
  const { session, error } = await getSession();
  if (error) throw new Error(error);

  const blobs = await uploadBlobs(files);

  const fileRecords = await prisma.file.createManyAndReturn({
    data: blobs.map((b) => ({
      name: b.pathname,
      size: b.size,
      url: b.url,
      download_url: b.downloadUrl,
      user_id: session.app_user.id,
    })),
  });

  return fileRecords;
}
