import { SearchOutlined } from "@ant-design/icons"
import { Button, ConfigProvider } from "antd" // 请替换为你的组件库路径
import React from "react"

const CustomButton = ({
  onClick,
  disabled = false,
  buttonText,
  themeToken = {},
  myStyle = {},
  ...otherProps
}) => {
  console.log("🚀 ~ myStyle:", myStyle)
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000000",
          borderRadius: 20,
          ...themeToken
        }
      }}>
      <Button
        disabled={disabled}
        type="primary"
        block
        onClick={onClick}
        style={{
          paddingRight: 5,
          ...myStyle
        }}
        {...otherProps} // 将其他 props 传递给 Button 组件
      >
        {buttonText}
      </Button>
    </ConfigProvider>
  )
}

export default CustomButton
