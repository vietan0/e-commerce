export default function formatFileSize(bytes: number) {
  const kb = bytes / 1024;

  if (kb > 1024) {
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  }

  return `${kb.toFixed(1)} KB`;
}
