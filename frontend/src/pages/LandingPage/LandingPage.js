import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'

const LandingPage = () => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h2" color="primary" gutterBottom>
        Logicgard Web Landing Kit
      </Typography>

      <Typography variant="h5" sx={{ color: '#DC143C' }} gutterBottom>
        ชุดการเรียนรู้การทำงานของ logic gard
      </Typography>

      <Button
        size="large"
        sx={{
          mt: 4,
          borderRadius: '40px',
          fontWeight: 'bold',
          px: 4,
        }}
        variant="contained"
        color="inherit"
        component={Link}
        to="/home"
      >
        Get Started
      </Button>
    </div>
  )
}

export default LandingPage