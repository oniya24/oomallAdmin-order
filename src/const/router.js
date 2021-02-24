export const BASEURL =
  process.env.NODE_ENV == 'production'
    ? 'http://localhost:8082'
    : 'http://localhost:8082';