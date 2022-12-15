// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState(defaultProvider.isInitialized)

  // ** Hooks
  const router = useRouter()
    
  useEffect(() => {
    const initAuth = async () => {
      setIsInitialized(true)
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.userData })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

 async function checklogin(data)
{

   const { email, password } = data 
  
     var data = JSON.stringify({
      "email": email,
      "pass": password,
    });

    var axios = require('axios');
   
   
    var config = {
      method: 'POST',
      //url: "http://localhost:3000/api/read"
      url: "http://localhost:3000/api/read"
      
      ,
      headers: { 
        'Content-Type': 'application/json',
      },
      data : data};
  
          var login=await axios(config)
          login=login.data
          //console.log(test.data)
          

   return login;
   
}
async function getdeatils(data)
{

 
  
     var data = JSON.stringify({
      "id": data,
     
    });
 
    var axios = require('axios');
   
   
    var config = {
      method: 'POST',
      //url: "http://localhost:3000/api/getDetailSuperAdmin"
      url: " http://localhost:3000/api/getDetailSuperAdmin"
      ,
      headers: { 
        'Content-Type': 'application/json',
      },
      data : data};
  
          var details=await axios(config)
          details=details.data
          //console.log(test.data)
          

   return details;
   
}
async function getdeatilsadmin(data)
{

 
  
     var data = JSON.stringify({
      "id": data,
     
    });
 
    var axios = require('axios');
   
   
    var config = {
      method: 'POST',
      //url: "http://localhost:3000/api/getDetailSuperAdmin"
      url: " http://localhost:3000/api/getDetailAdmin"
      ,
      headers: { 
        'Content-Type': 'application/json',
      },
      data : data};
  
          var details=await axios(config)
          details=details.data
          //console.log(test.data)
          

   return details;
   
}
async function getdeatilsmanagers(data) {
  var data = JSON.stringify({
    id: data,
  });

  var axios = require("axios");

  var config = {
    method: "POST",
    //url: "http://localhost:3000/api/getDetailSuperAdmin"
    url: " http://localhost:3000/api/getManagerData",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  var details = await axios(config);
  details = details.data;
  //console.log(test.data)

  return details;
}




  const handleLogin = (params, errorCallback) => {

     checklogin(params).then(res=>{
      if(!res.length==0)
      {
        
        if(res[0].email==params.email)
        {
          var logindata=res[0];


          if(logindata.role==="superadmin")
          {
          getdeatils(res[0].global_id).then(res=>
            {
             var details=res[0].details
             var email=res[0].email
             var name=details[0].name;
           var data={"id":logindata.global_id,"role":logindata.role,"fullName":name.first_name + " "+ name.last_name ,"username":email,"email":email};
           
           const returnUrl = router.query.returnUrl
            setUser({ ...data })
            window.localStorage.setItem('userData', JSON.stringify(data))
            window.localStorage.setItem('accessToken','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY2MjQ3NTUwfQ.pAFU9NbNYabwuW5Z1fnzsc1tdRwpFJMMzLTs1Cg1FUg');
           const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
            router.replace(redirectURL)
          })
        }
        else if (logindata.role === "admin") 
        {
          getdeatilsadmin(res[0].global_id).then((res) => {
            var details = res[0].details;
            var email = res[0].email;
            var name = details[0].full_name;
            var data = {
              id: logindata.global_id,
              role: logindata.role,
              fullName: name,
              username: email,
              email: email,
            };

            const returnUrl = router.query.returnUrl;
            setUser({ ...data });
            window.localStorage.setItem("userData", JSON.stringify(data));
            window.localStorage.setItem(
              "accessToken",
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY2MjQ3NTUwfQ.pAFU9NbNYabwuW5Z1fnzsc1tdRwpFJMMzLTs1Cg1FUg"
            );
            console.log(res[0]);
            if (details[0].status == "pending") {
              router.replace("/plan/");
            } else {
              const redirectURL =
                returnUrl && returnUrl !== "/" ? returnUrl : "/";
              router.replace(redirectURL);
            }
          });

          /////////////////client login
        }
        else
        {
          getdeatilsmanagers(res[0].global_id).then((res) => {
            var details = res[0].details;
            var email = res[0].email;
            var name = details[0].full_name;
            var adminid=details[0].global_id;
            var data = {
              id: logindata.global_id,
              role: logindata.role,
              fullName: name,
              username: email,
              email: email,
              adminid: adminid,
            };

            const returnUrl = router.query.returnUrl;
            setUser({ ...data });
            window.localStorage.setItem("userData", JSON.stringify(data));
            window.localStorage.setItem(
              "accessToken",
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY2MjQ3NTUwfQ.pAFU9NbNYabwuW5Z1fnzsc1tdRwpFJMMzLTs1Cg1FUg"
            );
            console.log(res[0]);
            if (details[0].status == "pending") {
              router.replace("/plan/");
            } else {
              const redirectURL =
                returnUrl && returnUrl !== "/" ? returnUrl : "/";
              router.replace(redirectURL);
            }
          });
        }
        }
       else
       {
        //console.log("login not");     
       }
    }
     })
   


    /*axios
      .post(authConfig.loginEndpoint, params)
      .then(async res => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.accessToken)
      })
      .then(() => {
        axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: window.localStorage.getItem(authConfig.storageTokenKeyName)
            }
          })
          .then(async response => {
            console.log(response.data)*/
            
          /*})
      })
      .catch(err => {
      //  console.log(err)
        if (errorCallback) errorCallback(err)
      })
     // console.log(params.email)*/
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params, errorCallback) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch(err => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
