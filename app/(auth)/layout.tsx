import { Container } from '@mui/material';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
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
