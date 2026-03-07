import { Container } from '@mui/material';
import { redirect } from 'next/navigation';
import checkSession from '@/app/api/(auth)/_lib/checkSession';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkSessionResult = await checkSession();
  if (checkSessionResult.session) redirect('/');

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
