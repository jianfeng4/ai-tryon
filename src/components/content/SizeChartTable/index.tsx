import React from "react"

const SizeTable = ({ sizeData }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Bust</th>
          <th>Hips</th>
          <th>Size</th>
          <th>Waist</th>
        </tr>
      </thead>
      <tbody>
        {sizeData.map((size, index) => (
          <tr key={index} style={{height: '73.2px'}}>
            <td className={size.Bust.highlight ? "highlight" : ""}>
              {size.Bust.value}
            </td>
            <td className={size.Hips.highlight ? "highlight" : ""}>
              {size.Hips.value}
            </td>
            <td className={size.Size.highlight ? "highlight" : ""}>
              {size.Size.value}
            </td>
            <td className={size.Waist.highlight ? "highlight" : ""}>
              {size.Waist.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SizeTable
