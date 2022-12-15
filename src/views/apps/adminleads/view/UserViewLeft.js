

// ** React Imports
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { useRouter } from "next/router";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import InputAdornment from "@mui/material/InputAdornment";
import LinearProgress from "@mui/material/LinearProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import DialogContentText from "@mui/material/DialogContentText";

// ** Icons Imports
import Check from "mdi-material-ui/Check";
import Circle from "mdi-material-ui/Circle";
import StarOutline from "mdi-material-ui/StarOutline";

// ** Custom Components
import CustomChip from "src/@core/components/mui/chip";
import CustomAvatar from "src/@core/components/mui/avatar";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

import { updateUser } from "src/store/apps/user";
import data from "src/@fake-db/components/data";
// ** Styled <sup> component
const Sup = styled("sup")(({ theme }) => ({
  top: "0.2rem",
  left: "-0.6rem",
  position: "absolute",
  color: theme.palette.primary.main,
}));

// ** Styled <sub> component
const Sub = styled("sub")({
  fontWeight: 400,
  fontSize: ".875rem",
  lineHeight: "1.25rem",
  alignSelf: "flex-end",
});

const roleColors = {
  admin: "error",
  editor: "info",
  author: "warning",
  maintainer: "success",
  subscriber: "primary",
};

const statusColors = {
  active: "success",
  pending: "warning",
  inactive: "secondary",
};

