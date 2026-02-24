import React from 'react'
import Page from '../../containers/Page/Page'
import { useIntl } from 'react-intl'
import { Box, Typography, Paper } from '@mui/material'

const LogPage = () => {
  const intl = useIntl()
  return (
    <Page title={intl.formatMessage({ id: 'log', defaultMessage: 'Log' })}>
      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Log - Activity log
          </Typography>
        </Paper>
      </Box>
    </Page>
  )
}

export default LogPage
