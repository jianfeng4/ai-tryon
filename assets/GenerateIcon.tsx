import React from "react"

const GenerateIcon = ({ color = "red" }) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        // fill={color}
        d="M19 9.5C19 4.256 14.744 0 9.5 0C4.256 0 0 4.256 0 9.5C0 14.744 4.256 19 9.5 19C14.744 19 19 14.744 19 9.5ZM9.5 10.45H5.7V8.55H9.5V5.7L13.3 9.5L9.5 13.3V10.45Z"
        fill="white"
      />
    </svg>
  )
}

export default GenerateIcon
