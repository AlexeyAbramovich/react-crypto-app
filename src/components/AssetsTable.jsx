import { Table } from 'antd'
import { useCrypto } from '../hooks/useCrypto'

export const AssetsTable = () => {
  const { assets } = useCrypto()
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Price $',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Profit $',
      dataIndex: 'total-profit',
      defaultSortOrder: 'descend',
      sorter: (a, b) => +a['total-profit'] - +b['total-profit'],
    },
  ]

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={assets.map((asset) => ({
        key: asset.id,
        name: asset.name,
        price: asset.totalAmount.toFixed(2),
        'total-profit': +asset.totalProfit.replace('$', ''),
      }))}
      showSorterTooltip={{
        target: 'sorter-icon',
      }}
    />
  )
}
