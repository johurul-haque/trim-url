import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Collection } from './Collection.tsx';
import { Update } from './Update.tsx';
import { Root } from './root.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/collection',
        element: <Collection />,
      },
      {
        path: '/edit/:id',
        element: <Update />,
      },
    ],
  },
]);

export default router;
