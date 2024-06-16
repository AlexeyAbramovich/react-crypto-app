import { List, Typography, Tag } from 'antd'

export const AssetInfoItem = ({ item, asset }) => {
  return (
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
  )
}
