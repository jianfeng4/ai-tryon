import React from "react"

const SizeChartTable = ({ sizeData }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Size</th>
          <th>Bust</th>
          <th>Waist</th>
          <th>Hips</th>
        </tr>
      </thead>
      <tbody>
        {sizeData.map((item, index) => (
          <tr key={index}>
            <td>{item.Size}</td>
            <td>{item.Bust}</td>
            <td>{item.Waist}</td>
            <td>{item.Hips}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SizeChartTable
