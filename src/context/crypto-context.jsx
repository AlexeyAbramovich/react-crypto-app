import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'
import { fakeFetchCrypto, fakeFetchAssets } from '../api'
import { persentDifference } from '../utils'

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
})

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [crypto, setCrypto] = useState([])
  const [assets, setAssests] = useState([])

  
  function mapAsset(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id)
      return {
        grow: asset.price < coin.price,
        growPercent: persentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        ...asset,
      }
    })
  }
  
  useEffect(() => {
    async function preload() {
      setLoading(true)
      const { result } = await fakeFetchCrypto()
      const assets = await fakeFetchAssets()
      setAssests(mapAsset(assets, result))
      setCrypto(result)
      setLoading(false)
    }
    preload()
  }, [])

  function addAsset(newAsset) {
    setAssests((prev) => mapAsset([...prev, newAsset], crypto))
  }

  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  )
}

export default CryptoContext

export function useCrypto() {
  return useContext(CryptoContext)
}
