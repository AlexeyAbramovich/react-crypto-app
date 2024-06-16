import { Layout, Card, Statistic, List, Spin, Typography, Tag } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { fakeFetchCryptoAssets, fakeFetchCryptoData } from '../../api'
import {
  capitalizeFirstLetter,
  percentDifference,
  totalProfit,
} from '../../utils'

const siderStyle = {
  padding: '1rem',
}

export const AppSider = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [assets, setAssets] = useState([])

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const { result } = await fakeFetchCryptoData()
      const cryptoAssets = await fakeFetchCryptoAssets()

      setAssets(
        cryptoAssets.map((asset) => {
          const coin = result.find((coin) => coin.id === asset.id)
          return {
            grow: asset.price < coin.price,
            growPersent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: totalProfit(asset, coin),
            ...asset,
          }
        })
      )
      setData(result)

      setLoading(false)
    }
    preload()
  }, [])

  if (loading) {
    return <Spin fullscreen />
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={capitalizeFirstLetter(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{
              color: asset.grow ? '#3f8600' : '#cf1322',
            }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: 'Total Profit',
                value: asset.totalProfit,
                withTag: true,
              },
              { title: 'Total Amount', value: asset.amount, isStatic: true },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>

                {item.isStatic ? (
                  <span>{item.value}</span>
                ) : (
                  <span>
                    {item.withTag && (
                      <Tag color={asset.grow ? 'green' : 'red'}>
                        {asset.grow ? '+' : '-'}
                        {asset.growPersent}
                      </Tag>
                    )}
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {asset.grow ? '+' : '-'}
                      {item.value}
                    </Typography.Text>
                  </span>
                )}
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  )
}
