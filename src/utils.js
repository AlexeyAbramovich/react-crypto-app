export function percentDifference(assetPrice, coinPrice) {
  return (
    (
      100 * Math.abs((assetPrice - coinPrice) / ((assetPrice + coinPrice) / 2))
    ).toFixed(2) + '%'
  )
}

export function totalProfit(asset, coin) {
  return (
    Math.abs(asset.amount * coin.price - asset.amount * asset.price).toFixed(
      2
    ) + '$'
  )
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.substring(1)
}
