import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Meetings from './pages/Meetings'
import MeetingDetail from './pages/MeetingDetail'
import Settings from './pages/Settings'
import Analytics from './pages/Analytics'
import { ThemeProvider } from './theme'

const router = createBrowserRouter([
	{ path: '/', element: <App /> },
	{ path: '/meetings', element: <Meetings /> },
	{ path: '/meetings/:id', element: <MeetingDetail /> },
	{ path: '/analytics/:id', element: <Analytics /> },
	{ path: '/settings', element: <Settings /> },
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	</StrictMode>,
)
