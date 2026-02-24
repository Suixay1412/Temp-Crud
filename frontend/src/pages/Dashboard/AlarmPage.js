import React from 'react'
import Page from '../../containers/Page/Page'
import { useIntl } from 'react-intl'
import { Box, Typography, Paper } from '@mui/material'

const AlarmPage = () => {
  const intl = useIntl()
  return (
    <Page title={intl.formatMessage({ id: 'alarm', defaultMessage: 'Alarm' })}>
      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Alarm - No active alarms
          </Typography>
        </Paper>
      </Box>
    </Page>
  )
}

export default AlarmPage

// This file is part of the 2FAS iOS app