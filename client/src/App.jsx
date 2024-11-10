// import { useState } from 'react'

// import './App.css'
// import {Router,Routes,BrowserRouter, Route} from 'react-router-dom'
// import SignIn from './Pages/SignIn'
// import SignUp from './Pages/SignUp'
// import Home from './Pages/Home'
// import Profile from './Pages/Profile'
// import PrivateRoute from './Components/PrivateRoute'
// import CartPage from './Pages/cart-page/page'
// import Page from './Pages/[id]/page'
// import { CartProvider } from './Components/context/CartContext'
// import Checkout from './Pages/checkout'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <BrowserRouter>
//         <CartProvider>
//       <Routes>

//         <Route path="/" element={<Home />} />
//         <Route path="/sign-in" element={<SignIn/>}/>
//         <Route path='/sign-up' element={<SignUp/>}/>
//         <Route element={<PrivateRoute/>}>

//         <Route path='/profile' element={<Profile/>}/>

//         <Route path='/cart' element={<CartPage/>}/>
//         </Route>
//         <Route path="/:id" element={<Page />} />
//         <Route path='/checkout' element={<Checkout/>}/>
//       </Routes>
//         </CartProvider>
//     </BrowserRouter>
//   )
// }

// export default App

import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import PrivateRoute from './Components/PrivateRoute'
import CartPage from './Pages/cart-page/page'
import Page from './Pages/[id]/page'
import { CartProvider } from './Components/context/CartContext'
import { AdminProvider } from './Components/context/AdminContext' // Import AdminProvider
import Checkout from './Pages/checkout'
import AddProduct from './Components/admin/AddProduct'
import EditProduct from './Components/admin/EditProduct'
import Orders from './Pages/Orders'
import AdminDashboard from './Pages/Admin/AdminDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <AdminProvider> {/* Wrap with AdminProvider */}
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/add-product' element={<AddProduct />} />
              <Route path='/edit-product/:id' element={<EditProduct />} />
              <Route path='/orders' element={<Orders/>} />
              <Route path='/admin-dashboard/*' element={<AdminDashboard/>}/>
            </Route>
            <Route path="/:id" element={<Page />} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes>
        </CartProvider>
      </AdminProvider>
    </BrowserRouter>
  )
}

export default App
