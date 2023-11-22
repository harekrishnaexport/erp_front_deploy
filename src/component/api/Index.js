import React from "react";
import Sidebar from "../header&sidebar/Sidebar";
import { Switch, Route } from "react-router-dom";
import Dashbord from "../pages/dashbord/Dashbord";
import Productlist from "../pages/Product/Productlist";
import Sellerlist from "../pages/Seller/Seller";
import Addseller from "../pages/Seller/Addseller";
import Editseller from "../pages/Seller/EditSeller";
import EditProduct from "../pages/Product/EditProduct";
import AddProduct from "../pages/Product/AddProduct";
import MonthlyProductDetails from "../pages/Product/MonthlyProductDetails";
import Profile from "../pages/profile/Profile";
import BillGenerate from "../pages/Bill/BillGenerate";
import InvoiceRecord from "../pages/Bill/InvoiceRecord";
import PaymentEntry from "../pages/PaymentReport/PaymentEntry";
import PaymentRecord from "../pages/PaymentReport/PaymentReport";
import Addsalesmen from "../pages/salesmen/Addsalesmen";
import Salesmen from "../pages/salesmen/Salesmen";
import Edirsalesmen from "../pages/salesmen/Edirsalesmen";
import PurchaseList from "../pages/purchase/PurchaseList";
import Addpurchase from "../pages/purchase/Addpurchase";
import EditPurchase from "../pages/purchase/EditPurchase";
import EditBill from "../pages/Bill/EditBill";
import ReturnOrder from "../pages/Bill/ReturnOrder";
import ReturnRecord from "../pages/return/ReturnRecord";
import ProductNameEdit from "../pages/Product/ProductNameEdit";

const App = () => {
  return (
    <>
      <div className="setdisplay">
        <Sidebar />
        <Switch>
          <Route path="/app/product">
            <Productlist />
          </Route>
          <Route path="/app/product_repot">
            <MonthlyProductDetails />
          </Route>
          <Route path="/app/productedit/:id">
            <EditProduct />
          </Route>
          <Route path="/app/productadd">
            <AddProduct />
          </Route>
          <Route path="/app/productnameedit/:id">
            <ProductNameEdit />
          </Route>
          <Route path="/app/seller">
            <Sellerlist />
          </Route>
          <Route path="/app/selleradd">
            <Addseller />
          </Route>
          <Route path="/app/selleredit/:id">
            <Editseller />
          </Route>
          <Route path="/app/profile">
            <Profile />
          </Route>
          <Route path="/app/createbill">
            <BillGenerate />
          </Route>
          <Route path="/app/editbill/:id">
            <EditBill />
          </Route>
          <Route path="/app/returnbill/:id">
            <ReturnOrder />
          </Route>
          <Route path="/app/invoicerecord">
            <InvoiceRecord />
          </Route>
          <Route path="/app/paymentaccept">
            <PaymentEntry />
          </Route>
          <Route path="/app/paymentreport">
            <PaymentRecord />
          </Route>
          <Route path="/app/salesmen">
            <Salesmen />
          </Route>
          <Route path="/app/salesadd">
            <Addsalesmen />
          </Route>
          <Route path="/app/selesedit/:id">
            <Edirsalesmen />
          </Route>
          <Route path="/app/purchase">
            <PurchaseList />
          </Route>
          <Route path="/app/purchaseadd">
            <Addpurchase />
          </Route>
          <Route path="/app/purchaseedit/:id">
            <EditPurchase />
          </Route>
          <Route path="/app/returneport">
            <ReturnRecord />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default App;
