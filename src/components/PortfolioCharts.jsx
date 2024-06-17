import React from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useCrypto } from '../hooks/useCrypto'

ChartJS.register(ArcElement, Tooltip, Legend)

export const PortfolioCharts = () => {
  const { assets } = useCrypto()

  const data = {
    labels: assets.map((asset) => asset.name),
    datasets: [
      {
        label: '$',
        data: assets.map((asset) => asset.totalAmount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          '#C93C20',
          '#00BB2D',
        ],
      },
    ],
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1rem',
        height: 500,
      }}
    >
      <Pie data={data} />
    </div>
  )
}
