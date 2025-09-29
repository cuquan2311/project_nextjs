import { Typography } from '@mui/material'
import React from 'react'

export default function Logo() {
  return (
    <Typography
      className='header__logo'
      variant='h6'
      sx={{ fontWeight: "bold" }}
    >
      User <span className='header__logo-accent'>Manager</span>
    </Typography>
  )
}
