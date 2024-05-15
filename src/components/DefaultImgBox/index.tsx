import React, { useEffect, useState } from "react"
import cls from 'classnames'
import style from "./style.module.less"
import { defaultIamgeList } from "~config"
import { useTryOnStore } from "~store"

const DefaultImgBox = () => {
  const tryOnStore = useTryOnStore()
  const { base64Result, setBase64Result } = tryOnStore
  const [selectIndex, setSelectIndex] = useState<number>(-1)
const handleClick = (src:string,index:number) => {
    setBase64Result(src.split(",")[1])
    setSelectIndex(index)
}
    return (
        <div className={style["default_img_container"]}>
          {
            defaultIamgeList.map((item,index)=>{
              return (
                <div className={cls(style["default_img_box"],
                  {[style['selected']]:selectIndex===index}
                )} key={index} onClick={()=>{handleClick(item,index)}}>
                  <img src={item} alt=""/>
                </div>
              )
            })
          }
        </div>
    )
}

export default DefaultImgBox;