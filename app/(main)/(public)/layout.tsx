import { Container } from '@mui/material';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container
      sx={{
        py: {
          xs: 2,
        },
        maxWidth: {
          lg: 1500,
        },
      }}
    >
      {children}
    </Container>
  );
}
