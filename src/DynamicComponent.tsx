import OrderPlaced from '@/src/emails/OrderPlaced';

const components = {
  OrderPlaced,
};

export default function DynamicComponent({
  name,
  props,
}: {
  name: string;
  // biome-ignore lint/suspicious/noExplicitAny: <Type safety can't be realistically implemented here.>
  [key: string]: any;
}) {
  const Component =
    components[name as keyof typeof components] ||
    (() => <p>Component "{name}" not found.</p>);
  return <Component {...props} />;
}
