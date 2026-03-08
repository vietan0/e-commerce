import { Container } from '@mui/material';
import { redirect } from 'next/navigation';
import getSession from '@/app/api/(auth)/_lib/getSession';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionResult = await getSession();
  if (sessionResult.session) redirect('/');

  return (
    <Container
      sx={{
        maxWidth: {
          xs: 500,
        },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {children}
    </Container>
  );
}
