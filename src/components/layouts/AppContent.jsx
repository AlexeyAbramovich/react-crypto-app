import { Layout, Typography } from 'antd'
import { useCrypto } from '../../hooks/useCrypto'
import { PortfolioCharts } from '../PortfolioCharts'
import { AssetsTable } from '../AssetsTable'

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
}

export const AppContent = () => {
  const { assets, data } = useCrypto()

  const cryptoPriceMap = data.reduce((acc, c) => {
    acc[c.id] = c.price
    return acc
  }, {})

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: 'start', color: '#fff' }}>
        Portfolio:{' '}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => acc + v, 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioCharts />
      <AssetsTable />
    </Layout.Content>
  )
}
