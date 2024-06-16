import { Card, Statistic, List } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { AssetInfoItem } from './AssetInfoItem'
import { capitalizeFirstLetter } from '../utils'

export const AssetItem = ({ asset }) => {
  return (
    <Card style={{ marginBottom: '1rem' }}>
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
        renderItem={(item) => <AssetInfoItem item={item} asset={asset} />}
      />
    </Card>
  )
}
