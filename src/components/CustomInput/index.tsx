import { ConfigProvider, Input } from "antd" // 请替换为你的组件库路径
import React from "react"

const CustomInput = ({ value, onChange, themeToken = {}, ...otherProps }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000000",
          borderRadius: 20,
          ...themeToken
        }
      }}>
      <Input
        value={value}
        onChange={onChange}
        {...otherProps} // 将其他 props 传递给 Input 组件
      />
    </ConfigProvider>
  )
}

export default CustomInput
