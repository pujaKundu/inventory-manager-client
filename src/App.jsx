import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./App.css";
import {
  Login,
  Dashboard,
  Homepage,
  Configuration,
  Purchase,
  CreatePurchase,
  ProductList,
  AddProduct,
  EditProduct,
  SupplierList,
  AddSupplier,
  EditClient,
  EditSupplier,
  ClientList,
  AddClient,
  Approval,
  ApproveNavigation,
  SalesApproval,
  Sales,
  CreateSales,
} from "./components/index";

function App({ children }) {
  return (
    <div className="App">
      {/* <Sidebar /> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}

        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
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
            <Route path="/clients" element={<ClientList />} />
            <Route path="/addClient" element={<AddClient />} />
            <Route path="/editClient/:id" element={<EditClient />} />
            <Route path="/approval" element={<ApproveNavigation />} />
            <Route path="/approve-purchase" element={<Approval />} />
            <Route path="/approve-sales" element={<SalesApproval />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/create-sales" element={<CreateSales />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </div>
  );
}

export default App;
