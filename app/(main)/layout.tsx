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
          md: 4,
        },
      }}
    >
      {children}
    </Container>
  );
}
