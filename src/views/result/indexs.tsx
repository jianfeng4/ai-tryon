import React, { useState } from "react"
import useInfiniteScroll, {
  type ScrollDirectionBooleanState
} from "react-easy-infinite-scroll-hook"

import ExampleCard from "./components/ExampleCard"
import Item from "./Item"
import { createItems, createNext } from "./utils"

const ReversedVerticalList = () => {
  const [data, setData] = useState(createItems())
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState<ScrollDirectionBooleanState>({
    up: true,
    down: false
  })

  const ref = useInfiniteScroll<HTMLDivElement>({
    next: createNext({ setData, setLoading, offset: 50, reverse: true }),
    rowCount: data.length,
    hasMore,
    reverse: { column: true }
  })

  return (
    <ExampleCard loading={loading}>
      <div
        ref={ref}
        style={{
          height: "100vh",
          width: "100vw",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column-reverse"
        }}>
        {data.map((item, index) => (
          <Item key={item} index={index} content={item} />
        ))}
      </div>
    </ExampleCard>
  )
}

export default ReversedVerticalList
