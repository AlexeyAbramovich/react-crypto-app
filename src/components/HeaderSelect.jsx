import { Select } from 'antd'
import { useCrypto } from '../hooks/useCrypto'
import { SelectItem } from './SelectItem'
import { useEffect, useState } from 'react'

export const HeaderSelect = ({ setModal, setCoin }) => {
  const { data } = useCrypto()
  const [select, setSelect] = useState(false)

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypress)
    return () => {
      document.removeEventListener('keypress', keypress)
    }
  }, [])

  const handleSelect = (value) => {
    setCoin(data.find((coin) => coin.id === value))
    setModal(true)
  }
  return (
    <Select
      style={{
        width: 250,
      }}
      value="press / to open"
      open={select}
      onSelect={handleSelect}
      onClick={() => setSelect((prev) => !prev)}
      options={data.map((coin) => ({
        label: coin.symbol,
        value: coin.id,
        icon: coin.icon,
        name: coin.name,
      }))}
      optionRender={(option) => <SelectItem option={option} />}
    />
  )
}
