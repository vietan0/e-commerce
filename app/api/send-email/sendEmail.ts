import { Resend } from 'resend';
import DynamicComponent from '@/src/DynamicComponent';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail({
  templateName,
  templateProps,
  subject,
  to = ['delivered@resend.dev'],
  locale,
}: {
  templateName: string;
  // biome-ignore lint/suspicious/noExplicitAny: <Can't realistically have type safety here.>
  templateProps: { [key: string]: any };
  subject: string;
  to?: string[];
  locale: string;
}) {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to,
    subject,
    react: DynamicComponent({
      name: templateName,
      props: {
        ...templateProps,
        locale,
      },
    }),
  });

  if (error) throw error;
  return data;
}
