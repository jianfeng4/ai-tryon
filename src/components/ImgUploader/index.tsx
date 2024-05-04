import cls from "classnames"
import React, { useEffect, useState } from "react"
import Dropzone from "react-dropzone"

import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"

import { useTabStore } from "~store"
import { TAB } from "~type"
import { getFromLocalStorage, setToLocalStorage } from "~utils/save"

import style from "./style.module.less"

const ImgLoader = () => {
  const tabStore = useTabStore()
  const { activeTab, setActiveTab } = tabStore
  const [uploadedFile, setUploadedFile] = useState(null)
  const [base64Result, setBase64Result] = useState(null)
  const [sence, setSence] = useStorage({
    key: "sence",
    instance: new Storage({
      area: "local"
    })
  })
  const [face, setFace, { setRenderValue, setStoreValue, remove }] = useStorage(
    {
      key: "face",
      instance: new Storage({
        area: "local"
      })
    }
  )
  useEffect(() => {}, [])
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]

    // 读取文件内容并转换为Base64编码
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result.toString().split(",")[1] // 去掉前缀部分
      // 更新已上传文件和Base64结果状态
      setUploadedFile(file)
      console.log(base64, 1111)
      setToLocalStorage("face", base64)
      setBase64Result(base64)
      setFace(base64)
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
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "336px",
                  height: "212px",
                  border: "1px solid black",
                  backgroundColor: "red",
                  marginTop: "16px"
                }}>
                {face ? (
                  <div className={cls(style.face)}>
                    <img src={`data:image/jpg;base64,${face}`} alt={"111"} />
                  </div>
                ) : null}
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
