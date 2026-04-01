import dynamic from 'next/dynamic';

/**
 * Fix hydration error by React Hook Form Devtools: https://github.com/react-hook-form/devtools/issues/187
 */
const DevT: React.ElementType = dynamic(
  () => import('@hookform/devtools').then((module) => module.DevTool),
  { ssr: false },
);

export default DevT;
