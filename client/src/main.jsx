import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import store from './store/Store.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer position="top right" autoClose={3000}/>
    </BrowserRouter>
  </Provider>
)
