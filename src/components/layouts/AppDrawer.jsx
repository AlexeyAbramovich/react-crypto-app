import { Drawer } from 'antd'
import { AddAssetFrom } from '../AddAssetFrom'

export const AppDrawer = ({ isDrawerOpen, setDrawer }) => {
  return (
    <Drawer
      width={600}
      title="Add Asset"
      onClose={() => setDrawer(false)}
      open={isDrawerOpen}
      destroyOnClose
    >
      <AddAssetFrom />
    </Drawer>
  )
}
