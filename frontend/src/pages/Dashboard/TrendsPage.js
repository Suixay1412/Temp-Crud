import React from 'react'
import Page from '../../containers/Page/Page'
import { useIntl } from 'react-intl'
import { Box } from '@mui/material'
import DashboardsView from './DashboardsView'

const TrendsPage = () => {
  const intl = useIntl()
  return (
    <Page title={intl.formatMessage({ id: 'trends', defaultMessage: 'Trends' })}>
      <Box sx={{ p: 2 }}>
        <DashboardsView />
      </Box>
    </Page>
  )
}

export default TrendsPage
