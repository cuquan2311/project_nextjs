import { Book } from '@mui/icons-material'
import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'

export default function SidebarSection({ open }: { open: boolean }) {
  return (
    <Box
      sx={{
        p: 2,
        mt: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}
    >
      {open && (
        <Paper
          sx={{
            p: 2,
            textAlign: "center",
            borderRadius: 3,
          }}
          elevation={0}
        >
          <Book color='primary' sx={{ fontSize: 30, mb: 1 }} />
          <Typography variant='body2'>
            Bạn đang phân vân khó hiểu?
            <br />
            Hãy tới Docs ngay
          </Typography>
          <Button
            size='small'
            variant='contained'
            sx={{ mt: 1, borderRadius: 2 }}
            href='/features'
            fullWidth
          >
            Go Docs
          </Button>
        </Paper>
      )}
    </Box>
  )
}
