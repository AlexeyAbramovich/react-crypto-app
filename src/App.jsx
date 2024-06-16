import { AppLayout } from './components/layouts/AppLayout'
import { CryptoContextProvider } from './context/CryptoContextProvider'

function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  )
}

export default App
