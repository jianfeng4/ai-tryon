import React from "react"
import { Route, Routes } from "react-router-dom"

import Login from "~views/login"

export const Routing = () => (
  <Routes>
    <Route path="/" element={<Login />} />
  </Routes>
)
