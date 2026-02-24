import React, { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Chip,
} from '@mui/material'
import { Check as CheckIcon } from '@mui/icons-material'

const UPDATE_OPTIONS = [
  '1min',
  '15min',
  'daily',
  'weekly',
  'monthly',
  'quarterly',
  'yearly',
  'century',
  'one-per-day',
  'one-per-month',
  'one-per-year',
]

const defaultTagScript = `(async () => {
  let tag1 = Math.floor(Math.random() * 100);
})();`

const DevicesView = ({ selectedDevice, devices, setDevices }) => {
  const [emailFrom, setEmailFrom] = useState('')
  const [emailPwd, setEmailPwd] = useState('')
  const [emailTo, setEmailTo] = useState('')
  const [tagScript, setTagScript] = useState(defaultTagScript)
  const [consoleOn, setConsoleOn] = useState(false)
  const [consoleLow, setConsoleLow] = useState(25)
  const [consoleHigh, setConsoleHigh] = useState(35)
  const [alertDesc, setAlertDesc] = useState('')
  const [recordEnabled, setRecordEnabled] = useState(true)
  const [syncEnabled, setSyncEnabled] = useState(false)
  const [apiEnabled, setApiEnabled] = useState(false)
  const [lineEnabled, setLineEnabled] = useState(false)
  const [emailEnabled, setEmailEnabled] = useState(false)
  const [updateInterval, setUpdateInterval] = useState('1min')
  const [tagValue] = useState(() => Math.floor(Math.random() * 100))

  useEffect(() => {
    if (selectedDevice?.tags?.[0]) {
      const tag = selectedDevice.tags[0]
      setTagScript(tag.script || defaultTagScript)
      setConsoleLow(tag.consoleLow ?? 25)
      setConsoleHigh(tag.consoleHigh ?? 35)
      setUpdateInterval(tag.update || '1min')
      setRecordEnabled(tag.record ?? true)
      setSyncEnabled(tag.sync ?? false)
      setApiEnabled(tag.api ?? false)
      setLineEnabled(tag.line ?? false)
      setEmailEnabled(tag.email ?? false)
    }
  }, [selectedDevice])

  const handleSaveTag = () => {
    if (!selectedDevice) return
    const tagData = {
      label: 'tag1',
      script: tagScript,
      consoleOn,
      consoleLow,
      consoleHigh,
      alertDesc,
      record: recordEnabled,
      sync: syncEnabled,
      api: apiEnabled,
      line: lineEnabled,
      email: emailEnabled,
      update: updateInterval,
    }
    const updated = devices.map((d) =>
      d.id === selectedDevice.id
        ? {
            ...d,
            tags: d.tags?.length
              ? d.tags.map((t, i) => (i === 0 ? { ...t, ...tagData } : t))
              : [tagData],
          }
        : d
    )
    setDevices(updated)
  }

  if (!selectedDevice) return null

  return (
    <Paper sx={{ p: 2, minWidth: 360, maxWidth: 480 }}>
      <Typography variant="h6" gutterBottom>
        Configuration
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <TextField
          label="emailFrom"
          size="small"
          value={emailFrom}
          onChange={(e) => setEmailFrom(e.target.value)}
          sx={{ minWidth: 140 }}
        />
        <TextField
          label="emailPwd"
          type="password"
          size="small"
          value={emailPwd}
          onChange={(e) => setEmailPwd(e.target.value)}
          sx={{ minWidth: 140 }}
        />
        <TextField
          label="emailTo"
          size="small"
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
          sx={{ minWidth: 140 }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Chip label="tag1" color="success" size="small" icon={<CheckIcon />} />
          <Typography variant="subtitle2">tag1</Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          Script
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          value={tagScript}
          onChange={(e) => setTagScript(e.target.value)}
          variant="outlined"
          size="small"
          sx={{
            fontFamily: 'monospace',
            '& .MuiInputBase-input': { fontSize: '0.875rem' },
          }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Console
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant={!consoleOn ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setConsoleOn(false)}
          >
            Off
          </Button>
          <Button
            variant={consoleOn ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setConsoleOn(true)}
          >
            On
          </Button>
          <TextField
            label="low"
            type="number"
            size="small"
            value={consoleLow}
            onChange={(e) => setConsoleLow(Number(e.target.value))}
            sx={{ width: 80 }}
          />
          <TextField
            label="high"
            type="number"
            size="small"
            value={consoleHigh}
            onChange={(e) => setConsoleHigh(Number(e.target.value))}
            sx={{ width: 80 }}
          />
        </Box>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Alert
        </Typography>
        <TextField
          fullWidth
          label="Description"
          size="small"
          value={alertDesc}
          onChange={(e) => setAlertDesc(e.target.value)}
        />
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', mb: 2 }}>
        <FormControlLabel
          control={<Checkbox checked={recordEnabled} onChange={(e) => setRecordEnabled(e.target.checked)} />}
          label="Record"
        />
        <FormControlLabel
          control={<Checkbox checked={syncEnabled} onChange={(e) => setSyncEnabled(e.target.checked)} />}
          label="Sync"
        />
        <FormControlLabel
          control={<Checkbox checked={apiEnabled} onChange={(e) => setApiEnabled(e.target.checked)} />}
          label="API"
        />
        <FormControlLabel
          control={<Checkbox checked={lineEnabled} onChange={(e) => setLineEnabled(e.target.checked)} />}
          label="LINE"
        />
        <FormControlLabel
          control={<Checkbox checked={emailEnabled} onChange={(e) => setEmailEnabled(e.target.checked)} />}
          label="EMAIL"
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="body2" color="text.secondary">
          {tagValue}
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Update</InputLabel>
          <Select value={updateInterval} label="Update" onChange={(e) => setUpdateInterval(e.target.value)}>
            {UPDATE_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" size="small" onClick={handleSaveTag}>
          Save Tag
        </Button>
      </Box>
    </Paper>
  )
}

export default DevicesView
