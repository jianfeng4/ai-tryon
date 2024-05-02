import cls from "classnames"
import React, { useState } from "react"
import Dropzone from "react-dropzone"

import { useStorage } from "@plasmohq/storage/hook"

import { useTabStore } from "~store"
import { TAB } from "~type"

import style from "./style.module.less"

const ImgLoader = () => {
  const tabStore = useTabStore()
  const { activeTab, setActiveTab } = tabStore
  const [uploadedFile, setUploadedFile] = useState(null)
  const [base64Result, setBase64Result] = useState(null)
  const [hailingFrequency] = useStorage("key")
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]

    // 读取文件内容并转换为Base64编码
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result
      // 更新已上传文件和Base64结果状态
      setUploadedFile(file)
      console.log(base64)
      setBase64Result(base64)
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
            <div>{hailingFrequency}</div>
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
          {uploadedFile && (
            <aside>
              <h4>Uploaded file:</h4>
              <div>
                <p>
                  {uploadedFile.name} - {uploadedFile.size} bytes
                </p>
                <img
                  src={URL.createObjectURL(uploadedFile)}
                  alt={uploadedFile.name}
                />
              </div>
            </aside>
          )}
          {/* 显示Base64编码结果 */}
          {base64Result && (
            <aside>
              <h4>Base64 result:</h4>
              <div>{base64Result}</div>
            </aside>
          )}
        </section>
      )}
    </Dropzone>
  )
}
export default ImgLoader
