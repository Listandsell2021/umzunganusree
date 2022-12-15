import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'



// ** Fetch Users
export const fetchData = createAsyncThunk('appProducts/fetchData', async params => {
  var storedData = window.localStorage.getItem("userData");
  storedData = JSON.parse(storedData);
  const response = await axios.post('http://localhost:3000/api/getProductsData', {
    params
  })
  var test={
    "alldata":response.data,
    "params":params,
    "total":1,
    "products":response.data,
     
  }

   //console.log(params)
  return test
})

// ** Add User
export const addProducts = createAsyncThunk('product/addProducts', async (data, { getState, dispatch }) => {

  var datas={"collection":"Products"}
  const response1 = await axios.post('http://localhost:3000/api/getLastId', {
    datas
  })
  var datanew;
if(data.role=="superadmin")
{
datanew = {
  "a_id": data.admin_id,
  "sa_id": data.id,
  "tittle": data.title,
  "descriptions": "test2 desc",
  "price": data.price,
  "size": {
    "length": data.length,
    "breath": data.breath,
    "height": data.height,
    "cubic_meter": data.cubic_meter,
  },
  "p_id": "p" + (parseInt(response1.data) + 1),
  "avatar": "/images/avatars/4.png",
  "status": "active"
};
}
else if(data.role=="admin")
{
datanew = {
  "a_id": data.admin_id,
  "sa_id": data.id,
  "tittle": data.title,
  "descriptions": "test2 desc",
  "price": data.price,
  "size": {
    "length": data.length,
    "breath": data.breath,
    "height": data.height,
    "cubic_meter": data.cubic_meter,
  },
  "p_id": "p" + (parseInt(response1.data) + 1),
  "avatar": "/images/avatars/4.png",
  "status": "active"
  
};
}
else
{
  datanew = {
  "a_id": data.admin_id,
  "sa_id": data.id,
  "tittle": data.title,
  "descriptions": "test2 desc",
  "price": data.price,
  "size": {
    "length": data.length,
    "breath": data.breath,
    "height": data.height,
    "cubic_meter": data.cubic_meter,
  },
  "p_id": "p" + (parseInt(response1.data) + 1),
  "avatar": "/images/avatars/4.png",
  "status": "active",
  "role":data.crole
};

}
  
console.log(datanew)

  const response = await axios.post('http://localhost:3000/api/postProducts', {
    datanew
  })
  dispatch(fetchData(getState().products.params));
  

return response.data
})
export const adduser = createAsyncThunk('appProducts/adduser', async (data, { getState, dispatch }) => {

  var datas={"collection":"Products"}
  const response1 = await axios.post('http://localhost:3000/api/getLastId', {
    datas
  })
    var datanew={
            "a_id":"a1",
            "sa_id":"s1",
            "tittle":data.tittle,
              "descriptions ":"test2 desc",
              "price":data.price,
            "size":
          {"length":data.length,
         "breath":data.breath,
    "height":data.height,
    "cubic_meter":data.cubic_meter},
"p_id":"p"+parseInt(response1.data)+1,
"avatar":"/images/avatars/4.png",
"status":"active"}


  
  const response = await axios.post('http://localhost:3000/api/postProducts', {
    datanew
  })
  dispatch(fetchData(getState().user.params))
  

  return response.data
})
export const updateProducts = createAsyncThunk('appProducts/addProducts', async (data, { getState, dispatch }) => {

 
 
    var datanew={
            "a_id":data.a_id,
            "sa_id":"s1",
            "tittle":data.tittle,
              "descriptions ":"test2 desc",
              "price":data.price,
            "length":data.length,
         "breath":data.breath,
    "height":data.height,
    "cubic_meter":data.cubic_meter,
"p_id":data.p_id,
"avatar":"/images/avatars/4.png",
"status":data.status,
"role": data.role,
"admin_id": data.admin_id
}


 
  const response = await axios.post('http://localhost:3000/api/updateProduct', {
    datanew
  })
  dispatch(fetchData(getState().products.params));
  

  return response.data
})

// ** Delete User
export const deleteUser = createAsyncThunk('appProducts/deleteUser', async (p_id, { getState, dispatch }) => {
  
 
  const response = await axios.post('http://localhost:3000/api/deleteProduct', {
    datanew: p_id
  })
  dispatch(fetchData(getState().user.params))

  return response.data 
})

export const appProductsSlice = createSlice({
  name: 'appProducts',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.products
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appProductsSlice.reducer
