// ** React Imports
import { useState,forwardRef } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import MuiCardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'



import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
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

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
// ** Third Party Imports
import axios from 'axios'

// ** Demo Imports
import PricingCTA from 'src/views/pages/plan/PricingCTA'
import PricingPlans from 'src/views/pages/plan/PricingPlans'
import PricingHeader from 'src/views/pages/plan/PricingHeader'
import PricingFooter from 'src/views/pages/plan/PricingFooter'

import AccountOutline from 'mdi-material-ui/AccountOutline'
const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})
// ** Styled Components
const CardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: theme.spacing(20, 35, 35),
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(12.5, 20, 20)
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(10, 5)
  }
}))

const Pricing = ({ apiData }) => {
  // ** States
  const [plan, setPlan] = useState('monthly')
  const [show, setShow] = useState(false)
  const [title, settitle] = useState("")
  const [monthlyPrice,setmonthlyPrice] = useState("")
  const [subtitle,setsubtitle] = useState("")
  const [perMonth,setperMonth] = useState("")
  const [totalAnnual, settotalAnnual] = useState("")
  const [planBenefits1, setplanBenefits1] = useState("")
  const [planBenefits2, setplanBenefits2] = useState("")
  const [planBenefits3, setplanBenefits3] = useState("")
  const [planBenefits4, setplanBenefits4] = useState("")
  const [status, setStatus] = useState("")
  const [languages, setLanguages] = useState([])
  const handleChange = e => {
    if (e.target.checked) {
      setPlan('annually')
    } else {
      setPlan('monthly')
    }
  }

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
  const handleChangeBenifits1 = e => {
    setplanBenefits1(e.target.value)
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

  
  return (
    <Card>
      <CardContent>
        <PricingHeader plan={plan} handleChange={handleChange} />
        <PricingPlans plan={plan} data={apiData} />
        
      </CardContent>
      
      <PricingCTA />
      {/* <PricingFooter data={apiData} /> */}
      
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
              Edit User Information
            </Typography>
            <Typography variant='body2'>Updating user details will receive a privacy audit.</Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth label='Plan Title' placeholder='Basic' onChange={handleChangeTitle} value={title} />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth value={monthlyPrice}  onChange={handleChangePlanPrice}  label='Plan Price' placeholder='Doe' />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth value={subtitle}  onChange={handleChangeSubTitle} label='Sub Title' placeholder='johnDoe' />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth

                label='Per Month Price for yearly'
                placeholder='johnDoe@email.com'
                value={perMonth}
                onChange={handleChangePerMonthPriceUYearly}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='status-select'>Status</InputLabel>
                <Select value={status} fullWidth labelId='status-select'  onChange={handleChangeStatus} label='Status'>
                  <MenuItem value='Status'>Status</MenuItem>
                  <MenuItem value='Active'>Active</MenuItem>
                  <MenuItem value='Inactive'>Inactive</MenuItem>
                  <MenuItem value='Suspended'>Suspended</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth label='Annual price' placeholder='878' onChange={handleChangeAnnualPrice} value={totalAnnual} />
            </Grid>
             <Grid item sm={6} xs={12}>
              <TextField fullWidth label='Plan Benifits 1' placeholder='1.Benifits'  onChange={handleChangeBenifits1} value={planBenefits1} />
            </Grid>
             <Grid item sm={6} xs={12}>
              <TextField fullWidth label='Plan Benifits 2' placeholder='2.Benifits'  onChange={handleChangeBenifits2} value={planBenefits2} />
            </Grid>
             <Grid item sm={6} xs={12}>
              <TextField fullWidth label='Plan Benifits 3' placeholder='3.Benifits' onChange={handleChangeBenifits3} value={planBenefits3} />
            </Grid>
             <Grid item sm={6} xs={12}>
              <TextField fullWidth label='Plan Benifits 4' placeholder='4.Benifits' onChange={handleChangeBenifits4} value={planBenefits4} />
            </Grid>
             
        
            
           
            
           
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => setShow(false)}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export const getServerSideProps = async () => {
  
  const res1 = await axios.post('http://localhost:3000/api/getPackageSuperAdmin')
  //const apiData = res.data
  var apiData=res1.data
 // console.log(apiData)
 
  //console.log(apiData2[0])
  return {
    props: {
      apiData
    }
  }
}

export default Pricing
