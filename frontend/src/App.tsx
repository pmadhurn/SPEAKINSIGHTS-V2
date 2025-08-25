import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getHealth, getApiBaseUrl } from './lib/api'
import FileUploader from './components/common/FileUploader'
import { useTheme } from './theme'

function App() {
  const [count, setCount] = useState(0)
  const [apiStatus, setApiStatus] = useState<string>('checking...')
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    getHealth()
      .then((res) => setApiStatus(res.status))
      .catch(() => setApiStatus('unreachable'))
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div style={{ position: 'absolute', top: 12, right: 12 }}>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          Backend ({getApiBaseUrl()}) health: <strong>{apiStatus}</strong>
        </p>
      </div>
      <p>
        <a href="/meetings">Go to Meetings</a>
      </p>
      <div style={{ marginTop: 24 }}>
        <h3>Upload</h3>
        <FileUploader />
      </div>
      <p style={{ marginTop: 16 }}>
        <a href="/settings">Settings</a>
      </p>
    </>
  )
}

export default App
