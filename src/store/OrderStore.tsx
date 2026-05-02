import { createContext, useContext, useEffect, useState } from 'react';
import { createStore, useStore } from 'zustand';
import type { OrderCommon } from '@/src/types';

/* 
  To use within each OrderRow in admin page,
  so that nested children of OrderRow can access the order object without prop drilling.
 */

type OrderStore = { order: OrderCommon };

const createOrderStore = (order: OrderCommon) => {
  return createStore<OrderStore>()(() => ({ order }));
};

const OrderStoreContext = createContext<ReturnType<
  typeof createOrderStore
> | null>(null);

export function OrderStoreProvider({
  order,
  children,
}: {
  order: OrderCommon;
  children: React.ReactNode;
}) {
  const [store] = useState(() => createOrderStore(order));

  useEffect(() => {
    // update the order in store when the order passed (from query) changes
    store.setState({ order });
  }, [order, store]);

  return (
    <OrderStoreContext.Provider value={store}>
      {children}
    </OrderStoreContext.Provider>
  );
}

export function useOrderStore<U>(selector: (state: OrderStore) => U) {
  const store = useContext(OrderStoreContext);

  if (store === null) {
    throw new Error('useOrderStore must be used within OrderStoreProvider');
  }

  return useStore(store, selector);
}
