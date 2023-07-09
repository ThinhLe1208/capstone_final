import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from 'pages/ErrorPage';
import ProjectBoard from 'pages/ProjectBoard';
import ProjectCreate from 'pages/ProjectCreate';
import ProjectManagement from 'pages/ProjectManagement';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SingIn';
import UserManagement from 'pages/UserManagement';
import AppTemplate from 'templates/AppTemplate';
import AuthTemplate from 'templates/AuthTemplate';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthTemplate />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '/project',
    element: <AppTemplate />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ProjectManagement />,
      },
      {
        path: ':projectId',
        element: <ProjectBoard />,
      },
      {
        path: 'create',
        element: <ProjectCreate />,
      },
    ],
  },
  {
    path: '/users',
    element: <AppTemplate />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UserManagement />,
      },
    ],
  },
]);
