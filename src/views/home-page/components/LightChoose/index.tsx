import BedtimeIcon from "assets/BedtimeIcon"
import LightIcon from "assets/LightIcon"
import NormalLightIcon from "assets/NormalLightIcon"
import React, { useState } from "react"

import style from "./style.module.less"

const lightList = [
  {
    name: "light",
    icon: <LightIcon />,
    activeColor: "#4D4DDE"
  },
  {
    name: "normal",
    icon: <NormalLightIcon />,
    activeColor: "#4D4DDE"
  },
  {
    name: "dark",
    icon: <BedtimeIcon />,
    activeColor: "#4D4DDE"
  }
]

const LightSwitch = () => {
  const [activeIndex, setActiveIndex] = useState(1)

  return (
    <div className={style["light-container"]}>
      {lightList.map((item, index) => {
        return (
          <div
            className={`${style["light-item"]} ${index === activeIndex ? style.active : ""}`}
            onClick={() => setActiveIndex(index)}
            key={index} // 添加 key 属性
          >
            {React.cloneElement(item.icon, {
              color: index === activeIndex ? item.activeColor : "#898989"
            })}
          </div>
        )
      })}
    </div>
  )
}

export default LightSwitch
