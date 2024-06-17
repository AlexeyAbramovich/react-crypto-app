import { useContext } from 'react'
import CryptoContext from '../context/CryptoContextProvider'

export function useCrypto() {
  return useContext(CryptoContext)
}
