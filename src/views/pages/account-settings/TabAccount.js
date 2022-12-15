// ** React Imports
import { useState,useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')


    const [Username, setUsername] = useState("")
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Role, setRole] = useState("")
    const [Status, setStatus] = useState("")
    const [Company, setCompany] = useState("")





  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }
 const handleChange = (event) => {
  
    setName(event.target.value);
  };
async function checklogin(data)
{

   const { email, password } = data 
  
     var data = JSON.stringify({
      "email": email,
      "pass": password,
    });

    var axios = require('axios');
   
   
    var config = {
      method: 'POST',
      //url: "http://localhost:3000/api/read"
      url: "http://localhost:3000/api/read"
      
      ,
      headers: { 
        'Content-Type': 'application/json',
      },
      data : data};
  
          var login=await axios(config)
          login=login.data
          //console.log(test.data)
          

   return login;
   
}
async function getdeatilssuperadmin(data)
{

 
  
     var data = JSON.stringify({
      "id": data,
     
    });
 
    var axios = require('axios');
   
   
    var config = {
      method: 'POST',
      //url: "http://localhost:3000/api/getDetailSuperAdmin"
      url: " http://localhost:3000/api/getDetailSuperAdmin"
      ,
      headers: { 
        'Content-Type': 'application/json',
      },
      data : data};
  
          var details=await axios(config)
          details=details.data
          //console.log(test.data)
          

   return details;
   
}
async function getdeatilsadmin(data)
{

 
  
     var data = JSON.stringify({
      "id": data,
     
    });
 
    var axios = require('axios');
   
   
    var config = {
      method: 'POST',
      //url: "http://localhost:3000/api/getDetailSuperAdmin"
      url: " http://localhost:3000/api/getDetailAdmin"
      ,
      headers: { 
        'Content-Type': 'application/json',
      },
      data : data};
  
          var details=await axios(config)
          details=details.data
          //console.log(test.data)
          

   return details;
    }
   
async function getdeatilsmanager(data) {
  var data = JSON.stringify({
    id: data,
  });

  var axios = require("axios");

  var config = {
    method: "POST",
    //url: "http://localhost:3000/api/getDetailSuperAdmin"
    url: " http://localhost:3000/api/getManagerData",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  var details = await axios(config);
  details = details.data;
  //console.log(test.data)

  return details;

}
useEffect(()=>{
      var storedData = window.localStorage.getItem('userData')
      storedData=JSON.parse(storedData)
      if(storedData.role=="superadmin")
      {
         getdeatilssuperadmin(storedData.id).then(res=>
            {
            
             var details=res[0].details
             //console.log(res[0])
             var email=res[0].email
             var name=details[0].name;
           //var data={"id":logindata.global_id,"role":logindata.role,"fullName":name.first_name + " "+ name.last_name ,"username":email,"email":email};
           setName(name.first_name + " "+ name.last_name)
           setEmail(res[0].email)
           setRole(res[0].role)
           setStatus(details[0].status)
           setCompany(details[0].compnay)
            //console.log(details[0].status)
           
          })
      }
      else if (storedData.role == "admin") {
        getdeatilsadmin(storedData.id).then((res) => {
          var details = res[0].details;
          //console.log(res[0])
          var email = res[0].email;
          //var name=details[0].name;
          //var data={"id":logindata.global_id,"role":logindata.role,"fullName":name.first_name + " "+ name.last_name ,"username":email,"email":email};
          setName(storedData.fullName);
          setEmail(res[0].email);
          setRole(res[0].role);
          setStatus(details[0].status);
          setCompany(details[0].company_name);
          //console.log(details[0].status)
        });
      } 
      else
      {
        getdeatilsmanager(storedData.id).then((res) => {
          console.log(res)
          var details = res[0].details;
          //console.log(res[0])
          var email = res[0].email;
          //var name=details[0].name;
          //var data={"id":logindata.global_id,"role":logindata.role,"fullName":name.first_name + " "+ name.last_name ,"username":email,"email":email};
          setName(storedData.fullName);
          setEmail(res[0].email);
          setRole(res[0].role);
          setStatus(details[0].status);
          setCompany(details[0].company_name);
          //console.log(details[0].status)
        });
      }    

     
         
        })

  return (
    <CardContent>
      <form>
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ my: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography sx={{ mt: 4 }} component='p' variant='caption'>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Username' placeholder='johnDoe' defaultValue={Username} />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Name' placeholder='John Doe' value={Name}  onChange={handleChange}  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='johnDoe@example.com'
              value={Email
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' value={Role} disabled>
                <MenuItem value={Role}>{Role}</MenuItem>
                <MenuItem value='superadmin'>SuperAdmin</MenuItem>
                <MenuItem value='editor'>Editor</MenuItem>
                <MenuItem value='maintainer'>Maintainer</MenuItem>
                <MenuItem value='subscriber'>Subscriber</MenuItem>
              </Select>
            </FormControl>
          </Grid>
         {!Role=="superadmin" && <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label='Status' value={Status} disabled>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>} 
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Company' placeholder='ABC Pvt. Ltd.' value={Company} />
          </Grid>

          {openAlert ? (
            <Grid item xs={12}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle sx={{ mb: '.15rem' }}>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ mr: 4 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
