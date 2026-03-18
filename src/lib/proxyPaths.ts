export const proxyPaths = {
  publicOnlyPages: [{ path: '/login' }, { path: '/register' }],
  protectedPages: [
    {
      path: '/cart',
      message: 'You need to be logged in to view your cart.',
    },
    {
      path: '/checkout',
      message: 'You need to be logged in to view the checkout page.',
    },
  ],
  adminProtectedPages: [{ path: '/admin' }],
  protectedApis: [{ path: '/api/me' }, { path: '/api/cart' }],
};
