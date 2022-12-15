



// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
// ** Icons Imports
import CircleOutline from 'mdi-material-ui/CircleOutline'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'



import { useRouter } from 'next/router'



// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'


import { useState,forwardRef,useEffect } from 'react'


import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'

import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'

import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContents from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'

import Divider from '@mui/material/Divider'
// ** Icons Imports
import Close from 'mdi-material-ui/Close'
// ** Third Party Imports
import axios from 'axios'

// ** Demo Imports
import PricingCTA from 'src/views/pages/pricing/PricingCTA'
import PricingPlans from 'src/views/pages/pricing/PricingPlans'
import PricingHeader from 'src/views/pages/pricing/PricingHeader'
import PricingFooter from 'src/views/pages/pricing/PricingFooter'

import AccountOutline from 'mdi-material-ui/AccountOutline'
import SnackbarControlSlideDirection from 'src/views/components/snackbar/SnackbarControlSlideDirection'
const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})






// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12, 6, 6),
  borderRadius: theme.shape.borderRadius
}))

// ** Styled Component for the wrapper of all the features of a plan
const BoxFeature = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
  '& > :not(:first-of-type)': {
    marginTop: theme.spacing(4)
  }
}))


 
 

const handleChangeTitle = e => {
    settitle(e.target.value)
  }
  const handleChangePlanPrice = e => {
    setmonthlyPrice(e.target.value)
  }
  const handleChangeSubTitle = e => {
    setsubtitle(e.target.value)
  }
const handleChangePerMonthPriceUYearly= e => {
    setperMonth(e.target.value)
  }
  const handleChangeStatus = e => {
    setStatus(e.target.value)
  }
  const handleChangeAnnualPrice = e => {
    settotalAnnual(e.target.value)
  }
  
    const handleChangeBenifits2 = e => {
    setplanBenefits2(e.target.value)
  }
    const handleChangeBenifits3 = e => {
    setplanBenefits3(e.target.value)
  }
    const handleChangeBenifits4 = e => {
    setplanBenefits4(e.target.value)
  }

const PlanDetails = props => {
  // ** Props
  const { plan, data } = props
      

const router = useRouter()


 const [show, setShow] = useState(false)
  const [title, settitle] = useState(data?.title)
  const [monthlyPrice,setmonthlyPrice] = useState(data?.monthlyPrice)

  const [company_name,setcompany_name] = useState("")

  const [name,setname] = useState("")
  
  const [email, setemail] = useState("")
   const [cplan, setcplan] = useState(data?.plan_id)
  const [phone, setphone] = useState("")
  const [address, setaddress] = useState("")
  const [planBenefits3, setplanBenefits3] = useState(data?.planBenefits[2])
  const [planBenefits4, setplanBenefits4] = useState(data?.planBenefits[3])
  const [planBenefits5, setplanBenefits5] = useState(data?.planBenefits[4])
  const [status, setStatus] = useState("active")
  const [languages, setLanguages] = useState([])

  useEffect(() => {
   
    var storedData = window.localStorage.getItem('userData')
      storedData=JSON.parse(storedData)
      setname(storedData.fullName)
      setemail(storedData.email)
  
    
  })
  
const handleChangeTitle = e => {
    settitle(e.target.value)
  }
  const handleChangePlanPrice = e => {
    setmonthlyPrice(e.target.value)
  }
  const handleChangename = e => {
    setname(e.target.value)
  }

  const handleChangeemail= e => {
    setemail(e.target.value)
  }
   const handleChangephone= e => {
    setphone(e.target.value)
  }
  const handleChangeaddress= e => {
    setaddress(e.target.value)
  }
  const handleChangecompany_name = e => {
    setcompany_name(e.target.value)
  }
  

  
  const handleChangeStatus = e => {
    setStatus(e.target.value)
  }
  const handleChangeAnnualPrice = e => {
    settotalAnnual(e.target.value)
  }
  
   
    const handleChangeBenifits3 = e => {
    setplanBenefits3(e.target.value)
  }
    const handleChangeBenifits4 = e => {
    setplanBenefits4(e.target.value)
  }
  const handleChangeBenifits5 = e => {
    setplanBenefits5(e.target.value)
  }
  const BpIcon = styled('span')(({ theme }) => ({
  width: 16,
  height: 16,
  borderRadius: '50%',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5'
  },
  '.Mui-focusVisible &': {
    outlineOffset: 2,
    outline: '2px auto rgba(19,124,189,.6)'
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)'
  },
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))'
}))

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  'input:hover ~ &': {
    backgroundColor: '#106ba3'
  },
  '&:before': {
    width: 16,
    height: 16,
    content: '""',
    display: 'block',
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)'
  }
})
  const BpRadio = props => {
    
  return (
    <Radio
      {...props}
      disableRipple
      color='default'
      icon={<BpIcon />}
      checkedIcon={<BpCheckedIcon />}
      sx={{ '&:hover': { backgroundColor: 'transparent' } }}
    />
  )
}
  const renderFeatures = () => {
    return data?.planBenefits.map((item, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CircleOutline sx={{ mr: 2.5, fontSize: '0.875rem', color: 'text.secondary' }} />
        <Typography variant='body2'>{item}</Typography>
      </Box>
    ))
  }
