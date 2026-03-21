import type { payment_method } from '@/src/generated/prisma/client';

export default function PaymentMethod({
  payment_method,
}: {
  payment_method: payment_method;
}) {
  const { id, code, name } = payment_method;
  return (
    <div>
      {id} - {code} - {name}
    </div>
  );
}
