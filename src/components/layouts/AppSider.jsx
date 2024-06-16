import { Layout } from 'antd'
import { AssetItem } from '../AssetItem'
import { useContext } from 'react'
import CryptoContext from '../../context/CryptoContextProvider'

const siderStyle = {
  padding: '1rem',
}

export const AppSider = () => {
  const { assets } = useContext(CryptoContext)

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <AssetItem key={asset.id} asset={asset} />
      ))}
    </Layout.Sider>
  )
}
