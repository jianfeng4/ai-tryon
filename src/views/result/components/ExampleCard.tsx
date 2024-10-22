import { LinearProgress, Link, Switch } from "@mui/material"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import Typography from "@mui/material/Typography"
import React from "react"
import {
  ScrollDirection,
  type ScrollDirectionBooleanState
} from "react-easy-infinite-scroll-hook"

interface ExampleCardProps {
  hasMore?: ScrollDirectionBooleanState
  onChangeHasMore?: (state: ScrollDirectionBooleanState) => void
  children: React.ReactNode
  title?: string
  description?: string
  loading?: boolean
  source?: string
}

const ExampleCard = ({
  onChangeHasMore,
  hasMore = {},
  children,
  title,
  description,
  loading,
  source
}: ExampleCardProps) => {
  const handleChangeHasMore = ({
    target: { name, checked }
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeHasMore && hasMore)
      onChangeHasMore({ ...hasMore, [name]: checked })
  }

  return (
    <>
      <div className="LinearProgress-container">
        {loading && <LinearProgress />}
      </div>
      {children}
    </>
  )
}

export default ExampleCard
