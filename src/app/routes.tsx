import { Navigate, createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import LegacyBlogPostRedirect from '@/pages/LegacyBlogPostRedirect';
import Home from '@/pages/Home';
import Signals from '@/pages/Signals';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
const WRITING_PATH = '/writing';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'writing', element: <Blog /> },
        { path: 'writing/:slug', element: <BlogPost /> },
        { path: 'blog', element: <Navigate to={WRITING_PATH} replace /> },
        { path: 'blog/:slug', element: <LegacyBlogPostRedirect /> },
        { path: 'signals', element: <Signals /> },
        { path: '*', element: <Navigate to="/" replace /> },
      ],
    },
  ],
  { basename },
);
