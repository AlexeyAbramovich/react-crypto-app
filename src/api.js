import { cryptoAssets, cryptoData } from './data'

export function fakeFetchCryptoData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData)
    }, 100)
  })
}

export function fakeFetchCryptoAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 100)
  })
}