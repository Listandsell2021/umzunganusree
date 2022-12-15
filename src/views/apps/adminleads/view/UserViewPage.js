// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import UserViewLeft from 'src/views/apps/adminleads/view/UserViewLeft'
import UserViewRight from "src/views/apps/adminleads/view/UserViewRight";

const UserView = ({ id, invoiceData }) => {
  // ** State
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)
  const [productdata, setproductdata] = useState(null);
  useEffect(() => {

    var ids={id:"c"+id}
    //console.log(id)
   
    axios
      .post("http://localhost:3000/api/getLeadAdminbyid", { ids })
      .then((response) => {
        setData(response.data[0]);
        console.log(response.data);
        setError(false);
      })
      .catch(() => {
        setData(null);
        setError(true);
      });

 var storedData = window.localStorage.getItem("userData");
                      
    storedData = JSON.parse(storedData);
  var ids = { id: storedData.id };
      axios
        .post("http://localhost:3000/api/getProductbyAdmin", { ids })
        .then((response) => {
          setproductdata(response.data);
          setError(false);
        })
        .catch(() => {
          setData(null);
          setError(true);
        });
      
  }, [])
  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserViewLeft data={data} />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <UserViewRight invoiceData={invoiceData} productdata={productdata} />
        </Grid>
      </Grid>
    );
  } else if (error) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity="error">
            User with the id:  does not exist. Please check the list of
            users: <Link href="/apps/adminleads/list">User List</Link>
          </Alert>
        </Grid>
      </Grid>
    );
  } else {
    return null
  }
}

export default UserView
