import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getHealth, API_BASE_URL } from './lib/api'
import FileUploader from './components/common/FileUploader'

function App() {
  const [count, setCount] = useState(0)
  const [apiStatus, setApiStatus] = useState<string>('checking...')

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
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          Backend ({API_BASE_URL}) health: <strong>{apiStatus}</strong>
        </p>
      </div>
      <p>
        <a href="/meetings">Go to Meetings</a>
      </p>
      <div style={{ marginTop: 24 }}>
        <h3>Upload</h3>
        <FileUploader />
      </div>
    </>
  )
}

export default App
