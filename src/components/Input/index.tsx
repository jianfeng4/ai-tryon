import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputAdornment from "@mui/material/InputAdornment"
import OutlinedInput from "@mui/material/OutlinedInput"
import React from "react"

import { useUnitStore } from "~store"

const Input = ({
  value,
  type,
  onChange,
  showHelpText,
  showEndAdornment,
  placeholder,
  style
}) => {
  const { unit } = useUnitStore()
  const isInch = unit === "in"
  return (
    <FormControl
      variant="outlined"
      style={{
        width: "100%"
      }}>
      <OutlinedInput
        value={value}
        fullWidth={true}
        onChange={onChange}
        placeholder={placeholder}
        id="outlined-adornment-weight"
        endAdornment={
          showEndAdornment ? (
            <InputAdornment position="end">
              {isInch ? "in" : "cm"}
            </InputAdornment>
          ) : null
        }
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          "aria-label": type
        }}
        style={{
          borderRadius: "8px",
          background: "rgba(255, 255, 255, 0.25)",
          boxShadow: "0px 4px 50px 0px rgba(0, 0, 0, 0.10)",
          height: "43px",
          width: "100%",
          ...style
        }}
      />
      {!!showHelpText && (
        <FormHelperText id="outlined-weight-helper-text">{type}</FormHelperText>
      )}
    </FormControl>
  )
}
export default Input
