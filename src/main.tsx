import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import store from './redux/index.ts'

import './index.css'
import App from './App.tsx'
import Toast from './components/Toast/Toast.tsx'

import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toast />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
