import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.render(
  <GoogleOAuthProvider clientId="93246688832-3fa2but5449q3faa4a7rvop2igu50k7v.apps.googleusercontent.com">
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
)
