import React, { useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
} from '@mui/material'
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts'

const generateChartData = () => {
  const hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00']
  return hours.map((time, i) => ({
    time,
    tag1: Math.random() * 80 + 10,
    tag2: 50 + Math.random() * 20,
  }))
}

const DashboardsView = () => {
  const [pageTab, setPageTab] = useState(0)
  const [tag1Value, setTag1Value] = useState(93)
  const [tag2Value, setTag2Value] = useState(51)
  const [chartData, setChartData] = useState(generateChartData())

  useEffect(() => {
    const interval = setInterval(() => {
      setTag1Value((prev) => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 10)))
      setTag2Value((prev) => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 5)))
      setChartData(generateChartData())
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box sx={{ p: 2, height: '100%' }}>
      <Tabs value={pageTab} onChange={(_, v) => setPageTab(v)} sx={{ mb: 2 }}>
        <Tab label="Page-3" />
        <Tab label="Page-2" />
        <Tab label="Page-1" />
      </Tabs>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '200px 1fr' },
          gap: 2,
          height: 'calc(100% - 60px)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 80,
              fontSize: '1.5rem',
              fontWeight: 700,
            }}
          >
            {tag1Value.toFixed(1)}
          </Paper>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 80,
              fontSize: '1.5rem',
              fontWeight: 700,
            }}
          >
            {tag2Value.toFixed(1)}
          </Paper>
        </Box>

        <Paper sx={{ p: 2, minHeight: 350 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6">Mixed Chart</Typography>
            <Typography variant="caption" color="text.secondary">
              DATETIME
            </Typography>
          </Box>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis
                yAxisId="left"
                domain={[0, 100]}
                label={{ value: 'Left title', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="tag2"
                fill="#82ca9d"
                stroke="#82ca9d"
                name="tag2"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="tag1"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                name="tag1"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
  )
}

export default DashboardsView
