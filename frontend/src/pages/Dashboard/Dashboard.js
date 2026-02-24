import React, { useState } from 'react'
import Page from '../../containers/Page/Page'
import { useIntl } from 'react-intl'
import {
  Box,
  Tabs,
  Tab,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'

import DevicesView from './DevicesView'
import DashboardsView from './DashboardsView'

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

const DashboardPage = () => {
  const intl = useIntl()
  const [mainTab, setMainTab] = useState(0) // 0 = DEVICES, 1 = DASHBOARDS

  const [devices, setDevices] = useState([
    {
      id: 1,
      deviceName: 'Device 1',
      remark: 'Main device',
      tags: [
        {
          label: 'tag1',
          script: defaultTagScript,
          update: '1min',
          record: true,
          sync: false,
          api: false,
          line: false,
          email: false,
          consoleLow: 25,
          consoleHigh: 35,
        },
        {
          label: 'tag2',
          script: '(async () => { let tag2 = 50; })();',
          update: '1min',
          record: true,
        },
      ],
    },
    {
      id: 2,
      deviceName: 'Device 2',
      remark: 'Secondary device',
      tags: [
        {
          label: 'Temperature',
          script: 'temp_sensor_01',
          update: '15min',
          record: true,
        },
      ],
    },
  ])

  const [loading] = useState(false)
  const [openFormDialog, setOpenFormDialog] = useState(false)
  const [editingDevice, setEditingDevice] = useState(null)
  const [openTagDialog, setOpenTagDialog] = useState(false)
  const [editingTagIndex, setEditingTagIndex] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedDevice, setSelectedDevice] = useState(null)

  const [formData, setFormData] = useState({
    id: '',
    deviceName: '',
    remark: '',
    tags: [],
  })

  const [tagFormData, setTagFormData] = useState({
    label: 'tag1',
    script: defaultTagScript,
    update: '1min',
    record: true,
    sync: false,
    api: false,
    line: false,
    email: false,
    consoleOn: false,
    consoleLow: 25,
    consoleHigh: 35,
    alertDesc: '',
  })

  const handleOpenFormDialog = (device = null) => {
    if (device) {
      setEditingDevice(device)
      setFormData({ ...device })
    } else {
      setEditingDevice(null)
      setFormData({
        id: devices.length > 0 ? Math.max(...devices.map((d) => d.id)) + 1 : 1,
        deviceName: '',
        remark: '',
        tags: [],
      })
    }
    setOpenFormDialog(true)
  }

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false)
    setEditingDevice(null)
  }

  const handleOpenTagDialog = (tagIndex = null) => {
    if (tagIndex !== null && formData.tags[tagIndex]) {
      setEditingTagIndex(tagIndex)
      const tag = formData.tags[tagIndex]
      setTagFormData({
        label: tag.label || 'tag1',
        script: tag.script || defaultTagScript,
        update: tag.update || '1min',
        record: tag.record ?? true,
        sync: tag.sync ?? false,
        api: tag.api ?? false,
        line: tag.line ?? false,
        email: tag.email ?? false,
        consoleOn: tag.consoleOn ?? false,
        consoleLow: tag.consoleLow ?? 25,
        consoleHigh: tag.consoleHigh ?? 35,
        alertDesc: tag.alertDesc || '',
      })
    } else {
      setEditingTagIndex(null)
      setTagFormData({
        label: 'tag1',
        script: defaultTagScript,
        update: '1min',
        record: true,
        sync: false,
        api: false,
        line: false,
        email: false,
        consoleOn: false,
        consoleLow: 25,
        consoleHigh: 35,
        alertDesc: '',
      })
    }
    setOpenTagDialog(true)
  }

  const handleCloseTagDialog = () => {
    setOpenTagDialog(false)
    setEditingTagIndex(null)
  }

  const handleAddTag = () => {
    if (!tagFormData.label || !tagFormData.script) {
      setErrorMessage('Please fill in label and script')
      return
    }
    const updatedTags = [...formData.tags]
    if (editingTagIndex !== null) {
      updatedTags[editingTagIndex] = tagFormData
    } else {
      updatedTags.push(tagFormData)
    }
    setFormData({ ...formData, tags: updatedTags })
    setSuccessMessage(editingTagIndex !== null ? 'Tag updated' : 'Tag added')
    setTimeout(() => setSuccessMessage(''), 3000)
    handleCloseTagDialog()
  }

  const handleDeleteTag = (index) => {
    const updatedTags = formData.tags.filter((_, i) => i !== index)
    setFormData({ ...formData, tags: updatedTags })
    setSuccessMessage('Tag removed')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleSaveDevice = () => {
    if (!formData.deviceName) {
      setErrorMessage('Device name is required')
      return
    }
    if (editingDevice) {
      setDevices(devices.map((d) => (d.id === editingDevice.id ? formData : d)))
      setSuccessMessage('Device updated successfully')
    } else {
      setDevices([...devices, formData])
      setSuccessMessage('Device created successfully')
    }
    setTimeout(() => setSuccessMessage(''), 3000)
    handleCloseFormDialog()
  }

  const handleDeleteDevice = (id) => {
    setDevices(devices.filter((d) => d.id !== id))
    setSuccessMessage('Device deleted successfully')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleTagFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setTagFormData({
      ...tagFormData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  return (
    <Page title={intl.formatMessage({ id: 'dashboard', defaultMessage: 'Dashboard' })}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
          <Tabs value={mainTab} onChange={(_, v) => setMainTab(v)}>
            <Tab label="DEVICES" />
            <Tab label="DASHBOARDS" />
          </Tabs>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage('')}>
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrorMessage('')}>
              {errorMessage}
            </Alert>
          )}

          {mainTab === 0 && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Group - BG{Date.now().toString().slice(-10)}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenFormDialog()}
                >
                  Add Device
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', lg: 'row' } }}>
                <Paper sx={{ p: 2, flex: 1, minWidth: 0 }}>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: 'action.hover' }}>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Device Name</strong></TableCell>
                            <TableCell><strong>Remark</strong></TableCell>
                            <TableCell><strong>Tags</strong></TableCell>
                            <TableCell align="center"><strong>Actions</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {devices.map((device) => (
                            <TableRow
                              key={device.id}
                              sx={{
                                cursor: 'pointer',
                                bgcolor: selectedDevice?.id === device.id ? 'action.selected' : undefined,
                              }}
                              onClick={() => setSelectedDevice(device)}
                            >
                              <TableCell>{device.id}</TableCell>
                              <TableCell>{device.deviceName}</TableCell>
                              <TableCell>{device.remark}</TableCell>
                              <TableCell>
                                {device.tags?.length > 0 ? (
                                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                    {device.tags.map((t, i) => (
                                      <Chip key={i} label={t.label} size="small" color="success" />
                                    ))}
                                  </Box>
                                ) : (
                                  <em>No tags</em>
                                )}
                              </TableCell>
                              <TableCell align="center">
                                <Tooltip title="Edit">
                                  <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleOpenFormDialog(device)
                                    }}
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDeleteDevice(device.id)
                                    }}
                                  >
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Paper>

                {selectedDevice && (
                  <DevicesView
                    devices={devices}
                    setDevices={setDevices}
                    selectedDevice={selectedDevice}
                    onDeviceSelect={setSelectedDevice}
                  />
                )}
              </Box>
            </>
          )}

          {mainTab === 1 && <DashboardsView />}
        </Box>
      </Box>

      {/* Device Form Dialog */}
      <Dialog open={openFormDialog} onClose={handleCloseFormDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingDevice ? 'Edit Device' : 'Add New Device'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Device Name"
            name="deviceName"
            value={formData.deviceName}
            onChange={handleFormChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Remark"
            name="remark"
            value={formData.remark}
            onChange={handleFormChange}
            margin="normal"
            multiline
            rows={2}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Tags</Typography>
            {formData.tags.map((tag, idx) => (
              <Box
                key={idx}
                sx={{
                  p: 1,
                  mb: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span><strong>{tag.label}</strong> | {tag.update}</span>
                <Box>
                  <IconButton size="small" onClick={() => handleOpenTagDialog(idx)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDeleteTag(idx)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => handleOpenTagDialog()} sx={{ mt: 1 }}>
              Add Tag
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFormDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveDevice}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Tag Form Dialog - แบบเต็มตามรูป BearIOT */}
      <Dialog open={openTagDialog} onClose={handleCloseTagDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingTagIndex !== null ? 'Edit Tag' : 'Add New Tag'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <TextField
              label="emailFrom"
              size="small"
              sx={{ flex: 1, minWidth: 120 }}
            />
            <TextField
              label="emailPwd"
              type="password"
              size="small"
              sx={{ flex: 1, minWidth: 120 }}
            />
            <TextField
              label="emailTo"
              size="small"
              sx={{ flex: 1, minWidth: 120 }}
            />
          </Box>
          <TextField
            fullWidth
            label="Label"
            name="label"
            value={tagFormData.label}
            onChange={handleTagFormChange}
            margin="normal"
            required
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>Script</Typography>
          <TextField
            fullWidth
            name="script"
            value={tagFormData.script}
            onChange={handleTagFormChange}
            multiline
            rows={4}
            sx={{ fontFamily: 'monospace', mt: 0.5 }}
          />
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Console</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <Button
              variant={tagFormData.consoleOn ? 'outlined' : 'contained'}
              size="small"
              onClick={() => setTagFormData({ ...tagFormData, consoleOn: false })}
            >
              Off
            </Button>
            <Button
              variant={tagFormData.consoleOn ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setTagFormData({ ...tagFormData, consoleOn: true })}
            >
              On
            </Button>
            <TextField
              label="low"
              type="number"
              size="small"
              value={tagFormData.consoleLow}
              onChange={(e) => setTagFormData({ ...tagFormData, consoleLow: Number(e.target.value) })}
              sx={{ width: 80 }}
            />
            <TextField
              label="high"
              type="number"
              size="small"
              value={tagFormData.consoleHigh}
              onChange={(e) => setTagFormData({ ...tagFormData, consoleHigh: Number(e.target.value) })}
              sx={{ width: 80 }}
            />
          </Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Alert</Typography>
          <TextField
            fullWidth
            label="Description"
            name="alertDesc"
            value={tagFormData.alertDesc}
            onChange={handleTagFormChange}
            size="small"
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {['record', 'sync', 'api', 'line', 'email'].map((key) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={tagFormData[key] ?? false}
                    onChange={(e) => setTagFormData({ ...tagFormData, [key]: e.target.checked })}
                  />
                }
                label={key.toUpperCase()}
              />
            ))}
          </Box>
          <FormControl fullWidth size="small">
            <InputLabel>Update</InputLabel>
            <Select
              name="update"
              value={tagFormData.update}
              onChange={handleTagFormChange}
              label="Update"
            >
              {UPDATE_OPTIONS.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTagDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTag}>
            {editingTagIndex !== null ? 'Update Tag' : 'Add Tag'}
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  )
}

export default DashboardPage
