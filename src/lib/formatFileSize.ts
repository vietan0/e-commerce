export default function formatFileSize(bytes: number) {
  const mb = bytes / 1024;

  if (mb > 1024) {
    const gb = mb / 1024;
    return `${gb.toFixed(1)} GB`;
  }

  return `${mb.toFixed(1)} MB`;
}
