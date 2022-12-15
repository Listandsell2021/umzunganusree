// ** React Imports
import { useEffect, useState } from 'react'

// ** Import All Icons
import * as Icons from 'mdi-material-ui'

// ** Axios Import
import axios from 'axios'

const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState([])
  const [roleData, setroleData] = useState([])
  
  useEffect(() => {

      
      var storedData = window.localStorage.getItem('userData')
      storedData=JSON.parse(storedData)
      var data={id:storedData.id}
      var role=storedData.role

      async function getrole()
      {
        
        if(role=="superadmin")
        {  
        axios
          .post("http://localhost:3000/api/getnavigations", { data })
          .then((response) => {
            const menuArray = response.data;

            const finalMenuArray = (items) => {
              return items.map((item) => {
                if (item.icon) {
                  // @ts-ignore
                  item.icon = Icons[item.icon];
                  if (item.children) {
                    finalMenuArray(item.children);
                  }

                  return item;
                }

                return item;
              });
            };

            setMenuItems(finalMenuArray(menuArray));
          });

        }
        else if(role=="admin")
        {
  
  axios
    .post("http://localhost:3000/api/getnavigations", { data })
    .then((response) => {
      const menuArray = response.data;

      const finalMenuArray = (items) => {
        return items.map((item) => {
          if (item.icon) {
            item.icon = Icons[item.icon];
            if (item.children) {
              finalMenuArray(item.children);
            }

            return item;
          }

          return item;
        });
      };

      setMenuItems(finalMenuArray(menuArray));
    });
        }
        else
        {
           var storedData = window.localStorage.getItem("userData");
       storedData = JSON.parse(storedData);
        const response = await axios.post("http://localhost:3000/api/getRoleData", {
        "id": storedData.adminid
        });

        var datarole = response.data;
        
        var length = datarole.length;
        //console.log(role)
        for (let i = 0; i < length; i++) {
          //console.log(String(datarole[i].title) + "===" + String(role));
          if (String(datarole[i].title) == String(role)) 
          {
            
              length=i-1;
              const menuArray = datarole[i].Permissions;
              const finalMenuArray = (items) => {
                return items.map((item) => {
                  if (item.icon) {
                    // @ts-ignore
                    item.icon = Icons[item.icon];
                    if (item.children) {
                      finalMenuArray(item.children);
                    }

                    return item;
                  }

                  return item;
                });
              };

              setMenuItems(finalMenuArray(menuArray));
          } 
          
          }
        }
    
      


      }
       getrole();

    /*axios.get('http://localhost:3000/api/vertical-nav/data').then(response => {
      const menuArray = response.data
console.log(menuArray)
      /**
       *  Replace the icon string with the component
       *  If you don't want to import the whole icon library
       *  you can create a static object and replace the icons using that object
       */
      /*const finalMenuArray = items => {
        return items.map(item => {
          if (item.icon) {
            // @ts-ignore
            item.icon = Icons[item.icon]
            if (item.children) {
              finalMenuArray(item.children)
            }

            return item
          }

          return item
        })
      }
      setMenuItems(finalMenuArray(menuArray))
    })*/
  }, [])
  return menuItems
}

export default ServerSideNavItems
