// ** React Imports
import { useEffect, useCallback, useState } from 'react'

// ** Next Images
import Link from 'next/link'
import axios from 'axios'
// ** MUI Imports\

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'


import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
// ** Icons Imports
import Laptop from 'mdi-material-ui/Laptop'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CogOutline from 'mdi-material-ui/CogOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'

import Dialog from '@mui/material/Dialog'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData,fetchdatabyid } from 'src/store/apps/managers'

import { updateManager } from 'src/store/apps/managers'
// ** Custom Components Imports
import TableHeader from 'src/views/apps/roles/TableHeader'

import AddUserDrawer from 'src/views/apps/managers/list/AddUserDrawer'
// ** Vars
const userRoleObj = {
  admin: <Laptop sx={{ mr: 2, color: 'error.main' }} />,
  author: <CogOutline sx={{ mr: 2, color: 'warning.main' }} />,
  manager: <PencilOutline sx={{ mr: 2, color: 'info.main' }} />,
  maintainer: <ChartDonut sx={{ mr: 2, color: 'success.main' }} />,
  subscriber: <AccountOutline sx={{ mr: 2, color: 'primary.main' }} />
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Styled component for the link for the avatar with image
const AvatarWithImageLink = styled(Link)(({ theme }) => ({
  marginRight: theme.spacing(3)
}))

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** renders client column
const renderClient = row => {
  if (row.avatar.length) {
    return (
      <AvatarWithImageLink href={`/apps/user/view/${row.id}`}>
        <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
      </AvatarWithImageLink>
    )
  } else {
    return (
      <AvatarWithoutImageLink href={`/apps/user/view/${row.id}`}>
        <CustomAvatar skin='light' color={row.avatarColor} sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}>
          {getInitials(row.full_name ? row.full_name : 'John Doe')}
        </CustomAvatar>
      </AvatarWithoutImageLink>
    )
  }
}
const MenuItemLink = styled('a')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  padding: theme.spacing(1.5, 4),
  color: theme.palette.text.primary
}))
const RowOptions = ({ mid,row }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)
  const [openEdit, setOpenEdit] = useState(false)
   const [full_name, setfull_name] = useState(row.full_name)
const [email, setemail] = useState(row.email)
const [role, setrole] = useState(row.role)

const [status, setstatus] = useState(row.status)
const [avatar, setavatar] = useState(row.avatar)
const [showPassword, setShowPassword] = useState(true)
const [password, setPassowrd] = useState(row.password)
  

   
   

  
var midnew=String(mid).substring(1);
  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(mid))
    handleRowOptionsClose()
  }
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)
  function  updateManagers()
  { 
   var datanew=
    {
      
      "global_id":"sa1",
      "m_id":row.m_id,
      "email":email,
      "email_verification":"gjhgf67gsf",
      "registered_date":"10/11/2022",
      "avatar":"/images/avatars/4.png",
      "role":role,
      "status":status,
      "full_name":full_name,
      "password":password
    }
    console.log(datanew)
    dispatch(updateManager({ ...datanew }))
    handleEditClose()
  }

  return (
    <>
    <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
              aria-describedby='user-view-edit-description'
            >
              <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Edit Manager Information
              </DialogTitle>
              <DialogContent>
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating Manager details 
                </DialogContentText>
                <form>
              
          <CustomAvatar alt='User Image' src={avatar} variant='rounded' sx={{ width: 120, height: 120, mb: 4 }} />
        
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Name' value={full_name} onChange={e => setfull_name(e.target.value)} />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Email' 
                      value={email} 
                      onChange={e => setemail(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth 
                      label='Password' 
                      value={password} 
                       type={showPassword ? 'text' : 'password'}
                      onChange={e => setPassowrd(e.target.value)} />
                      
                    </Grid>
                    
                   
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Role</InputLabel>
                        <Select
                          label='Role'
                          value={role}
                          onChange={e => setrole(e.target.value)}
                          id='user-view-status'
                          labelId='user-view-status-label'
                        >
                          <MenuItem value='manager'>Manager</MenuItem>
                          <MenuItem value='maintainer'>Maintainer</MenuItem>
                          
                        </Select>
                      </FormControl>
                    </Grid>
                    
                   <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Status</InputLabel>
                        <Select
                          label='Status'
                          value={status}
                          onChange={e => setstatus(e.target.value)}
                          id='user-view-status'
                          labelId='user-view-status-label'
                        >
                          <MenuItem value='pending'>Pending</MenuItem>
                          <MenuItem value='active'>Active</MenuItem>
                          <MenuItem value='inactive'>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                   
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button variant='contained' sx={{ mr: 1 }} onClick={updateManagers}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Discard
                </Button>
              </DialogActions>
            </Dialog>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        
        <MenuItem onClick={handleEditClickOpen}>
          <PencilOutline fontSize='small' sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'fullName',
    headerName: 'User',
    renderCell: ({ row }) => {
      const { id, full_name, username } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Link href={`/apps/user/view/${id}`} passHref>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {full_name}
              </Typography>
            </Link>
            <Link href={`/apps/user/view/${id}`} passHref>
              <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                
              </Typography>
            </Link>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap>
          {row.email}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'password',
    headerName: 'Password',
    
    renderCell: ({ row }) => {
      
     const [passwordshow, setpasswordshow] = useState(true)  
   const [password, setpassword] = useState("")  
    useEffect(() => {
     if(passwordshow)
      {
        console.log("true")
        setpassword("****")
      }
      else
      {
        console.log("false")
        setpassword(row.password)
      }
    }, [passwordshow])
    
      
   
      return (
        <Typography variant='body2' noWrap>
          {password}
          <IconButton size='small' onClick={() => setpasswordshow(!passwordshow)} >
           {passwordshow ? <EyeOutline /> : <EyeOffOutline />}
      </IconButton>
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'role',
    minWidth: 150,
    headerName: 'Role',
    renderCell: ({ row }) => {

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {userRoleObj[row.role]}
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.role}
          </Typography>
        </Box>
      )
    }
  },
  // {
  //   flex: 0.15,
  //   minWidth: 120,
  //   headerName: 'Plan',
  //   field: 'currentPlan',
  //   renderCell: ({ row }) => {
  //     return (
  //       <Typography noWrap variant='subtitle1' sx={{ textTransform: 'capitalize' }}>
  //         {row.currentPlan}
  //       </Typography>
  //     )
  //   }
  // },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
       
    
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.status}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
   {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => {
    
    
      return(
    <RowOptions mid={row.mid} row={row} password={row.m_id} />)}
  }
]

const UserList = () => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
const [addUserOpen, setAddUserOpen] = useState(false)
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.managers)
  useEffect(() => {
   //console.log(store)
   var storedData = window.localStorage.getItem("userData");
   storedData = JSON.parse(storedData);
    dispatch(
      fetchData({
        role: "",
        q: value,
        status: "",
        currentPlan: plan,
        global_id: storedData.id
      })
    );
  }, [dispatch, plan, value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])
const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader plan={plan} value={value} toggle={toggleAddUserDrawer} handleFilter={handleFilter} handlePlanChange={handlePlanChange} />
          <DataGrid
            autoHeight
            getRowId={(row) => row.m_id}
            rows={store.data}
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
    
  )
}

export default UserList
