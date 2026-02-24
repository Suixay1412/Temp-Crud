/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import AuthorizedRoute from '../components/AuthorizedRoute'
import UnauthorizedRoute from '..//components/UnauthorizedRoute'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))
const SignUp = lazy(() => import('../pages/SignUp/SignUp'))
const PasswordReset = lazy(() => import('../pages/PasswordReset/PasswordReset'))
const About = lazy(() => import('../pages/About'))
const Home = lazy(() => import('../pages/Home/Home'))
const MyAccount = lazy(() => import('../pages/MyAccount/MyAccount'))
const Users = lazy(() => import('../pages/Users/Users'))
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'))
const TrendsPage = lazy(() => import('../pages/Dashboard/TrendsPage'))
const AlarmPage = lazy(() => import('../pages/Dashboard/AlarmPage'))
const LogPage = lazy(() => import('../pages/Dashboard/LogPage')) 

/* const DialogDemo = lazy(() => import('../pages/DialogDemo/DialogDemo'))
const ToastDemo = lazy(() => import('../pages/ToastDemo/ToastDemo'))
const FilterDemo = lazy(() => import('../pages/FilterDemo'))
const ListPageDemo = lazy(() => import('../pages/ListPageDemo'))
const TabsDemo = lazy(() => import('../pages/TabsDemo'))
*/

const routes = [
  {
    path: '/signin',
    exact: true,
    element: (
      <UnauthorizedRoute>
        <SignIn redirectTo="/home" />
      </UnauthorizedRoute>
    ),
  },
  {
    path: '/signup',
    exact: true,
    element: (
      <UnauthorizedRoute>
        <SignUp redirectTo="/home" />
      </UnauthorizedRoute>
    ),
  },
  {
    path: '/password_reset',
    exact: true,
    element: (
      <UnauthorizedRoute>
        <PasswordReset />
      </UnauthorizedRoute>
    ),
  },
  {
    path: '/about',
    exact: true,
    element: <About />,
  },
  {
    path: '/my_account',
    exact: true,
    element: (
      <AuthorizedRoute>
        <MyAccount />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/users',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Users />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/dashboard',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Dashboard />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/home',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Home />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/trends',
    exact: true,
    element: (
      <AuthorizedRoute>
        <TrendsPage />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/alarm',
    exact: true,
    element: (
      <AuthorizedRoute>
        <AlarmPage />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/log',
    exact: true,
    element: (
      <AuthorizedRoute>
        <LogPage />
      </AuthorizedRoute>
    ),
  },
/*   {
    path: '/dialog_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <DialogDemo />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/toast_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <ToastDemo />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/filter_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <FilterDemo />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/list_page_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <ListPageDemo />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/tabs_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <TabsDemo />
      </AuthorizedRoute>
    ),
  }, */
]

export default routes
