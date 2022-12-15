// ** React Imports
import { useState,useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiStepper from '@mui/material/Stepper'
import axios from "axios";

import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Step Components
import StepCart from 'src/views/pages/wizard-examples/checkout/StepCart'
import StepAddress from 'src/views/pages/wizard-examples/checkout/StepAddress'
import StepPayment from 'src/views/pages/wizard-examples/checkout/StepPayment'
import StepConfirmation from 'src/views/pages/wizard-examples/checkout/StepConfirmation'
import UsersInvoiceListTable from "src/views/apps/adminleads/view/UsersInvoiceListTable";

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'

const steps = [
  {
    title: "User Details",

    icon: "/images/icons/project-icons/user.png",
  },
  {
    title: "Address",
    icon: "/images/icons/project-icons/deliver.png",
  },
  {
    title: "Relocation Info",
    icon: "/images/icons/project-icons/move.png",
  },
  {
    title: "Moveing material",
    icon: "/images/icons/project-icons/furnitures.png",
  },
  {
    title: "Moveing Services",
    icon: "/images/icons/project-icons/open-box.png",
  },
];

const Stepper = styled(MuiStepper)(({ theme }) => ({
  margin: 'auto',
  maxWidth: 800,
  justifyContent: 'space-around',
  '& .MuiStep-root': {
    cursor: 'pointer',
    textAlign: 'center',
    paddingBottom: theme.spacing(8),
    '& .step-title': {
      fontSize: '1rem'
    },
    '&.Mui-completed + svg': {
      color: theme.palette.primary.main
    },
    '& + svg': {
      display: 'none',
      color: theme.palette.text.disabled
    },
    '& .MuiStepLabel-label': {
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'center',
      svg: {
        marginRight: theme.spacing(1.5),
        fill: theme.palette.text.primary
      },
      '&.Mui-active, &.Mui-completed': {
        '& .MuiTypography-root': {
          color: theme.palette.primary.main
        },
        '& svg': {
          fill: theme.palette.primary.main
        }
      }
    },
    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
      '& + svg': {
        display: 'block'
      },
      '& .MuiStepLabel-label': {
        display: 'block'
      }
    }
  }
}))

