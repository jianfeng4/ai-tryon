import React from "react"

const SuccessIcon = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "19px",
        height: "19px",
        borderRadius: "50%",
        backgroundColor: "#fff"
      }}>
      <svg
        width="10"
        height="8"
        viewBox="0 0 10 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.69059 7.63514C3.49451 7.83539 3.17216 7.83539 2.97608 7.63514L0.342524 4.94556C0.152198 4.75118 0.152198 4.44031 0.342525 4.24593L0.809411 3.76911C1.00549 3.56886 1.32784 3.56886 1.52392 3.76911L2.97608 5.25217C3.17216 5.45242 3.49451 5.45241 3.69059 5.25216L8.47608 0.364856C8.67216 0.164606 8.99451 0.164606 9.19059 0.364856L9.65748 0.841677C9.8478 1.03605 9.8478 1.34693 9.65748 1.5413L3.69059 7.63514Z"
          fill="#4D4DDE"
        />
      </svg>
    </div>
  )
}

export default SuccessIcon
