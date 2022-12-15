// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Import
import Link from 'next/link'
import axios from "axios";
// ** MUI Imports
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
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

// ** Icons Imports
import Laptop from 'mdi-material-ui/Laptop'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CogOutline from 'mdi-material-ui/CogOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteUser } from 'src/store/apps/products'

import { updateProducts } from 'src/store/apps/products'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/products/list/TableHeader'
import AddUserDrawer from 'src/views/apps/products/list/AddUserDrawer'

// ** Vars
const userRoleObj = {
  admin: <Laptop sx={{ mr: 2, color: 'error.main' }} />,
  author: <CogOutline sx={{ mr: 2, color: 'warning.main' }} />,
  editor: <PencilOutline sx={{ mr: 2, color: 'info.main' }} />,
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
      // <AvatarWithImageLink href={`/apps/products/view/${row.p_id}`}>
        <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
      // </AvatarWithImageLink>
    )
  } else {
    return (
      // <AvatarWithoutImageLink href={`/apps/products/view/${row.p_id}`}>
        <CustomAvatar
          skin='light'
          color={row.avatarColor || 'primary'}
          sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
        >
          {getInitials(row.fullName ? row.fullName : 'John Doe')}
        </CustomAvatar>
      // </AvatarWithoutImageLink>
    )
  }
}

// ** Styled component for the link inside menu
const MenuItemLink = styled('a')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  padding: theme.spacing(1.5, 4),
  color: theme.palette.text.primary
}))

const RowOptions = ({ p_id,row }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)
  const [openEdit, setOpenEdit] = useState(false)
  const [openPlans, setOpenPlans] = useState(false)
   //onChange={e => setFirstName(e.target.value)}
const [tittle, settittle] = useState(row.tittle)
const [descriptions, setdescriptions] = useState(row.descriptions)
const [price, setprice] = useState(parseInt(row.price))
const [length, setlength] = useState(parseInt(row.size.length))
const [breath, setbreath] = useState(parseInt(row.size.breath))
const [height, setheight] = useState(parseInt(row.size.height))
const [cubic_meter, setcubic_meter] = useState(parseInt(row.size.cubic_meter))
const [status, setstatus] = useState(row.status)
const [avatar, setavatar] = useState(row.avatar)
  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUser(p_id))
    handleRowOptionsClose()
  }
  



  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)
  function  updateProduct()
  { 
     var storedData = window.localStorage.getItem("userData");
    storedData = JSON.parse(storedData);
       
             var data={
            "a_id":storedData.adminid,
            "sa_id":"s1",
            "tittle":tittle,
              "descriptions ":"test2 desc",
              "price":price,
            
             "length":length,
             "breath":breath,
             "height":height,
             "cubic_meter":cubic_meter,
              "p_id":p_id,
              "avatar":"/images/avatars/4.png",
              "status":status, 
              "role": storedData.role,
              "admin_id": storedData.adminid
    }
    dispatch(updateProducts({ ...data }))
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
                Edit Product Information
              </DialogTitle>
              <DialogContent>
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating Product details 
                </DialogContentText>
                <form>
              
          <CustomAvatar alt='User Image' src={avatar} variant='rounded' sx={{ width: 120, height: 120, mb: 4 }} />
        
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Title Product' value={tittle} onChange={e => settittle(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        value={price}
                         type='number' 
                          label='Product Price'
                          onChange={e => setprice(e.target.value)}
                       // InputProps={{ startAdornment: <InputAdornment position='end'>$</InputAdornment> }}
                      />
                    </Grid>
                    
                    
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='number' label='Product Length' value={length} onChange={e => setlength(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField   type='number' fullWidth label='Product Breath' value={breath} onChange={e => setbreath(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField type='number' fullWidth label='Product Height' value={`${height}`} onChange={e => setheight(e.target.value)}/>
                    </Grid>
                      <Grid item xs={12} sm={6}>
                      <TextField type='number' fullWidth label='Product Cubic Meter' value={`${cubic_meter}`} onChange={e => setcubic_meter(e.target.value)}/>
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
                <Button variant='contained' sx={{ mr: 1 }} onClick={updateProduct}>
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
    flex: 0.1,
    minWidth: 180,
    //maxWidth:80,
    
    field: 'tittle',
    headerName: 'tittle',
    renderCell: ({ row }) => {
      const { p_id, tittle, price,descriptions } = row
      var p_idnew=String(p_id).substring(1);
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            {/* <Link href={`/apps/products/view/${p_idnew}`} passHref> */}
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {tittle}
              </Typography>
            {/* </Link> */}
            {/* <Link href={`/apps/products/view/${p_idnew}`} passHref> */}
              <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                {price}€
              </Typography>
            {/* </Link> */}
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.5,
    minWidth: 90,
    minHeight:30,
    maxWidth:90,
    field: 'length',
    headerName: 'length',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
        <Typography noWrap variant='body2'>
          {parseInt(row.size.length)}
        </Typography>
         
        </Box>
      )
    }
  },
 
  {
    flex: 0.15,
    field: 'breath',
    minWidth: 50,
    maxWidth:90,
    headerName: 'breath',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {userRoleObj[row.role]}
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.size.breath}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 30,
    headerName: 'height',
    field: 'height',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.size.height}
        </Typography>
      )
    }
  },
{
    flex: 0.15,
    minWidth: 30,
    headerName: 'cubic meter',
    field: 'cubic_meter',
    renderCell: ({ row }) => {
      return (
        <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.size.cubic_meter}
        </Typography>
      )
    }
  },
   
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
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
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
    renderCell: ({ row }) => <RowOptions p_id={row.p_id} row={row} />
  }
]

