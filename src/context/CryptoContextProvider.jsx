import { createContext, useEffect, useState } from 'react'
import { fakeFetchCryptoAssets, fakeFetchCryptoData } from '../api'
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

  return (
    <CryptoContext.Provider value={{ assets, data, loading }}>
      {children}
    </CryptoContext.Provider>
  )
}

export default CryptoContext
