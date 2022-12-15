// ** React Imports
import { useState, useEffect } from "react";
import axios from 'axios'
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
import { addmanager } from 'src/store/apps/managers'

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
  email: yup.string().email().required(),
  name: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  password: yup
    .string()
    .min(5, obj => showErrors('Password', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  email: '',
  name: '',
  password: ''
}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [status, setstatus] = useState('active')
  const [role, setRole] = useState('')
   const [roleData, setroleData] = useState([]);
 const [emailerror, setemailerror] = useState('')
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
  useEffect(() => {
    async function getdata() {
       var storedData = window.localStorage.getItem("userData");
       storedData = JSON.parse(storedData);
        
      const response = await axios.post(
        "http://localhost:3000/api/getRoleData",
        {"id": storedData.id}
      );
      console.log(storedData.id);
        console.log(response.data);
      setroleData(response.data);
    }
    getdata();
    //console.log(cardDatas);
  }, [toggle]);
  
async function setdata(data)
{
  var email=data.email
const response = await axios.post('http://localhost:3000/api/getManagerbyemail', {
    email
     })
  console.log(response.data)
  if(response.data.length!=0)
  {
      setemailerror("already registred")
  }
  else
  {
 setemailerror("")
   dispatch(addmanager({ ...data, role, currentstatus: status }))
    toggle()
   reset()
  }
}
  const onSubmit = data => {
    
    setdata(data)
   
  }

  const handleClose = () => {
    setstatus('active')
    setRole('subscriber')
    setValue('contact', '')
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ "& .MuiDrawer-paper": { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant="h6">Add User</Typography>
        <Close
          fontSize="small"
          onClick={handleClose}
          sx={{ cursor: "pointer" }}
        />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label="Name"
                  onChange={onChange}
                  placeholder="John Doe"
                  error={Boolean(errors.name)}
                />
              )}
            />
            {errors.name && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.name.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type="email"
                  value={value}
                  label="Email"
                  onChange={onChange}
                  placeholder="johndoe@email.com"
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.email.message}
              </FormHelperText>
            )}
          </FormControl>

          <Typography variant="h8" color="red" noWrap>
            {emailerror}
          </Typography>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label="Password"
                  onChange={onChange}
                  placeholder="12345"
                  error={Boolean(errors.password)}
                />
              )}
            />
            {errors.password && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.password.message}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id="role-select">Select Role</InputLabel>
            <Select
              fullWidth
              value={role}
              id="select-role"
              label="Select Role"
              labelId="role-select"
              onChange={(e) => setRole(e.target.value)}
              inputProps={{ placeholder: "Select Role" }}
            >
             {roleData.map((item, index) => (
                 <MenuItem value={item.title}>{item.title}</MenuItem>
              ))}
              
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id="status-select">Select status</InputLabel>
            <Select
              fullWidth
              value={status}
              id="select-status"
              label="Select status"
              labelId="status-select"
              onChange={(e) => setstatus(e.target.value)}
              inputProps={{ placeholder: "Select status" }}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              size="large"
              type="submit"
              variant="contained"
              sx={{ mr: 3 }}
            >
              Submit
            </Button>
            <Button
              size="large"
              variant="outlined"
              color="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
}

export default SidebarAddUser
