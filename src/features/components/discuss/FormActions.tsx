import { Icon } from '@iconify/react'
import { Box, IconButton } from '@mui/material'
import React from 'react'

export default function FormActions() {
  return (
    <Box sx={{ display: "flex", alignItems: "center",  border: "1px solid #dadadaee" , paddingLeft : "15px"}}>
      <IconButton size="small" >
        <Icon icon="ion:link-sharp" />
      </IconButton>
      <IconButton size="small" >
        <Icon icon="ic:round-image" />
      </IconButton>
      <IconButton size="small">
        <Icon icon="majesticons:code-line" />
      </IconButton>
    </Box>
  )
}