const UserList = () => {
  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addUserOpen, setAddUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.products)
  useEffect(() => {
    var storedData = window.localStorage.getItem("userData");
    storedData = JSON.parse(storedData);
    
    dispatch(
      fetchData({
        role,
        status,
        q: value,
        currentPlan: plan,
        global_id: storedData.id,
        role: storedData.role,
        admin_id: storedData.adminid
      })
    );
  }, [dispatch, plan, role, status, value])
 {/* useEffect(() => {
async function getdata()
{
    const response = await axios.post(
   "https://buch-kunstregister.dehttp://localhost:3000/api/customers/get?pagination-no=12&page=1& id=9585285517364942&password=password1",
  {}
  );
  console.log(response.data);
 var d = response.data;
  d=d.data
  console.log(d.data[0].products)
 }
 getdata()

 }, [])*/
 }

  const handleFilter = useCallback(val => {
   
    setValue(val)
  }, [])

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6}>
     {/* <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='role-select'>Select Role</InputLabel>
                  <Select
                    fullWidth
                    value={role}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'
                    onChange={handleRoleChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='author'>Author</MenuItem>
                    <MenuItem value='editor'>Editor</MenuItem>
                    <MenuItem value='maintainer'>Maintainer</MenuItem>
                    <MenuItem value='subscriber'>Subscriber</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Select Plan</InputLabel>
                  <Select
                    fullWidth
                    value={plan}
                    id='select-plan'
                    label='Select Plan'
                    labelId='plan-select'
                    onChange={handlePlanChange}
                    inputProps={{ placeholder: 'Select Plan' }}
                  >
                    <MenuItem value=''>Select Plan</MenuItem>
                    <MenuItem value='basic'>Basic</MenuItem>
                    <MenuItem value='company'>Company</MenuItem>
                    <MenuItem value='enterprise'>Enterprise</MenuItem>
                    <MenuItem value='team'>Team</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='pending'>Pending</MenuItem>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
  </Grid>*/}
      <Grid item xs={13}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
             getRowId={(row) => row.p_id}
            autoHeight
            rows={store.data}
            columns={columns}
        
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
        
      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export default UserList
