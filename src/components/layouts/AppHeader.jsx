import { Layout, Button, Modal } from 'antd'
import { HeaderSelect } from '../HeaderSelect'
import { useState } from 'react'
import { CoinInfoModal } from '../CoinInfoModal'
import { AppDrawer } from './AppDrawer'

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const AppHeader = () => {
  const [isModalOpen, setModal] = useState(false)
  const [isDrawerOpen, setDrawer] = useState(false)
  const [coin, setCoin] = useState({})
  return (
    <Layout.Header style={headerStyle}>
      <HeaderSelect setModal={setModal} setCoin={setCoin} />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add asset
      </Button>
      <Modal open={isModalOpen} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
      <AppDrawer isDrawerOpen={isDrawerOpen} setDrawer={setDrawer} />
    </Layout.Header>
  )
}
