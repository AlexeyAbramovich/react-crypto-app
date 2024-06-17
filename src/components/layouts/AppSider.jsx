import { Layout } from 'antd'
import { AssetItem } from '../AssetItem'
import { useCrypto } from '../../hooks/useCrypto'

const siderStyle = {
  padding: '1rem',
}

export const AppSider = () => {
  const { assets } = useCrypto()

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <AssetItem key={asset.id} asset={asset} />
      ))}
    </Layout.Sider>
  )
}
