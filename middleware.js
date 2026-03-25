export const config = {
  matcher: '/STARK-procurement/:path*',
};

export default function middleware(request) {
  const authHeader = request.headers.get('authorization');

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ');
    if (scheme === 'Basic') {
      const decoded = atob(encoded);
      const [user, password] = decoded.split(':');

      // Password: ADAPT2026e (any username accepted)
      if (password === 'ADAPT2026e') {
        return;
      }
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="STARK Procurement"',
    },
  });
}
