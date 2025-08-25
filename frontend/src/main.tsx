import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Meetings from './pages/Meetings'
import MeetingDetail from './pages/MeetingDetail'

const router = createBrowserRouter([
	{ path: '/', element: <App /> },
	{ path: '/meetings', element: <Meetings /> },
	{ path: '/meetings/:id', element: <MeetingDetail /> },
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
