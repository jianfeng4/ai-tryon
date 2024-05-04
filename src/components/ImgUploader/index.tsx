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
  const [face, setFace, { setRenderValue, setStoreValue, remove }] = useStorage(
    {
      key: "face",
      instance: new Storage({
        area: "local"
      })
    }
  )
  const tabStore = useTabStore()
  const { activeTab, setActiveTab } = tabStore
  const [uploadedFile, setUploadedFile] = useState(null)
  const [base64Result, setBase64Result] = useState(null)

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
    <Dropzone
      onDrop={handleDrop}
      accept={{ "image/jpg": [".jpg"] }}
      multiple={false}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()} className={style.dropzone}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop an image here, or click to select an image</p>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid black",
                backgroundColor: "red"
              }}>
              click here to upload
            </div>
          </div>
          {/* 展示已上传文件的预览 */}
          {1 && (
            <aside>
              <h4>Uploaded file:</h4>
              <div>
                <img src={`data:image/jpg;base64,${face}`} alt={"111"} />
              </div>
            </aside>
          )}
        </section>
      )}
    </Dropzone>
  )
}
export default ImgLoader
