// ** React Imports
import { useState, useEffect } from "react";
import axios from "axios";
// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import DialogTitle from "@mui/material/DialogTitle";
import AvatarGroup from "@mui/material/AvatarGroup";
import CardContent from "@mui/material/CardContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import FormHelperText from "@mui/material/FormHelperText";
import TableContainer from "@mui/material/TableContainer";
import FormControlLabel from "@mui/material/FormControlLabel";

// ** Third Party Imports
import { useForm, Controller } from "react-hook-form";

// ** Icons Imports
import ContentCopy from "mdi-material-ui/ContentCopy";
import InformationOutline from "mdi-material-ui/InformationOutline";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

const cardData = [
  { totalUsers: 2, title: "Administrator", avatars: [] },
  { totalUsers: 7, title: "Manager", avatars: [] },
  { totalUsers: 5, title: "Users", avatars: [] },
  { totalUsers: 3, title: "Support", avatars: [] },
  { totalUsers: 2, title: "Restricted User", avatars: [] },
];

const rolesArr = [
  "Dashboards",
  "Email",
  "Packages",
  "Subscription/Leads",
  "Roles & Permissions",
  "Invoice",
  "Products",
  "Service",
];

const RolesCards = () => {
  // ** States
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Add");
  const [cardDatas, setcardDatas] = useState([]);
  const [cardDatabyName, setcardDatabyName] = useState([]);
  const [refresh, setrefresh] = useState(true);
  const [Dashboard, setdashboard] = useState(false);
  const [Email, setEmail] = useState(false);
  const [Packages, setPackages] = useState(false);
  const [SubscriptionandLeads, setSubscriptionandLeads] = useState(false);
  const [RolesandPermissions, setRolesandPermissions] = useState(false);
  const [Invoice, setInvoice] = useState(false);
  const [Products, setProducts] = useState(false);
  const [Service, setService] = useState(false);

  useEffect(() => {
    async function getdata() {
      var storedData = window.localStorage.getItem("userData");
      storedData = JSON.parse(storedData);
      const response = await axios.post(
        "http://localhost:3000/api/getRoleData",
        {"id": storedData.id}
      );
      setcardDatas(response.data);
    }
    getdata();
    //console.log(cardDatas);
    setrefresh(false);
  }, [refresh]);

  // ** Hooks
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: "" } });
  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setValue("name", "");
  };

  const renderCards = () =>
    cardDatas.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2"></Typography>
              <AvatarGroup
                max={4}
                sx={{
                  "& .MuiAvatarGroup-avatar": { fontSize: ".875rem" },
                  "& .MuiAvatar-root, & .MuiAvatarGroup-avatar": {
                    width: 40,
                    height: 40,
                  },
                }}
              >
                {/* {item.avatars.map((img, index) => (
                  <Avatar key={index} alt={item.title} src={`/images/avatars/${img}`} />
                ))} */}
              </AvatarGroup>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                {item.title}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "primary.main", cursor: "pointer" }}
                onClick={() => {
                 
                    resetvalue(false);
                  
                  handleClickOpen();
                  setDialogTitle("Edit");
                  setcardDatabyName(item);
                }}
              >
                Edit Role
              </Typography>
              <IconButton size="small">
                <ContentCopy />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ));

  async function postRole(data, permissionsArray,dialogTitle) {
   var storedData = window.localStorage.getItem("userData");
   storedData = JSON.parse(storedData);
    if (dialogTitle=="Edit")
    {
    
     var  deleteRole = { "title": data.name,"global_id":storedData.id};
     console.log(deleteRole);
      const responsedelete = await axios.post(
        "http://localhost:3000/api/removeRole",
        {
          deleteRole,
        }
      );
      if (responsedelete.status == 200) {
        var datanew = {
          title: data.name,
          Permissions: permissionsArray,
          global_id: storedData.id
        };
        console.log(datanew);
        const response = await axios.post(
          "http://localhost:3000/api/postRole",
          {
            datanew,
          }
        );
        if (response.status == 200) {
          setrefresh(true);
          handleClose(true);
        }
      }
      }
      else
      {
        var datanew = {
          title: data.name,
          Permissions: permissionsArray,
          global_id: storedData.id
        };
        console.log(datanew);
        const response = await axios.post(
          "http://localhost:3000/api/postRole",
          {
            datanew,
          }
        );
        if (response.status == 200) {
          setrefresh(true);
          handleClose(true);
        }
      }
    }
      
