import Fade from "@mui/material/Fade"
import Tooltip from "@mui/material/Tooltip"
import cls from "classnames"
import React, { useEffect, useState } from "react"
import Dropzone from "react-dropzone"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import UploadIcon from "~assets/upload.svg"
import { useTabStore, useTryOnStore } from "~store"
import { TAB } from "~type"
import { getFromLocalStorage, setToLocalStorage } from "~utils/save"

import style from "./style.module.less"

const ImgLoader = () => {
  const tabStore = useTabStore()
  const { base64Result, setBase64Result } = useTryOnStore()
  useEffect(() => {
    async function getInitialFace() {
      const face = await getFromLocalStorage("face")
      if (face) {
        setBase64Result(face)
      }
    }
    getInitialFace()
  }, [])
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]

    // 读取文件内容并转换为Base64编码
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result.toString().split(",")[1] // 去掉前缀部分
      // 更新已上传文件和Base64结果状态
      setBase64Result(base64) //base64不保留前缀,for server
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
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
                {base64Result ? (
                  <Tooltip
                    title="Click here to change your profile image"
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    followCursor>
                    <div className={cls(style.face)}>
                      <img src={`data:image/jpg;base64,${base64Result}`} />
                    </div>
                  </Tooltip>
                ) : (
                  <div className={style.empty}>
                    <div>
                      <img src={UploadIcon} alt={"upload"} />
                    </div>
                    <p>
                      Upload your profile image here or you can choose the
                      sample picture
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </Dropzone>

      {/* <button onClick={() => setStoreValue()}>Save</button> */}
    </div>
  )
}
export default ImgLoader