const CheckoutWizard = ({id}) => {
  // ** States
  const [activeStep, setActiveStep] = useState(0)

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handleClickScroll = (index ) => {
    
    if(index==3 )
    {
      setActiveStep(index)
    }
     else if (index == 4)
     {
       setActiveStep(index);
     } else {
       setActiveStep(0);
       const element = document.getElementById(String(index));

       if (element) {
         // 👇 Will scroll smoothly to the top of the next section
         element.scrollIntoView({ behavior: "smooth" });
       }
     }
    
  };

  const getStepContent = step => {
    const [fullname, setfullname] = useState("");
    const [email, setemail] = useState("");
    const [Phone_no, setPhone_no] = useState("");
     const [data, setData] = useState([]);
     const [productdata, setproductdata] = useState([]);
     const [loaddata, setloaddata] = useState(false);
     

     useEffect(() => {
       var ids = { id: "c" + id };
       

       axios
         .post("http://localhost:3000/api/getLeadAdminbyid", { ids })
         .then((response) => {
           setData(response.data[0]);
           setloaddata(true);
         })
         .catch(() => {
           setData(null);
            setloaddata(false);
         });

       {
         var storedData = window.localStorage.getItem("userData");

       storedData = JSON.parse(storedData);
       var ids = { id: storedData.id };
       axios
         .post("http://localhost:3000/api/getProductbyAdmin", { ids })
         .then((response) => {
           setproductdata(response.data);
           console.log(response.data);
         })
         .catch(() => {
           setData(null);
         });
       }
     }, []);

    useEffect(() => {
      if (data.length != 0) {
        setfullname(data.client_details.full_name);
        setemail(data.client_details.email);
      setPhone_no(data.client_details.Phone_no);









      }
    }, [loaddata]);
    switch (step) {
      /*******  user Details view */

      case 0:
        return (
          <Grid sx={{}}>
            <Grid id={"0"}>
              <Grid lg={8}>
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
                      label="Name"
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
              </Grid>
            </Grid>

            {/* Addressss */}

            <Divider sx={{ mt: 7 }} />
            <Typography variant="h6" sx={{ mt: 6 }}>
              Address
            </Typography>
            <Grid id={"1"} container spacing={8} sx={{ mt: 1 }}>
              <Grid item xs={16} lg={6}>
                <Box
                  sx={{
                    borderRadius: 1,
                    p: 5,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 4 }}>
                    Move - Out address
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                    }}
                  >
                    <TextField
                      value={Phone_no}
                      label="Street name"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="asbestweg"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={Phone_no}
                      label="Postcode"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 6,
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
              </Grid>
              <Grid item xs={16} lg={6}>
                <Box
                  sx={{
                    borderRadius: 1,
                    p: 5,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 4 }}>
                    Move - In address
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                    }}
                  >
                    <TextField
                      value={Phone_no}
                      label="Street name"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="asbestweg"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={Phone_no}
                      label="Postcode"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 6,
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
              </Grid>
            </Grid>

            {/*relaocation */}

            <Divider sx={{ mt: 7 }} />
            <Typography variant="h6" sx={{ mt: 6 }}>
              Relocation Info
            </Typography>
            <Grid id={"2"} container spacing={8} sx={{ mt: 1 }}>
              <Grid item xs={16} lg={6}>
                <Box
                  sx={{
                    borderRadius: 1,
                    p: 5,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 4 }}>
                    Move - Out
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                    }}
                  >
                    <TextField
                      value={Phone_no}
                      label="Living Type"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="asbestweg"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={Phone_no}
                      label="Living Space"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <TextField
                      value={Phone_no}
                      label="Persons"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={Phone_no}
                      label="packboxes"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>

                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <TextField
                      value={Phone_no}
                      label="Floor"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={Phone_no}
                      label="Footpath"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <TextField
                      value={Phone_no}
                      label="Floor"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={Phone_no}
                      label="Stops"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>

                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 4 }}>
                      Elevator
                    </Typography>
                    <TextField
                      value={Phone_no}
                      label="Elevator Type"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={Phone_no}
                      label="weight"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={16} lg={6}>
                <Box
                  sx={{
                    borderRadius: 1,
                    p: 5,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 4 }}>
                    Move - Out
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                    }}
                  >
                    <TextField
                      value={Phone_no}
                      label="Living Type"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="asbestweg"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={Phone_no}
                      label="Living Space"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>

                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <TextField
                      value={Phone_no}
                      label="Floor"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={Phone_no}
                      label="Footpath"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <TextField
                      value={Phone_no}
                      label="Floor"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={Phone_no}
                      label="Stops"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>

                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 4 }}>
                      Elevator
                    </Typography>
                    <TextField
                      value={Phone_no}
                      label="Elevator Type"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={Phone_no}
                      label="weight"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
            {/*Moving Dates */}

            <Divider sx={{ mt: 7 }} />
            <Typography variant="h6" sx={{ mt: 6 }}>
              Moving Dates
            </Typography>
            <Grid id={"2"} container spacing={8} sx={{ mt: 1 }}>
              <Grid item xs={16} lg={6}>
                <Box
                  sx={{
                    borderRadius: 1,
                    p: 5,
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Box
                    sx={{
                      mt: 1,
                    }}
                  >
                    <TextField
                      value={Phone_no}
                      label="Moving Date Type"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="asbestweg"
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 6,
                    }}
                  >
                    <TextField
                      value={Phone_no}
                      label="From"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                    <TextField
                      sx={{
                        ml: 6,
                      }}
                      value={Phone_no}
                      label="To"
                      onChange={(e) => setPhone_no(e.target.value)}
                      placeholder="12345"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        );
      case 3:
       return <UsersInvoiceListTable productdata={productdata} />;
        
      default:
        return null;
    }
  }

  const renderContent = () => {
    return getStepContent(activeStep)
  }
const Img = styled("img")(({ theme }) => ({
  width: 56,
  height: 56,
  //borderRadius: "50%",
  marginRight: theme.spacing(3),
}));
  return (
    <Box>
      <Card
        sx={{
          top: 70,
          position: "sticky",
          zIndex: "tooltip",
          mb:7
        }}
      >
        <CardContent>
          <StepperWrapper>
            <Stepper
              activeStep={activeStep}
              connector={<Icon icon="mdi:chevron-right" />}
            >
              {steps.map((step, index) => {
                return (
                  <Step
                    key={index}
                    onClick={() => handleClickScroll(index)}
                    sx={{}}
                  >
                    <StepLabel icon={<></>}>
                      <Img src={step.icon} alt={"icon"} />
                      <Typography className="step-title">
                        {step.title}
                      </Typography>
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </StepperWrapper>
        </CardContent>

        <Divider sx={{ m: "0 !important", mt: 0 }} />
      </Card>
      <Card>
        <CardContent sx={{ mt: 0 }}>{renderContent()}</CardContent>
      </Card>
    </Box>
  );
}

export default CheckoutWizard
