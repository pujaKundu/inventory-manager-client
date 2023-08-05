import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Configuration from "./components/Configuration/Configuration";
import ProductList from "./components/Configuration/ProductList/ProductList";
import Purchase from "./components/Purchase/Purchase";
import Homepage from "./components/Homepage/Homepage";
import AddProduct from "./components/Configuration/AddProuct/AddProduct";
import EditProduct from "./components/Configuration/EditProduct/EditProduct";
import SupplierList from "./components/Configuration/Supplier/SupplierList";
import AddSupplier from "./components/Configuration/Supplier/AddSupplier";
import EditSupplier from "./components/Configuration/Supplier/EditSupplier";
import CreatePurchase from "./components/Purchase/CreatePurchase";
import ApproveNavigation from "./components/Approval/ApproveNavigation";
import Approval from "./components/Approval/Approval";
import Dashboard from "./components/Dashboard/Dashboard";

function App({ children }) {
  return (
    <div className="App">
      {/* <Sidebar /> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}

        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/configuration" element={<Configuration />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/createPurchase" element={<CreatePurchase />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/editProduct/:id" element={<EditProduct />} />
            <Route path="/suppliers" element={<SupplierList />} />
            <Route path="/addSupplier" element={<AddSupplier />} />
            <Route path="/editSupplier/:id" element={<EditSupplier />} />
            <Route path="/approval" element={<ApproveNavigation />} />
            <Route path="/approve-purchase" element={<Approval />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </div>
  );
}

export default App;
