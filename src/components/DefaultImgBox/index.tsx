import React, { useEffect, useState } from "react"
import cls from 'classnames'
import style from "./style.module.less"
import { defaultImageList } from "~config/config"
import { useTryOnStore } from "~store"
import { setToLocalStorage } from "~utils/save"
const DefaultImgBox = () => {
  const tryOnStore = useTryOnStore()
  const { base64Result, setBase64Result } = tryOnStore
  const [selectIndex, setSelectIndex] = useState<number>(-1)
const handleClick = (src:string,index:number) => {
    setBase64Result(src.split(",")[1])
    setToLocalStorage('face',src.split(",")[1])
    setSelectIndex(index)
}
    return (
        <div className={style["default_img_container"]}>
          {
            defaultImageList.map((item,index)=>{
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