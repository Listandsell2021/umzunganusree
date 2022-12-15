// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addService } from 'src/store/apps/service'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  price: yup.string().required(),
  desc: yup.string().required(),
  title: yup.string().required()
  
  
  
})

const defaultValues = {
  title: '',
  price: '',
  desc: '',
  
}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [status, setStatus] = useState('active')
  const [role, setRole] = useState('subscriber')
 const [pricetype, setpricetype] = useState('fixed price')
  // ** Hooks
  const dispatch = useDispatch()

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    
   dispatch(addService({ ...data, status:status, currentPlan: "basic",pricetype:pricetype }))
    toggle()
    reset()
  }

  const handleClose = () => {
    //setPlan('basic')
    setRole('subscriber')
    setValue('breath', '')
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add User</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='title'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Title'
                  onChange={onChange}
                  placeholder='Service Title'
                  error={Boolean(errors.title)}
                />
              )}
            />
            {errors.title && <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>}
          </FormControl>
             <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='plan-select'>SERVICE TYPE</InputLabel>
            <Select
              fullWidth
              value={pricetype}
              id='service_type'
              label='service_type'
              labelId='service_type'
              onChange={e => setpricetype(e.target.value)}
              inputProps={{ placeholder: 'service_type' }}
            >
              <MenuItem value='fixed price'>Fixed Price</MenuItem>
              <MenuItem value='Price Per sq Meter'>Price Per sq Meter</MenuItem>
             
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='price'
              type='number'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='price'
                  onChange={onChange}
                  placeholder='18'
                  error={Boolean(errors.price)}
                />
              )}
            />
            {errors.price && <FormHelperText sx={{ color: 'error.main' }}>{errors.price.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='desc'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                 
                  
                  value={value}
                  label='desc'
                  onChange={onChange}
                  placeholder='desc'
                  error={Boolean(errors.desc)}
                />
              )}
            />
            {errors.desc && <FormHelperText sx={{ color: 'error.main' }}>{errors.desc.message}</FormHelperText>}
          </FormControl>
         
          
         
          
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='plan-select'>status</InputLabel>
            <Select
              fullWidth
              value={status}
              id='status'
              label='status'
              labelId='status'
              onChange={e => setStatus(e.target.value)}
              inputProps={{ placeholder: 'Status' }}
            >
              <MenuItem value='active'>Active</MenuItem>
              <MenuItem value='pending'>pending</MenuItem>
             
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
