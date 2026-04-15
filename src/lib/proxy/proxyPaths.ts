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
    {
      path: '/me',
      message: 'You need to be logged in to view your profile.',
    },
    {
      path: '/admin',
      message: 'You need to be logged in as admin to view the admin page.',
    },
  ],
  adminProtectedPages: [{ path: '/admin' }],
  protectedApis: [
    { path: '/api/me' },
    { path: '/api/cart' },
    { path: '/api/orders' },
  ],
};