async function setdata()
{
   //window.open ("/card/?tokenn=30","_self");

  const date = new Date()
var current_date=String(date.getDate())+"/"+String(date.getMonth()+1)+"/"+String(date.getFullYear())
var storedData = window.localStorage.getItem('userData')
      storedData=JSON.parse(storedData)
      
  var datanew={
        "sa_id":"sa1",
        "a_id":storedData.id,
        "company_name":company_name,
        "address":address,
        "token":"123333",
        "date_registered":current_date,
        "avatar":"/images/avatars/4.png",
        "contact":phone,
        "currentPlan":cplan,
        "full_name":storedData.fullName,
        "role":storedData.role,
        "status":"active",   ///change during payment
        "email":email,
        "username":email
    }

  
const response = await axios.post('http://localhost:3000/api/updateAdmin', {
    datanew
  })
  console.log(response.status)
   if(response.status==200)
   {

   var deletenavigation={
    "tittle":"Packages",
    "global_id":storedData.id
  }

     const responsedelete = await axios.post('http://localhost:3000/api/removeNavigation', {
    deletenavigation
  })
  console.log(responsedelete)
   
   var navigationData={
    "title":"Dashboards",
    "icon":"HomeOutline",
    "path":"/dashboards/crm",
    "global_id":storedData.id
  }
  const responsenavigation = await axios.post('http://localhost:3000/api/postNavigationMenu', {
    navigationData
  })
  
  var postAdminPackage=
    {
      "sa_id":"sa1",
      "a_id":storedData.id,
      "current_package":"",
      "package_id":cplan,
      "package_start":current_date,
      "package_end":"",
      "package_registered":current_date,
      "status":"active"
    }
  
  const responsePostAdminPackage = await axios.post('http://localhost:3000/api/postAdminPackage', {
    postAdminPackage
  })

   // const crypt = (salt, text) => {
    //       //console.log("-----text enyrpt")
    //       //console.log(text)
    //       const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    //       const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    //       const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
        
    //       return text
    //         .split("")
    //         .map(textToChars)
    //         .map(applySaltToChar)
    //         .map(byteHex)
    //         .join("");
    //     };
    
       // var encrypted_text = crypt("salt", String(total));
        //var emai=String(data.email)
        //console.log(emai)
        //const resemail =  emai.replace('@', '*')
        

       // localStorage.setItem("paypaladd", String(newaddr))
        //localStorage.setItem("deliveryoption",liferRef.current)
        //localStorage.setItem("notepaypal",cust_notes)
        
        
       // var add=String(newaddr)
        //console.log(add)
       // const res =  add.replace(/ /g, '_')
        
       


   router.replace('/dashboards/crm/')
   }
}
  return (
    <BoxWrapper
      sx={{
        border: theme =>
          !data?.popularPlan
            ? `1px solid ${theme.palette.divider}`
            : `1px solid ${hexToRGBA(theme.palette.primary.main, 0.5)}`
      }}
    >
       <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Close />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
             Plan 
            </Typography>
            <Typography variant='body2'>Fill information</Typography>
          </Box>
           
          
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
           <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. Plan Details
              </Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth label='Plan Title' placeholder='Basic' onChange={handleChangeTitle} value={title} />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth value={monthlyPrice}  onChange={handleChangePlanPrice}  label='Plan Price' placeholder='Doe' />
            </Grid>
             <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                2.Billing details
              </Typography>
            </Grid>
            
            <Grid item sm={6} xs={12}>
              <TextField fullWidth value={name}  onChange={handleChangename} label='Full Name' placeholder='John' />
            </Grid>
            
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth

                label='email'
                placeholder='johnDoe@email.com'
                value={email}
                onChange={handleChangeemail}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth

                label='phone'
                placeholder='+491234488727'
                value={phone}
                onChange={handleChangephone}
              />
            </Grid>
               <Grid item sm={6} xs={12}>
              <TextField
                fullWidth

                label='Umzung '
                placeholder='Umzung'
                value={company_name}
                onChange={handleChangecompany_name}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField fullWidth label='Address' placeholder='123 weitb' onChange={handleChangeaddress} value={address} />
            </Grid>
             <Grid item xs={12}>
              <Divider sx={{ mb: 0 }} />
            </Grid>
              <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                3.Payment method
              </Typography>
            </Grid>
             
     <FormControl>
      
      <RadioGroup row defaultValue='offline' aria-label='payment' name='customized-radios'>
        <FormControlLabel value='offline' control={<BpRadio />} label='Offline' />
        
        <FormControlLabel value='card' disabled control={<BpRadio />} label='Card' />
      </RadioGroup>
    </FormControl>
             
        
            
           
            
           
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => setdata()}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
     
      {data?.popularPlan ? (
        <CustomChip
          skin='light'
          size='small'
          label='Popular'
          color='primary'
          sx={{
            top: 16,
            right: 24,
            position: 'absolute',
            '& .MuiChip-label': {
              px: 2.5,
              fontSize: '0.8125rem'
            }
          }}
        />
      ) : null}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <img
          width={data?.imgWidth}
          src={`${data?.imgSrc}`}
          height={data?.imgHeight}
          alt={`${data?.title.toLowerCase()}-plan-img`}
        />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          {data?.title}
        </Typography>
        <Typography variant='body2'>{data?.subtitle}</Typography>
        <Box sx={{ mt: 5, mb: 10, position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant='body2' sx={{ mt: 1.6, alignSelf: 'flex-start' }}>
              $
            </Typography>
            <Typography variant='h3' sx={{ fontWeight: 500, color: 'primary.main', lineHeight: 1.17 }}>
              {plan === 'monthly' ? data?.monthlyPrice : data?.yearlyPlan.perMonth}
            </Typography>
            <Typography variant='body2' sx={{ mb: 1.6, alignSelf: 'flex-end' }}>
              /month
            </Typography>
          </Box>
          {plan !== 'monthly' && data?.monthlyPrice !== 0 ? (
            <Typography
              variant='body2'
              sx={{ left: 0, right: 0, position: 'absolute' }}
            >{`USD ${data?.yearlyPlan.totalAnnual}/year`}</Typography>
          ) : null}
        </Box>
      </Box>
      <BoxFeature>{renderFeatures()}</BoxFeature>
      <Button
        fullWidth
        color={data?.currentPlan ? 'success' : 'primary'}
        variant={data?.popularPlan ? 'contained' : 'outlined'}
        onClick={() => setShow(true)}
      >
        {data?.currentPlan ? 'Your Current Plan' : 'Select'}
      </Button>
    </BoxWrapper>
  )
}

export default PlanDetails
