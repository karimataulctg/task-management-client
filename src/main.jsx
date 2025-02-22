import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './components/MainLayout';
import AuthProvider from './Authprovider';
import { Home } from 'lucide-react';
import TaskManagementApp from './taskManagement/TaskManagementApp';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
      element: <Home></Home>,
      },
      {
        path: "/taskManagement",
        element: <TaskManagementApp></TaskManagementApp>,
      },

    ]},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
     <RouterProvider router={router} />
     </AuthProvider>
  </StrictMode>,
)
