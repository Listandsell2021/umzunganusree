import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'



// ** Fetch Users
export const fetchData = createAsyncThunk('appManager/fetchData', async params => {
  var storedData = window.localStorage.getItem("userData");
  storedData = JSON.parse(storedData);
  const response = await axios.post('http://localhost:3000/api/getManagersData', {
    params
  })
  var test = {
    alldata: response.data,
    params: params,
    total: 1,
    managers: response.data,
    global_id: storedData.id,
  };

   //console.log(test)
  return test
})
export const fetchdatabyid = createAsyncThunk('appManager/fetchData', async params => {
  const response = await axios.post('http://localhost:3000/api/getManagersDatabyId', {
    params
  })
  var test={
    "alldata":response.data,
    "params":params,
    "total":1,
    "managers":response.data
  }

   console.log(test)
  return test
})

export const fetchplan=(async params =>
{
  
  const response = await axios.post('http://localhost:3000/api/getPackages', {
    
  })
 

   //console.log(params)
  return response.data
})
// ** Add User
export const addmanager = createAsyncThunk('appManager/addmanager', async (data, { getState, dispatch }) => {
   var storedData = window.localStorage.getItem("userData");
   storedData = JSON.parse(storedData);
  var datas={"collection":"Manager"}
  const response1 = await axios.post('http://localhost:3000/api/getLastId', {
    datas
  })
  var datanew={
    "global_id":storedData.id,
    "m_id":"m"+(parseInt(response1.data)+1),
    "email":data.email,
    "email_verification":"gjhgf67gsf",
    "registered_date":null,
    "avatar":"/images/avatars/4.png",
    "role":data.role,
    "status":data.currentstatus,
    "full_name":data.name,
    "password":data.password}

  const response = await axios.post('http://localhost:3000/api/postManager', {
    datanew
  })
  var logindata={
    "sa_id":"sa1",
    "global_id":"m"+(parseInt(response1.data)+1),
    "email":data.email,
    "role":data.role,
     "sessions":"no",
    "password":data.password
}
     
     
      

  const response2 = await axios.post('http://localhost:3000/api/postLogin', {
    logindata
  })
  dispatch(fetchData(getState().managers.params))
  
return response.data
})
export const updateManager = createAsyncThunk('appManager/updateManager', async (datas, { getState, dispatch }) => {
  var storedData = window.localStorage.getItem("userData");
  storedData = JSON.parse(storedData);
 
 
  var datanew={
     "global_id":storedData.id,
      "m_id":datas.m_id,
      "email":datas.email,
      "email_verification":"gjhgf67gsf",
      "registered_date":"10/11/2022",
      "avatar":"/images/avatars/4.png",
      "role":datas.role,
      "status":datas.status,
      "full_name":datas.full_name,
      "password":datas.password
    }
console.log(datanew)

 const response = await axios.post('http://localhost:3000/api/updateManagerdata', {
    datanew
  })
  
  dispatch(fetchData(getState().managers.params))
  

  return response.data
})
// ** Delete User
export const deleteUser = createAsyncThunk('appManager/deleteUser', async (id, { getState, dispatch }) => {
  const response = await axios.delete('/apps/users/delete', {
    data: id
  })
  dispatch(fetchData(getState().managers.params))

  return response.data
})

export const appManagerSlice = createSlice({
  name: 'appManager',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.managers
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData

    })
  }
})

export default appManagerSlice.reducer
