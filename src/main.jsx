import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { RouterProvider, createHashRouter } from "react-router";
import { routes } from "./routing/routing";
import './styles/index.css';
//import './data/tempMoveDataToFirebase'

const router = createHashRouter(routes);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
