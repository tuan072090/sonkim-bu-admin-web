import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Routers } from "./share";
import DashBoardPage from "./pages/dashboard";
import Categories from "./pages/categories";
import Product from "./pages/product";
import OrdersPage from "./pages/orders";
import NotificationsPage from "./pages/notifications";
import WarehousePage from "./pages/warehouse";
import OrderDetail from "./pages/orders/OrderDetail";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact={true} component={DashBoardPage}/>

                <Route path={Routers.PRODUCTS} component={Product}/>

                <Route path={Routers.CATEGORIES} component={Categories}/>

                <Route path={Routers.ORDERS+"/:id"} component={OrderDetail}/>
                <Route path={Routers.ORDERS} component={OrdersPage}/>

                <Route path={Routers.NOTIFICATIONS} component={NotificationsPage}/>

                <Route path={Routers.WAREHOUSE} component={WarehousePage}/>

            </Switch>
        </Router>
    );
}

export default App;
