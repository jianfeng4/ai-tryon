import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputAdornment from "@mui/material/InputAdornment"
import OutlinedInput from "@mui/material/OutlinedInput"

const Input = ({
  type,
  showHelpText,
  shwoEndAdornment,
  palceholder,
  style
}) => {
  return (
    <FormControl
      variant="outlined"
      style={{
        width: "100%"
      }}>
      <OutlinedInput
        fullWidth={true}
        placeholder={palceholder}
        id="outlined-adornment-weight"
        endAdornment={
          shwoEndAdornment ? (
            <InputAdornment position="end">in</InputAdornment>
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
