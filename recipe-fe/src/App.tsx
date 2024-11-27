import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import './index.css';
import Home from './screens/home';
import AuthPage from './screens/auth/AuthPage';
import ActualHome from './screens/home/ActualHome';

const paths = [
    {
        path: '/',
        element: (
          <Home/>
        ),
    },
    {
      path: '/auth',
      element: (
        <AuthPage/>
      ),
    },
    {
      path:'/home',
      element: (
        <ActualHome/>
      )
    },
];

const BrowserRouter = createBrowserRouter(paths);

const App = () => {
  return (
  <MantineProvider>
    <RouterProvider router={BrowserRouter}/>
  </MantineProvider>
  )
};

export default App;