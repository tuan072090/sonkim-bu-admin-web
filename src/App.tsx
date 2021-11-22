import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Routers } from "./share";
import DashBoardPage from "./pages/dashboard";
import ArticlesPage from "./pages/articles";
import LoyaltyProgramsPage from "./pages/loyalty-programs";
import PromotionsPage from "./pages/promotions";
import StoresPage from "./pages/stores";
import ArticleDetailPage from "./pages/articles/ArticleDetailPage";
import LoyaltyProgramDetailPage from "./pages/loyalty-programs/LoyaltyProgramDetailPage";
import PromotionDetailPage from "./pages/promotions/PromotionDetailPage";
import StoreDetailPage from "./pages/stores/StoreDetailPage";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact={true} component={DashBoardPage}/>

                <Route path={Routers.ARTICLES+"/:id"} exact={true} component={ArticleDetailPage}/>
                <Route path={Routers.ARTICLES} component={ArticlesPage}/>
                <Route path={Routers.LOYALTY_PROGRAMS+"/:id"} exact={true} component={LoyaltyProgramDetailPage}/>
                <Route path={Routers.LOYALTY_PROGRAMS} component={LoyaltyProgramsPage}/>
                <Route path={Routers.PROMOTIONS+"/:id"} exact={true} component={PromotionDetailPage}/>
                <Route path={Routers.PROMOTIONS} component={PromotionsPage}/>
                <Route path={Routers.STORES+"/:id"} exact={true} component={StoreDetailPage}/>
                <Route path={Routers.STORES} component={StoresPage}/>

            </Switch>
        </Router>
    );
}

export default App;
