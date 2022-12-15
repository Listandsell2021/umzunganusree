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
import { addProducts } from 'src/store/apps/products'

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
  length: yup.string().required(),
  title: yup.string().required(),
  breath: yup
    .number()
    
    .min(1, obj => showErrors('Breath', obj.value.length, obj.min))
    .required(),
  height: yup
    .number()
    .min(1, obj => showErrors('Height', obj.value.length, obj.min))
    .required(),
  cubic_meter: yup
    .number()
    .min(1, obj => showErrors('Cubic Meter', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  title: '',
  price: '',
  length: '',
  breath: '',
  height: '',
  cubic_meter: ''
}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [status, setStatus] = useState('active')
  const [role, setRole] = useState('subscriber')

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
     var storedData = window.localStorage.getItem("userData");
    storedData = JSON.parse(storedData);
              
    dispatch(addProducts({ ...data, role, currentPlan: "basic",crole:storedData.role,admin_id: storedData.adminid,id:storedData.id}))
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
                  placeholder='Products Title'
                  error={Boolean(errors.title)}
                />
              )}
            />
            {errors.title && <FormHelperText sx={{ color: 'error.main' }}>{errors.title.message}</FormHelperText>}
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
              name='length'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                 type='number'
                  
                  value={value}
                  label='length'
                  onChange={onChange}
                  placeholder='length'
                  error={Boolean(errors.length)}
                />
              )}
            />
            {errors.length && <FormHelperText sx={{ color: 'error.main' }}>{errors.length.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='breath'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                type='number'
                  value={value}
                  label='breath'
                  onChange={onChange}
                  placeholder='breath'
                  error={Boolean(errors.breath)}
                />
              )}
            />
            {errors.breath && <FormHelperText sx={{ color: 'error.main' }}>{errors.breath.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='height'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                type='number'
                  value={value}
                  label='height'
                  onChange={onChange}
                  placeholder='height'
                  error={Boolean(errors.height)}
                />
              )}
            />
            {errors.height && <FormHelperText sx={{ color: 'error.main' }}>{errors.height.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='cubic_meter'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='number'
                  value={value}
                  label='cubic_meter'
                  onChange={onChange}
                  placeholder='cubic_meter'
                  error={Boolean(errors.cubic_meter)}
                />
              )}
            />
            {errors.cubic_meter && <FormHelperText sx={{ color: 'error.main' }}>{errors.cubic_meter.message}</FormHelperText>}
          </FormControl>
          
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='plan-select'>status</InputLabel>
            <Select
              fullWidth
              value={status}
              id='status'
              label='status'
              labelId='status'
              onChange={e => setPlan(e.target.value)}
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
