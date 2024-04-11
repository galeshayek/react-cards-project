import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { CustomTheme } from './chakraTheme'
import AuthProvider from './contexts/AuthContext'
import SearchContextProvider from './contexts/SearchContext'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ColorModeScript initialColorMode={CustomTheme.config.initialColorMode} />
      <ChakraProvider theme={CustomTheme}>
        <SearchContextProvider>
          <RouterProvider router={router} />
        </SearchContextProvider>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode >
)
