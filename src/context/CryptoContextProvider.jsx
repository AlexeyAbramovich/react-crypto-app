import { createContext, useEffect, useState } from 'react'
import { fetchCryptoAssets, fetchCryptoData } from '../api'
import { percentDifference, totalProfit } from '../utils'

const CryptoContext = createContext({
  assets: [],
  cryptoData: [],
  loading: false,
})

export const CryptoContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [assets, setAssets] = useState([])

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((coin) => coin.id === asset.id)
      return {
        grow: asset.price < coin.price,
        growPersent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: totalProfit(asset, coin),
        name: coin.name,
        ...asset,
      }
    })
  }

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const { result } = await fetchCryptoData()
      const cryptoAssets = await fetchCryptoAssets()

      setAssets(mapAssets(cryptoAssets, result))
      setData(result)

      setLoading(false)
    }
    preload()
  }, [])

  function addAsset(newAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], data))
  }

  return (
    <CryptoContext.Provider value={{ assets, data, loading, addAsset }}>
      {children}
    </CryptoContext.Provider>
  )
}

export default CryptoContext
