import { Layout } from 'antd'
import { AppHeader } from './components/layouts/AppHeader'
import { AppSider } from './components/layouts/AppSider'
import { AppContent } from './components/layouts/AppContent'

function App() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  )
}

export default App
