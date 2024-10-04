import Fade from "@mui/material/Fade"
import Tooltip from "@mui/material/Tooltip"
import cls from "classnames"
import React, { useCallback, useEffect, useState } from "react"
import Dropzone from "react-dropzone"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import UploadIcon from "~assets/upload.png"
import { useDropImgSrcStore, useTabStore, useTryOnStore } from "~store"
import { TAB } from "~type"
import { getFromLocalStorage, setToLocalStorage } from "~utils/save"

import style from "./style.module.less"

const ImgLoader = () => {
  const { base64Result, setBase64Result } = useTryOnStore()
  const { imgSrc, setImgSrc } = useDropImgSrcStore()
  useEffect(() => {
    async function getInitialFace() {
      const face = await getFromLocalStorage("face")
      if (face) {
        setBase64Result(face)
      }
    }
    getInitialFace()
  }, [])
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = () => {
      setImgSrc(reader.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleWebImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const dataTransfer = event.dataTransfer

    if (dataTransfer.items) {
      for (let i = 0; i < dataTransfer.items.length; i++) {
        const item = dataTransfer.items[i]
        if (item.kind === "string" && item.type === "text/uri-list") {
          item.getAsString((url) => {
            console.log("🚀 ~ item.getAsString ~ url:", url)
            setImgSrc(url)
          })
          return
        }
      }
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div
      className={style["container"]}
      onDragOver={handleDragOver}
      onDrop={handleWebImageDrop}>
      <Dropzone
        onDrop={handleDrop}
        accept={{
          "image/jpg": [".jpg"],
          "image/png": [".png"],
          "image/jpeg": [".jpeg"],
          "image/bmp": [".bmp"]
        }}
        multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} className={style.dropzone}>
              <input {...getInputProps()} />
              <div
                className={style.loader}
                style={{
                  width: "100%"
                }}>
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt="Dropped Image"
                    className={style["image"]}
                  />
                ) : (
                  <div className={style.empty}>
                    <div>
                      <img src={UploadIcon} alt={"upload"} />
                    </div>
                    <p>Drag Image Here</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  )
}
export default ImgLoader