const UserViewLeft = ({ data }) => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false);
  const [openPlans, setOpenPlans] = useState(false);
  const [company_name, setcompany_name] = useState(data.company_name);
  const [email, setemail] = useState(data.email);
  const [address, setaddress] = useState(data.address);
  const [contact, setcontact] = useState(data.contact);
  const [full_name, setfull_name] = useState(data.full_name);
  const [username, setusername] = useState(data.username);
  const [status, setstatus] = useState(data.status);
  const router = useRouter();
  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true);
  const handlePlansClose = () => setOpenPlans(false);

  const handleemail = useCallback((e) => {
    setemail(e.target.value);
  }, []);
  const handleaddress = useCallback((e) => {
    setaddress(e.target.value);
  }, []);
  const handlecontact = useCallback((e) => {
    setcontact(e.target.value);
  }, []);
  const handlefull_name = useCallback((e) => {
    setfull_name(e.target.value);
  }, []);
  const handleusername = useCallback((e) => {
    setusername(e.target.value);
  }, []);
  const handlestatus = useCallback((e) => {
    setstatus(e.target.value);
  }, []);
  async function updateUsers() {
    var datanew = {
      sa_id: "sa1",
      a_id: data.a_id,

      address: address,
      token: "1233335555555555",
      contact: contact,
      full_name: full_name,
      status: status,
      email: email,
      username: username,
      company_name: company_name,
    };
    console.log("datas");
    console.log(datanew);

    const response = await axios.post("http://localhost:3000/api/updateAdminlist", {
      datanew,
    });
    console.log(response);
    handleEditClose();
    var a_idnew = String(data.a_id).substring(1);
    window.location.reload(false);
    //router.replace('/apps/user/view/'+a_idnew+"/")
  }
  const renderUserAvatar = () => {
    if (data) {
      if (data.avatar.length) {
        return (
          <CustomAvatar
            alt="User Image"
            src={data.avatar}
            variant="rounded"
            sx={{ width: 120, height: 120, mb: 4 }}
          />
        );
      } else {
        return (
          <CustomAvatar
            skin="light"
            variant="rounded"
            color={data.avatarColor}
            sx={{
              width: 120,
              height: 120,
              fontWeight: 600,
              mb: 4,
              fontSize: "3rem",
            }}
          >
            {getInitials(data.fullName)}
          </CustomAvatar>
        );
      }
    } else {
      return null;
    }
  };
  if (data) {
    const [plan, setplan] = useState("");

    const getPackages = async () => {
      const response = await axios.post("http://localhost:3000/api/getPackageSuperAdminbyId", {
        id: data.currentPlan,
      });
      var datas = response.data;

      if (datas.length == 0) {
        datas = "";
      } else {
        datas = datas[0];
      }
      return datas;
    };

    getPackages().then((datas) => {
      if (datas) {
        setplan(datas);
      }
    });
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent
              sx={{
                pt: 15,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {/* {renderUserAvatar()} */}
              <Typography variant="h6" sx={{ mb: 1 }}>
                {data.client_details.full_name}
                
              </Typography>
              <Typography variant="h9" sx={{ mb: 1 }}>
                #{data.c_id}
              </Typography>
              {/* <CustomChip
                skin="light"
                size="small"
                label={data.role}
                color={roleColors[data.role]}
                sx={{
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  textTransform: "capitalize",
                  "& .MuiChip-label": { mt: -0.25 },
                }}
              /> */}
            </CardContent>

            {/*<CardContent sx={{ my: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 6, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
                    <Check />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h5' sx={{ lineHeight: 1.3 }}>
                      1.23k
                    </Typography>
                    <Typography variant='body2'>Task Done</Typography>
              </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
                    <StarOutline />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h5' sx={{ lineHeight: 1.3 }}>
                      568
                    </Typography>
                    <Typography variant='body2'>Project Done</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>*/}

            <CardContent>
              <Typography variant="h6" color="#666cff">
                Details
              </Typography>
              <Divider
                sx={{ mt: 4, borderBottomWidth: 1, bgcolor: "#666cff" }}
              />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: "flex", mb: 2.7 }}>
                  <Typography
                    variant="h8"
                    color="#666cff"
                    sx={{ mr: 2, fontWeight: "bold" }}
                  >
                    Email:
                  </Typography>
                  <Typography variant="body2">
                    {data.client_details.email}
                  </Typography>
                </Box>
                {/* address */}
                <Box sx={{ display: "flex", mb: 2.7 }}>
                  <Typography
                    variant="h8"
                    color="#666cff"
                    sx={{ mr: 2, fontWeight: "bold" }}
                  >
                    Umzung Address:
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    From Address:
                  </Typography>
                  <Typography variant="body2">
                    {data.from_address.street_name} {data.from_address.postcode}{" "}
                    {data.from_address.city}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    To Address:
                  </Typography>
                  <Typography variant="body2">
                    {data.to_address.street_name} {data.to_address.postcode}{" "}
                    {data.to_address.city}
                  </Typography>
                </Box>
                <Divider sx={{ mt: 4, borderBottomWidth: 5 }} />
                {/* Umzung Dates */}
                <Box sx={{ display: "flex", mb: 2.7 }}>
                  <Typography
                    variant="h8"
                    color="#666cff"
                    sx={{ mr: 2, fontWeight: "bold" }}
                  >
                    Umzung Date:
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Type:
                  </Typography>
                  <Typography variant="body2">
                    {data.moving_dates.moving_date_type}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    From:
                  </Typography>
                  <Typography variant="body2">
                    {data.moving_dates.from}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Until:
                  </Typography>
                  <Typography variant="body2">
                    {data.moving_dates.to}
                  </Typography>
                </Box>
                <Divider sx={{ mt: 4, borderBottomWidth: 5 }} />
                <Box sx={{ display: "flex", mb: 2.7 }}>
                  <Typography
                    variant="h8"
                    color="#666cff"
                    sx={{ mr: 2, fontWeight: "bold" }}
                  >
                    Umzung Details:
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 3.7, ml: 2.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 2, color: "text.primary", fontWeight: "bold" }}
                  >
                    From Details:
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Living Type:
                  </Typography>
                  <Typography variant="body2">
                    {data.from_details.living_type}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Living Space:
                  </Typography>
                  <Typography variant="body2">
                    {data.from_details.living_space}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Persons:
                  </Typography>
                  <Typography variant="body2">
                    {data.from_details.persons}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Pack Boxes:
                  </Typography>
                  <Typography variant="body2">
                    {data.from_details.packboxes}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Floor:
                  </Typography>
                  <Typography variant="body2">
                    {data.from_details.floor}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Footpath:
                  </Typography>
                  <Typography variant="body2">
                    {data.from_details.footpath}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Stops:
                  </Typography>
                  <Typography variant="body2">
                    {data.from_details.no_stops}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 3.7, ml: 2.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 2, color: "text.primary", fontWeight: 600 }}
                  >
                    Elevator:
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 5.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Elevator Type:
                  </Typography>
                  <Typography variant="body2">
                    {data.from_details.elevator.elevator_type}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 5.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Weight:
                  </Typography>
                  <Typography variant="body2">
                    {data.from_details.elevator.weight}
                  </Typography>
                </Box>
                <Divider sx={{ mt: 4 }} />
                {/* to details*/}
                <Box sx={{ display: "flex", mb: 3.7, ml: 2.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 2, color: "text.primary", fontWeight: "bold" }}
                  >
                    To Details:
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Living Type:
                  </Typography>
                  <Typography variant="body2">
                    {data.to_details.living_type}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Living Space:
                  </Typography>
                  <Typography variant="body2">
                    {data.to_details.living_space}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Floor:
                  </Typography>
                  <Typography variant="body2">
                    {data.to_details.floor}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Footpath:
                  </Typography>
                  <Typography variant="body2">
                    {data.to_details.footpath}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 4.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Stops:
                  </Typography>
                  <Typography variant="body2">
                    {data.to_details.no_stops}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 3.7, ml: 2.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 2, color: "text.primary", fontWeight: "bold" }}
                  >
                    Elevator:
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 5.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Elevator Type:
                  </Typography>
                  <Typography variant="body2">
                    {data.to_details.elevator.elevator_type}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: 2.7, ml: 5.7 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, color: "text.primary" }}
                  >
                    Weight:
                  </Typography>
                  <Typography variant="body2">
                    {data.to_details.elevator.weight}
                  </Typography>
                </Box>
                <Divider sx={{ mt: 4, borderBottomWidth: 5 }} />
                {/*finish details */}
                <Box sx={{ display: "flex", mb: 2.7 }}>
                  <Typography
                    variant="subtitle2"
                    color="#666cff"
                    sx={{ mr: 2 }}
                  >
                    Status:
                  </Typography>
                  <CustomChip
                    skin="light"
                    size="small"
                    label={data.status}
                    color={statusColors[data.status]}
                    sx={{
                      height: 20,
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      borderRadius: "5px",
                      textTransform: "capitalize",
                    }}
                  />
                </Box>
                
                {/* <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Language:</Typography>
                  <Typography variant='body2'>English</Typography>
                </Box> */}
                {/* <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Country:</Typography>
                  <Typography variant='body2'>{data.country}</Typography>
                </Box> */}
              </Box>
            </CardContent>

            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{ mr: 2 }}
                onClick={handleEditClickOpen}
              >
                Edit
              </Button>
              <Button color="error" variant="outlined">
                Suspend
              </Button>
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby="user-view-edit"
              sx={{
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: 650,
                  p: [2, 10],
                },
              }}
              aria-describedby="user-view-edit-description"
            >
              <DialogTitle
                id="user-view-edit"
                sx={{ textAlign: "center", fontSize: "1.5rem !important" }}
              >
                Edit User Information
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  variant="body2"
                  id="user-view-edit-description"
                  sx={{ textAlign: "center", mb: 7 }}
                >
                  Updating user details.
                </DialogContentText>
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={full_name}
                        onChange={(e) => setfull_name(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Username"
                        value={data.username}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                          ),
                        }}
                        onChange={(e) => setusername(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="user-view-status-label">
                          Status
                        </InputLabel>
                        <Select
                          label="Status"
                          value={status}
                          id="user-view-status"
                          labelId="user-view-status-label"
                          onChange={(e) => setstatus(e.target.value)}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/*<Grid item xs={12} sm={6}>
                      <TextField fullWidth label='TAX ID' defaultValue='Tax-8894' />
              </Grid>*/}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Contact"
                        value={contact}
                        onChange={(e) => setcontact(e.target.value)}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-language-label'>Language</InputLabel>
                        <Select
                          label='Language'
                          defaultValue='English'
                          id='user-view-language'
                          labelId='user-view-language-label'
                        >
                          <MenuItem value='English'>English</MenuItem>
                          <MenuItem value='Spanish'>Spanish</MenuItem>
                          <MenuItem value='Portuguese'>Portuguese</MenuItem>
                          <MenuItem value='Russian'>Russian</MenuItem>
                          <MenuItem value='French'>French</MenuItem>
                          <MenuItem value='German'>German</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Company Name"
                        value={company_name}
                        onChange={(e) => setcompany_name(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Address"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                      <FormControlLabel
                        label='Use as a billing address?'
                        control={<Switch defaultChecked />}
                        sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                      />
                    </Grid> */}
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{ mr: 1 }}
                  onClick={updateUsers}
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleEditClose}
                >
                  Discard
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card
            sx={{
              boxShadow: "none",
              border: (theme) => `2px solid ${theme.palette.primary.main}`,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexWrap: "wrap",
                pb: "0 !important",
                justifyContent: "space-between",
              }}
            >
              <CustomChip
                skin="light"
                size="small"
                color="primary"
                label={plan.title}
                sx={{ fontSize: "0.75rem", borderRadius: "4px" }}
              />
              <Box sx={{ display: "flex", position: "relative" }}>
                <Sup>€</Sup>
                <Typography
                  variant="h3"
                  sx={{
                    mb: -1.2,
                    lineHeight: 1,
                    color: "primary.main",
                  }}
                >
                  {plan.monthlyPrice}
                </Typography>
                <Sub>/ month</Sub>
              </Box>
            </CardContent>
            <CardContent></CardContent>

            {/* <CardContent>
              <Box sx={{ mt: 6, mb: 6 }}>
                <Box sx={{ display: 'flex', mb: 2.5, alignItems: 'center' }}>
                  <Circle sx={{ mr: 2, fontSize: '0.625rem', color: 'grey.300' }} />
                  <Typography component='span' variant='body2'>
                    10 Users
                  </Typography>
                </Box>
                <Box sx={{ mt: 3.5, display: 'flex', mb: 2.5, alignItems: 'center' }}>
                  <Circle sx={{ mr: 2, fontSize: '0.625rem', color: 'grey.300' }} />
                  <Typography component='span' variant='body2'>
                    Up to 10GB storage
                  </Typography>
                </Box>
                <Box sx={{ mt: 3.5, display: 'flex', mb: 2.5, alignItems: 'center' }}>
                  <Circle sx={{ mr: 2, fontSize: '0.625rem', color: 'grey.300' }} />
                  <Typography component='span' variant='body2'>
                    Basic Support
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', mb: 1.5, justifyContent: 'space-between' }}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  Days
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.secondary' }}>
                  26 of 30 Days
                </Typography>
              </Box>
              <LinearProgress value={86.66} variant='determinate' sx={{ height: 8, borderRadius: '5px' }} />
              <Typography variant='caption' sx={{ mt: 1.5, mb: 6 }}>
                4 days remaining
              </Typography>
              <Button variant='contained' sx={{ width: '100%' }} onClick={handlePlansClickOpen}>
                Upgrade Plan
              </Button>
            </CardContent> */}

            <Dialog
              open={openPlans}
              onClose={handlePlansClose}
              aria-labelledby="user-view-plans"
              aria-describedby="user-view-plans-description"
              sx={{
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: 650,
                  pt: 8,
                  pb: 8,
                },
              }}
            >
              <DialogTitle
                id="user-view-plans"
                sx={{ textAlign: "center", fontSize: "1.5rem !important" }}
              >
                Upgrade Plan
              </DialogTitle>

              <DialogContent>
                <DialogContentText
                  variant="body2"
                  sx={{ textAlign: "center" }}
                  id="user-view-plans-description"
                >
                  Choose the best plan for the user.
                </DialogContentText>
              </DialogContent>

              <DialogContent
                sx={{
                  display: "flex",
                  pb: 8,
                  pl: [6, 15],
                  pr: [6, 15],
                  alignItems: "center",
                  flexWrap: ["wrap", "nowrap"],
                  pt: (theme) => `${theme.spacing(2)} !important`,
                }}
              >
                <FormControl
                  fullWidth
                  size="small"
                  sx={{ mr: [0, 3], mb: [3, 0] }}
                >
                  <InputLabel id="user-view-plans-select-label">
                    Choose Plan
                  </InputLabel>
                  <Select
                    label="Choose Plan"
                    defaultValue="Standard"
                    id="user-view-plans-select"
                    labelId="user-view-plans-select-label"
                  >
                    <MenuItem value="Basic">Basic - $0/month</MenuItem>
                    <MenuItem value="Standard">Standard - $99/month</MenuItem>
                    <MenuItem value="Enterprise">
                      Enterprise - $499/month
                    </MenuItem>
                    <MenuItem value="Company">Company - $999/month</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" sx={{ minWidth: ["100%", 0] }}>
                  Upgrade
                </Button>
              </DialogContent>

              <Divider sx={{ m: 0 }} />

              <DialogContent sx={{ pt: 8, pl: [6, 15], pr: [6, 15] }}>
                <Typography
                  sx={{ fontWeight: 500, mb: 2, fontSize: "0.875rem" }}
                >
                  User current plan is standard plan
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: ["wrap", "nowrap"],
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      mr: 3,
                      display: "flex",
                      ml: 2.4,
                      position: "relative",
                    }}
                  >
                    <Sup>€</Sup>
                    <Typography
                      variant="h3"
                      sx={{
                        mb: -1.2,
                        lineHeight: 1,
                        color: "primary.main",
                        fontSize: "3rem !important",
                      }}
                    >
                      99
                    </Typography>
                    <Sub>/ month</Sub>
                  </Box>
                  <Button color="error" variant="outlined" sx={{ mt: 2 }}>
                    Cancel Subscription
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default UserViewLeft;
