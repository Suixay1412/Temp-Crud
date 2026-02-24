import React, { useState, useEffect } from 'react'
import Page from '../../containers/Page/Page'
import { useIntl } from 'react-intl'
import { useQuestions } from '../../providers/Dialogs/Question'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, 
  TextField,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material'

const UsersPage = () => {
  const intl = useIntl()
  const { openDialog: openConfirmDialog } = useQuestions()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [openFormDialog, setOpenFormDialog] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    _id: '',
    userName: '',
    fullName: '',
    email: '',
    password: '',
    userLevel: 'user',
    userState: 'enable',
  })

  const getAuth = () => {
    let auth = null
    const item = localStorage.getItem('base-shell:auth')
    if (item) {
      auth = JSON.parse(item)
    }
    return auth
  }

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const auth = getAuth()
      const response = await fetch('/api/users/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: auth.token,
        },
      })
      const data = await response.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching users:', error)
      setUsers([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName || '',
        email: user.email || '',
        password: '',
        userLevel: user.userLevel || 'user',
        userState: user.userState || 'enable',
      })
    } else {
      setEditingUser(null)
      setFormData({
        _id: '',
        userName: '',
        fullName: '',
        email: '',
        password: '',
        userLevel: 'user',
        userState: 'enable',
      })
    }
    setOpenFormDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenFormDialog(false)
    setEditingUser(null)
    setErrors({})
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.userName.trim()) {
      newErrors.userName = 'Username is required'
    }
    
    if (!editingUser && !formData.password.trim()) {
      newErrors.password = 'Password is required for new users'
    } else if (editingUser && formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (!editingUser && formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSaveUser = async () => {
    if (!validateForm()) {
      return
    }

    const auth = getAuth()
    setLoading(true)

    try {
      const dataToSend = { ...formData }
      // Only send password if it's been changed/provided
      if (!dataToSend.password) {
        delete dataToSend.password
      }

      let response, data
      const fetchAndParse = async (url) => {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: auth.token,
          },
          body: JSON.stringify({ data: dataToSend }),
        })
        let result
        const contentType = res.headers.get('content-type')
        if (contentType && contentType.indexOf('application/json') !== -1) {
          result = await res.json()
        } else {
          const text = await res.text()
          throw new Error('Server error: ' + text.substring(0, 100))
        }
        return { res, result }
      }

      if (editingUser) {
        // Update user
        ({ res: response, result: data } = await fetchAndParse('/api/users/update'))
        if (!response.ok || data.error) {
          setErrorMessage(data.text || data.error || 'Error updating user')
          return
        }
        setSuccessMessage('User updated successfully!')
        console.log('User updated:', data)
      } else {
        // Create new user
        ({ res: response, result: data } = await fetchAndParse('/api/users/create'))
        if (!response.ok || data.error) {
          setErrorMessage(data.text || data.error || 'Error creating user')
          return
        }
        setSuccessMessage('User created successfully!')
        console.log('User created:', data)
      }

      setTimeout(() => {
        handleCloseDialog()
        setSuccessMessage('')
        fetchUsers()
      }, 1500)
    } catch (error) {
      console.error('Error saving user:', error)
      setErrorMessage(error.message || 'An error occurred while saving the user')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = (userId) => {
    openConfirmDialog({
      title: intl.formatMessage({
        id: 'confirm_delete',
        defaultMessage: 'ยืนยันการลบ',
      }),
      message: intl.formatMessage({
        id: 'delete_user_message',
        defaultMessage: 'คุณต้องการลบผู้ใช้นี้หรือไม่?',
      }),
      action: intl.formatMessage({
        id: 'delete',
        defaultMessage: 'ลบ',
      }),
      handleAction: async (handleClose) => {
        const auth = getAuth()
        try {
          const response = await fetch('/api/users/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              authorization: auth.token,
            },
            body: JSON.stringify({ _id: userId }),
          })
          let data
          const contentType = response.headers.get('content-type')
          if (contentType && contentType.indexOf('application/json') !== -1) {
            data = await response.json()
          } else {
            const text = await response.text()
            throw new Error('Server error: ' + text.substring(0, 100))
          }
          console.log('User deleted:', data)
          fetchUsers()
        } catch (error) {
          console.error('Error deleting user:', error)
          setErrorMessage(error.message || 'An error occurred while deleting the user')
        }
        handleClose()
      },
    })
  }

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'users',
        defaultMessage: 'Users',
      })}
    >
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <div>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ marginRight: 1 }}
            >
              {intl.formatMessage({
                id: 'add_user',
                defaultMessage: 'Add User',
              })}
            </Button>
            <Tooltip title={intl.formatMessage({ id: 'refresh', defaultMessage: 'Refresh' })}>
              <IconButton onClick={fetchUsers} disabled={loading}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </div>
          {loading && <CircularProgress size={24} />}
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Full Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>User Level</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user._id} hover>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.fullName || '-'}</TableCell>
                    <TableCell>{user.email || '-'}</TableCell>
                    <TableCell>{user.userLevel || '-'}</TableCell>
                    <TableCell>{user.userState || '-'}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Tooltip title={intl.formatMessage({ id: 'edit', defaultMessage: 'Edit' })}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenDialog(user)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={intl.formatMessage({ id: 'delete', defaultMessage: 'Delete' })}>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center', padding: 3 }}>
                    {intl.formatMessage({
                      id: 'no_data',
                      defaultMessage: 'No data',
                    })}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* User Form Dialog */}
      <Dialog open={openFormDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingUser
            ? intl.formatMessage({
                id: 'edit_user',
                defaultMessage: 'Edit User',
              })
            : intl.formatMessage({
                id: 'add_user',
                defaultMessage: 'Add User',
              })}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: 2 }}>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>
          )}
          <TextField
            fullWidth
            label="Username"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            margin="normal"
            disabled={editingUser ? true : false}
            error={!!errors.userName}
            helperText={errors.userName}
          />
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            margin="normal"
            error={!!errors.fullName}
            helperText={errors.fullName}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            margin="normal"
            placeholder={editingUser ? 'Leave blank to keep current password' : 'Required'}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            fullWidth
            label="User Level"
            name="userLevel"
            value={formData.userLevel}
            onChange={handleInputChange}
            margin="normal"
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </TextField>
          <TextField
            fullWidth
            label="Status"
            name="userState"
            value={formData.userState}
            onChange={handleInputChange}
            margin="normal"
            select
            SelectProps={{
              native: true,
            }}
          >
            <option value="enable">Enable</option>
            <option value="disable">Disable</option>
            <option value="waiting">Waiting</option>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button onClick={handleCloseDialog}>
            {intl.formatMessage({
              id: 'cancel',
              defaultMessage: 'Cancel',
            })}
          </Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            {intl.formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })}
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  )
}

export default UsersPage
