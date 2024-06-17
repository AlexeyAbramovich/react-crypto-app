import { cryptoAssets } from './data'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'YOIBjEXV8I6UvTH6An8uJq/F0nFZuo/3slUPyRsmuCQ=',
  },
}

export async function fetchCryptoData() {
  return fetch('https://openapiv1.coinstats.app/coins?limit=200', options).then(
    (response) => response.json()
  )
}

export function fetchCryptoAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 100)
  })
}
