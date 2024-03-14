import { Layout, Typography } from 'antd'
import { useCrypto } from '../../context/crypto-context'
import PortfolioChart from '../PotfolioChart'
import AssetsTable from '../AssetsTable'

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
}

export default function AppContent() {
  const { assets, crypto } = useCrypto()
  const cryptoPriceMap = crypto.reduce((prev, c) => {
    prev[c.id] = c.price
    return prev
  }, {})
  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title
        level={3}
        style={{ textAlign: 'left', color: '#ffffff' }}
      >
        Portfolio:{' '}
        {assets
          .map((asset) => {
            return asset.amount * cryptoPriceMap[asset.id]
          })
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart/>
      <AssetsTable/>
    </Layout.Content>
  )
}
