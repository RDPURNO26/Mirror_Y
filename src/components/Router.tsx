import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import InstrumentsPage from '@/components/pages/InstrumentsPage';
import SingingPage from '@/components/pages/SingingPage';
import DancingPage from '@/components/pages/DancingPage';
import ArtPage from '@/components/pages/ArtPage';
import TeachersPage from '@/components/pages/TeachersPage';
import GalleryPage from '@/components/pages/GalleryPage';
import BookUsPage from '@/components/pages/BookUsPage';
import AboutPage from '@/components/pages/AboutPage';
import EnrollPage from '@/components/pages/EnrollPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "instruments",
        element: <InstrumentsPage />,
        routeMetadata: {
          pageIdentifier: 'instruments',
        },
      },
      {
        path: "singing",
        element: <SingingPage />,
        routeMetadata: {
          pageIdentifier: 'singing',
        },
      },
      {
        path: "dancing",
        element: <DancingPage />,
        routeMetadata: {
          pageIdentifier: 'dancing',
        },
      },
      {
        path: "art",
        element: <ArtPage />,
        routeMetadata: {
          pageIdentifier: 'art',
        },
      },
      {
        path: "teachers",
        element: <TeachersPage />,
        routeMetadata: {
          pageIdentifier: 'teachers',
        },
      },
      {
        path: "gallery",
        element: <GalleryPage />,
        routeMetadata: {
          pageIdentifier: 'gallery',
        },
      },
      {
        path: "book-us",
        element: <BookUsPage />,
        routeMetadata: {
          pageIdentifier: 'book-us',
        },
      },
      {
        path: "about",
        element: <AboutPage />,
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "enroll",
        element: <EnrollPage />,
        routeMetadata: {
          pageIdentifier: 'enroll',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
