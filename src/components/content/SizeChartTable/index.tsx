import React from "react"

const SizeTable = ({ sizeData }) => {
  const getHighlightClass = (size, property) => {
    return size[property]?.highlight
      ? "highlight"
      : size[property.toLowerCase()]?.highlight
        ? "highlight"
        : ""
  }

  const getValue = (size, property) => {
    return size[property]?.value || size[property.toLowerCase()]?.value || ""
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Size</th>
          <th>Bust</th>
          <th>Waist</th>
          <th>Hip</th>
        </tr>
      </thead>
      <tbody>
        {sizeData.map((size, index) => (
          <tr key={index}>
            <td className={getHighlightClass(size, "Size")}>
              {getValue(size, "Size")}
            </td>
            <td className={getHighlightClass(size, "Bust")}>
              {getValue(size, "Bust")}
            </td>
            <td className={getHighlightClass(size, "Waist")}>
              {getValue(size, "Waist")}
            </td>
            <td className={getHighlightClass(size, "Hips")}>
              {getValue(size, "Hips")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SizeTable
