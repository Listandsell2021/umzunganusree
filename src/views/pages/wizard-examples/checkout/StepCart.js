// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AlertTitle from '@mui/material/AlertTitle'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { useState, useEffect } from "react";
// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const StyledList = styled(List)(({ theme }) => ({
  padding: 0,
  '& .MuiListItem-root': {
    padding: theme.spacing(5),
    border: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': {
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6
    },
    '&:last-of-type': {
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6
    },
    '&:not(:last-of-type)': {
      borderBottom: 0
    },
    '& .MuiListItemText-root': {
      marginTop: 0,
      marginBottom: theme.spacing(4),
      '& .MuiTypography-root': {
        fontWeight: 500
      }
    },
    '& .remove-item': {
      top: '0.5rem',
      right: '0.625rem',
      position: 'absolute',
      color: theme.palette.text.disabled
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

const StepCart = ({ handleNext,data }) => {
  
  const breakpointMD = useMediaQuery(theme => theme.breakpoints.between('sm', 'lg'))
   const [fullname,setfullname]=useState('');
   const [email, setemail] = useState("");
   const [Phone_no, setPhone_no] = useState("");
   
   useEffect(() => {
     
     if (data) {
       setfullname(data.client_details.full_name);
       setemail(data.client_details.email);
       setPhone_no(data.client_details.Phone_no);
     }
   }, [data]);
   
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8}>
        {/* <Alert
          severity="success"
          icon={<Icon icon="mdi:tag-outline" />}
          sx={{ mb: 4 }}
        >
          <AlertTitle>Available Offers</AlertTitle>
          <div>
            <Typography sx={{ color: "success.main" }}>
              - 10% Instant Discount on Bank of America Corp Bank Debit and
              Credit cards
            </Typography>
            <Typography sx={{ color: "success.main" }}>
              - 25% Cashback Voucher of up to $60 on first ever PayPal
              transaction. TCA
            </Typography>
          </div>
        </Alert> */}
        <Typography variant="h6" sx={{ mb: 4 }}>
          Details
        </Typography>
        <Box
          sx={{
            borderRadius: 1,
            p: 5,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            sx={{
              mb: 7,
            }}
          >
            <TextField
              sx={{
                mr: 5,
              }}
              value={fullname}
              label="First Name"
              onChange={(e) => setfullname(e.target.value)}
              placeholder="John Doe"
            />

            <TextField
              value={email}
              label="E-mail"
              onChange={(e) => setemail(e.target.value)}
              placeholder="abc@umzung.de"
            />
          </Box>
          <Box
            sx={{
              mt: 1,
            }}
          >
            <TextField
              value={Phone_no}
              label="Phone no"
              onChange={(e) => setPhone_no(e.target.value)}
              placeholder="12345"
            />
          </Box>
        </Box>

        {/* <Box
          sx={{
            px: 5,
            gap: 2,
            py: 2.5,
            mt: 3,
            display: "flex",
            borderRadius: 1,
            alignItems: "center",
            justifyContent: "space-between",
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            href=""
            component={MuiLink}
            onClick={(e) => e.preventDefault()}
            sx={{ color: "primary.main" }}
          >
            Add more products from wishlist
          </Typography>
          <Icon icon="mdi:chevron-right" />
        </Box> */}
      </Grid>
      {/* <Grid item xs={12} lg={4}>
        <Box
          sx={{
            mb: 4,
            borderRadius: 1,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <CardContent>
            <Typography sx={{ mb: 4, fontWeight: 600 }}>Offer</Typography>
            <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
              <TextField
                fullWidth
                sx={{ mr: 4 }}
                size="small"
                placeholder="Enter Promo Code"
              />
              <Button variant="outlined">Apply</Button>
            </Box>
            <Box
              sx={{ p: 4, borderRadius: 1, backgroundColor: "action.hover" }}
            >
              <Typography sx={{ mb: 2, fontWeight: 600 }}>
                Buying gift for a loved one?
              </Typography>
              <Typography sx={{ mb: 2, color: "text.secondary" }}>
                Gift wrap and personalized message on card, Only for $2.
              </Typography>
              <Typography
                href="/"
                variant="body2"
                component={MuiLink}
                onClick={(e) => e.preventDefault()}
                sx={{ color: "primary.main", fontWeight: 600 }}
              >
                Add a gift wrap
              </Typography>
            </Box>
          </CardContent>
          <Divider sx={{ my: "0 !important" }} />
          <CardContent>
            <Typography sx={{ mb: 4, fontWeight: 600 }}>
              Price Details
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  Bag Total
                </Typography>
                <Typography variant="body2">$1198.00</Typography>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  Coupon Discount
                </Typography>
                <Typography
                  href="/"
                  variant="body2"
                  component={MuiLink}
                  onClick={(e) => e.preventDefault()}
                  sx={{
                    display: "block",
                    fontWeight: 600,
                    color: "primary.main",
                  }}
                >
                  Apply Coupon
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  Order Total
                </Typography>
                <Typography variant="body2">$1198.00</Typography>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  Delivery Charges
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mr: 2,
                      textDecoration: "line-through",
                      color: "text.disabled",
                    }}
                  >
                    $5.00
                  </Typography>
                  <CustomChip
                    size="small"
                    skin="light"
                    color="success"
                    label="Free"
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>
          <Divider sx={{ my: "0 !important" }} />
          <CardContent
            sx={{ py: (theme) => `${theme.spacing(3.5)} !important` }}
          >
            <Box
              sx={{
                gap: 2,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>Total</Typography>
              <Typography sx={{ fontWeight: 600 }}>$1198.00</Typography>
            </Box>
          </CardContent>
        </Box>
        <Box
          sx={{
            display: "flex",
            ...(breakpointMD ? { justifyContent: "flex-end" } : {}),
          }}
        >
          <Button
            fullWidth={!breakpointMD}
            variant="contained"
            onClick={handleNext}
          >
            Place Order
          </Button>
        </Box>
      </Grid> */}
    </Grid>
  );
}

export default StepCart
