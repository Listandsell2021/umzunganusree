



// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
// ** Icons Imports
import CircleOutline from 'mdi-material-ui/CircleOutline'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'


import { useState,forwardRef } from 'react'



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

const PlanDetails = props => {
  // ** Props
  const { plan, data } = props
  
 const [show, setShow] = useState(false)
  const [title, settitle] = useState(data?.title)
  const [plan_id, setplan_id] = useState(data?.plan_id)
  const [monthlyPrice,setmonthlyPrice] = useState(data?.monthlyPrice)
  const [subtitle,setsubtitle] = useState(data?.subtitle)
  const [perMonth,setperMonth] = useState(data?.yearlyPlan.perMonth)
  const [totalAnnual, settotalAnnual] = useState(data?.yearlyPlan.totalAnnual)
  const [planBenefits1, setplanBenefits1] = useState(data?.planBenefits[0])
  const [planBenefits2, setplanBenefits2] = useState(data?.planBenefits[1])
  const [planBenefits3, setplanBenefits3] = useState(data?.planBenefits[2])
  const [planBenefits4, setplanBenefits4] = useState(data?.planBenefits[3])
  const [planBenefits5, setplanBenefits5] = useState(data?.planBenefits[4])
  const [status, setStatus] = useState("active")
  const [languages, setLanguages] = useState([])

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
  var monthval=parseInt(e.target.value)
    
    setperMonth(e.target.value)
    settotalAnnual(monthval*12)
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
  const handleChangeBenifits5 = e => {
    setplanBenefits5(e.target.value)
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
  var datanew=
  {
  
    
    "title":title,
    "monthlyPrice":parseInt(monthlyPrice),
    "subtitle":subtitle,
    "imgSrc":"/images/pages/pricing-illustration-1.png",
    "yearlyPlan":
    {"perMonth":parseInt(perMonth),
    "totalAnnual":totalAnnual
    },
    "planBenefits":
    [planBenefits1,
    planBenefits2,
    planBenefits3,
    planBenefits4,
    planBenefits5],
   "plan_id":plan_id
  }  
  

  const response = await axios.post('http://localhost:3000/api/updatePackageSuperAdmin', {
    datanew
  })
  
  console.log(response.status)
  window.location.reload(false);

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
              Edit Package 
            </Typography>
            <Typography variant='body2'>Updating package</Typography>
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
            <Grid item sm={6} xs={12}>
              <TextField fullWidth label='Plan Benifits 5' placeholder='5.Benifits' onChange={handleChangeBenifits5} value={planBenefits5} />
            </Grid>
             
        
            
           
            
           
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
     <Button variant='contained' onClick={() => setShow(true)}>
          Edit
        </Button>
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
              €
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
            >{`EUR ${data?.yearlyPlan.totalAnnual}/year`}</Typography>
          ) : null}
        </Box>
      </Box>
      <BoxFeature>{renderFeatures()}</BoxFeature>
      {/* <Button
        fullWidth
        color={data?.currentPlan ? 'success' : 'primary'}
        variant={data?.popularPlan ? 'contained' : 'outlined'}
      >
        {data?.currentPlan ? 'Your Current Plan' : 'Upgrade'}
      </Button> */}
    </BoxWrapper>
  )
}

export default PlanDetails
