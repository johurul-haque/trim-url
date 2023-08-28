const dev = process.env.NODE_ENV !== 'production';

const server = dev ? 'https://localhost:3000/' : 'https://trimurl.vercel.app/';

export default server;
