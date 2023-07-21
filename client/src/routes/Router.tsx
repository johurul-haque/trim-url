import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Collection } from './Collection.tsx';
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
    ],
  },
]);

export default router;
