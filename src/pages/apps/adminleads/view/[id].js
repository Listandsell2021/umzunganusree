// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import UserViewPage from 'src/views/apps/adminleads/view/UserViewPage'
import Checkout from 'src/views/pages/wizard-examples/checkout'
const UserView = ({ id, invoiceData }) => {
  
  return (
    // <UserViewPage id={id} invoiceData={invoiceData}  />

    <Checkout id={id} invoiceData={invoiceData} />
  );
};

export const getStaticPaths = async () => {
  const res = await axios.get('/apps/users/list')
  const userDate = await res.data.allData

  const paths = userDate.map(item => ({
    params: { id: `${item.id}` }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const res = await axios.get('/apps/invoice/invoices')
 
  
  const invoiceData = res.data.allData
  

  return {
    props: {
      invoiceData,
      

      id: params?.id
    }
  }
}

export default UserView
