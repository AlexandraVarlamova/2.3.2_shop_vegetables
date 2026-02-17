import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css' 
import { MantineProvider } from '@mantine/core'

console.log('main.tsx loaded');  

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
