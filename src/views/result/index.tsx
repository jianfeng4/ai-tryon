import React, { useState } from "react"
import useInfiniteScroll, {
  type ScrollDirectionBooleanState
} from "react-easy-infinite-scroll-hook"

import BottomInfo from "./components/BottomInfo"
import ExampleCard from "./components/ExampleCard"
import Item from "./components/Item"
import Right from "./components/Right"
import style from "./style.module.less"
import { createItems, createNext, getSourceUrl } from "./utils"

const ReversedVerticalList = () => {
  const [data, setData] = useState(createItems())
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState<ScrollDirectionBooleanState>({
    up: true,
    down: false
  })

  const ref = useInfiniteScroll<HTMLDivElement>({
    next: createNext({ setData, setLoading, offset: 10, reverse: true }),
    rowCount: data.length,
    hasMore,
    reverse: { column: true }
  })

  return (
    <div className={style["container"]}>
      <div className={style["left"]}>
        <ExampleCard
          title="Reversed Vertical List"
          hasMore={hasMore}
          onChangeHasMore={setHasMore}
          loading={loading}
          source={getSourceUrl("ReversedVerticalList")}>
          <div
            ref={ref}
            className="List"
            style={{
              height: "100%",
              width: "100%",
              overflowX: "hidden",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column-reverse",
              gap: "15px"
            }}>
            <div>
              <BottomInfo />
            </div>

            {data.map((item, index) => (
              <Item
                key={item}
                index={index}
                className="Row-reverse"
                content={item}
              />
            ))}
          </div>
        </ExampleCard>
      </div>
      <Right />
    </div>
  )
}

export default ReversedVerticalList
