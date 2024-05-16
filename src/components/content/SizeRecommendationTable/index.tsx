import React from "react"

import SizeTable from "../SizeChartTable"

const App = ({ sizeRecommendationData, close }) => (
  <div className="size-recommendation-container">
    <div className="size-recommendation-title">Size Recommendation</div>
    <div>
      <SizeTable sizeData={sizeRecommendationData} />
    </div>
    <button onClick={close} className="close-button">
      ×
    </button>
  </div>
)

export default App