function resetvalue(value)
{
   setdashboard(value);

   setEmail(value);

   setPackages(value);

   setSubscriptionandLeads(value);

   setRolesandPermissions(value);

   setInvoice(value);

   setProducts(value);

   setService(value);

}


{/*{"title":"Manager",
"Permissions":[
{"title":"Dashboards",
"icon":"HomeOutline",
"path":"/dashboards/crm",
"global_id":"sa1"},
{"title":"Email",
"icon":"EmailOutline",
"path":"/apps/email",
"global_id":"sa1"}]}*/}
async function setnavigation(navigationData)
 {
   await axios.post(
    "http://localhost:3000/api/postNavigationMenu",
    {
      navigationData,
    }
  );
}
  const onSubmit = (data) => {
    console.log(dialogTitle);

    var storedData = window.localStorage.getItem("userData");
    storedData = JSON.parse(storedData);
    
    
    var permissionsArray=[];
    {/*{"title":"Manager",
"Permissions":[

{"title":"Email",
"icon":"EmailOutline",
"path":"/apps/email",
"global_id":"sa1"}]}*/}
    if (Dashboard) {
      permissionsArray.push(
        {title:"Dashboards",
        icon:"HomeOutline",
        path:"/dashboards/crm",
        global_id:storedData.id});
      
    } 
      
      
    if (Email) {
      permissionsArray.push({
        title: "Email",
        icon: "HomeOutline",
        path: "/apps/email",
        global_id: storedData.id,
      });
     

    } 
    if (Packages){
      
      permissionsArray.push({
        title: "Packages",
        icon: "HomeOutline",
        path: "/pages/pricing",
        global_id: storedData.id,
      });
      
     
    } 
    if (SubscriptionandLeads) {
      permissionsArray.push({
        title: "Subscription/Leads",
        icon: "HomeOutline",
        path: "/apps/user/list",
        global_id: storedData.id
      });
    
      
    } 
    if (RolesandPermissions) {
      permissionsArray.push({
        title: "Roles & Permissions",
        icon: "HomeOutline",
        path: "/apps/roles",
        global_id: storedData.id})
      
      
    } 
    if (Invoice) {
      permissionsArray.push({
        title: "Invoice",
        icon: "HomeOutline",
        path: "/apps/invoice/list",
        global_id: storedData.id
      });
     
      
    } 
    if (Products) {
      permissionsArray.push({
        title: "Products",
        icon: "HomeOutline",
        path: "/apps/products/list",
        global_id: storedData.id
      });
     
      
    } 
     if (Service) {
      permissionsArray.push({
        title: "Service",
        icon: "HomeOutline",
        path: "/apps/service/list",
        global_id: storedData.id
      });   
    } 
    
  
    postRole(data,permissionsArray,dialogTitle);

    
  };
  function getvalue(i) {
    if (i == "Dashboards") {
      return Dashboard;
    } else if (i == "Email") {
      return Email;
    } else if (i == "Packages") {
      return Packages;
    } else if (i == "Subscription/Leads") {
      return SubscriptionandLeads;
    } else if (i == "Roles & Permissions") {
      return RolesandPermissions;
    } else if (i == "Invoice") {
      return Invoice;
    } else if (i == "Products") {
      return Products;
    } else if (i == "Service") {
      return Service;
    } else {
    }
  }
  useEffect(() => {
    if (dialogTitle == "Add") {
      {
      resetvalue(false);
      setValue("name", "");
      }
    } else {
      var length = cardDatabyName.Permissions.length;
      setValue("name", cardDatabyName.title);
      console.log(cardDatabyName.Permissions);
      for (let i = 0; i < length; i++) {
        if (cardDatabyName.Permissions[i].title == "Dashboards") {
          setdashboard(true);
        } else if (cardDatabyName.Permissions[i].title == "Email") {
          setEmail(true);
        } else if (cardDatabyName.Permissions[i].title == "Packages") {
          setPackages(true);
        } else if (cardDatabyName.Permissions[i].title == "Subscription/Leads") {
          setSubscriptionandLeads(true);
        } else if (cardDatabyName.Permissions[i].title == "Roles & Permissions") {
          setRolesandPermissions(true);
        } else if (cardDatabyName.Permissions[i].title == "Invoice") {
          setInvoice(true);
        } else if (cardDatabyName.Permissions[i].title == "Products") {
          setProducts(true);
        } else if (cardDatabyName.Permissions[i].title == "Service") {
          setService(true);
        } else {
          console.log("no permissions");
        }
      }
      console.log("Edit");
    }
  }, [cardDatabyName, open]);
  
  return (
    <Grid container spacing={6} className="match-height">
      {renderCards()}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleClickOpen();
            setDialogTitle("Add");
          }}
        >
          <Grid container sx={{ height: "100%" }}>
            <Grid item xs={5}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <img
                  width={65}
                  height={130}
                  alt="add-role"
                  src="/images/cards/pose_m1.png"
                />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <CardContent>
                <Box sx={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    sx={{ mb: 2.5, whiteSpace: "nowrap" }}
                    onClick={() => {
                      handleClickOpen();
                      setDialogTitle("Add");
                    }}
                  >
                    Add Role
                  </Button>
                  <Typography variant="body2">
                    Add role, if it doesn't exist.
                  </Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="md"
        scroll="body"
        onClose={handleClose}
        open={open}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ textAlign: "center" }}>
            <Typography variant="h4" component="span">
              {`${dialogTitle} Role`}
            </Typography>
            <Typography variant="body2">Set Role Permissions</Typography>
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
            <Box sx={{ my: 4 }}>
              <FormControl fullWidth>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) =>{
                    console.log(value)
                    
                    return(
                    <TextField
                      value={value}
                      label="Role Name"
                      onChange={onChange}
                      error={Boolean(errors.name)}
                      placeholder="Enter Role Name"
                    />
                  )}}
                />
                {errors.name && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    Please enter a valid role name
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            <Typography variant="h6">Role Permissions</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ pl: "0 !important" }}>
                      <Box
                        sx={{
                          display: "flex",
                          fontSize: "0.875rem",
                          alignItems: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        Administrator Access
                        <Tooltip
                          placement="top"
                          title="Allows a full access to the system"
                        >
                          <InformationOutline
                            sx={{ ml: 1, fontSize: "1rem" }}
                          />
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <FormControlLabel
                        label="Select All"
                        control={
                          <Checkbox
                            size="small"
                            onChange={(e) => {
                             

                              resetvalue(e.target.checked);

                              //this.setState({ isTrue: e.target.checked });
                            }}
                          />
                        }
                        sx={{
                          "& .MuiTypography-root": {
                            textTransform: "capitalize",
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rolesArr.map((i, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{ "& .MuiTableCell-root:first-of-type": { pl: 0 } }}
                      >
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            color: (theme) =>
                              `${theme.palette.text.primary} !important`,
                          }}
                        >
                          {i}
                        </TableCell>
                        <TableCell>
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                checked={getvalue(i)}
                                onChange={(e) => {
                                  if (i == "Dashboards") {
                                    setdashboard(e.target.checked);
                                  } else if (i == "Email") {
                                    setEmail(e.target.checked);
                                  } else if (i == "Packages") {
                                    setPackages(e.target.checked);
                                  } else if (i == "Subscription/Leads") {
                                    setSubscriptionandLeads(e.target.checked);
                                  } else if (i == "Roles & Permissions") {
                                    setRolesandPermissions(e.target.checked);
                                  } else if (i == "Invoice") {
                                    setInvoice(e.target.checked);
                                  } else if (i == "Products") {
                                    setProducts(e.target.checked);
                                  } else if (i == "Service") {
                                    setService(e.target.checked);
                                  } else {
                                  }

                                  //this.setState({ isTrue: e.target.checked });
                                }}
                              />
                            }
                            label="Select"
                          />
                        </TableCell>
                        {/* <TableCell>
                          <FormControlLabel control={<Checkbox size='small' />} label='Write' />
                        </TableCell>
                        <TableCell>
                          <FormControlLabel control={<Checkbox size='small' />} label='Create' />
                        </TableCell>*/}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions
            sx={{ pt: 0, display: "flex", justifyContent: "center" }}
          >
            <Box className="demo-space-x">
              <Button size="large" type="submit" variant="contained">
                Submit
              </Button>
              <Button
                size="large"
                color="secondary"
                variant="outlined"
                onClick={handleClose}
              >
                Discard
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  );
};

export default RolesCards;
