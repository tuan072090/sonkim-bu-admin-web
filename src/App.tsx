import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux';
import {ErrorBoundary} from "react-error-boundary";
import {Routers} from "./share";
import DashBoardPage from "./pages/dashboard";
import ArticlesPage from "./pages/articles";
import LoyaltyProgramsPage from "./pages/loyalty-programs";
import PromotionsPage from "./pages/promotions";
import StoresPage from "./pages/stores";
import ArticleDetailPage from "./pages/articles/ArticleDetailPage";
import LoyaltyProgramDetailPage from "./pages/loyalty-programs/LoyaltyProgramDetailPage";
import PromotionDetailPage from "./pages/promotions/PromotionDetailPage";
import StoreDetailPage from "./pages/stores/StoreDetailPage";
import {persistor, store} from './share/store';
import {ErrorFallback} from "./components";
import {PersistGate} from 'redux-persist/integration/react'
import Loader from "./components/atoms/loader";
import TestPage from "./pages/test";
import UsersPage from "./pages/users";
import GiftCardsPage from "./pages/giftcards";
import GiftCardOrdersPage from "./pages/giftcard-orders";

const App = () => {
    const _reset = () => {
        window.location.reload()
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={_reset}>
            <Provider store={store}>
                <PersistGate loading={<Loader/>} persistor={persistor}>
                    <Router>
                        <Switch>
                            <Route path="/" exact={true} component={DashBoardPage}/>
                            <Route path={Routers.ARTICLE_DETAIL.path} exact={true} component={ArticleDetailPage}/>
                            <Route path={Routers.ARTICLES.path} component={ArticlesPage}/>
                            <Route path={Routers.LOYALTY_PROGRAM_DETAIL.path} exact={true}
                                   component={LoyaltyProgramDetailPage}/>
                            <Route path={Routers.LOYALTY_PROGRAMS.path} component={LoyaltyProgramsPage}/>
                            <Route path={Routers.PROMOTION_DETAIL.path} exact={true} component={PromotionDetailPage}/>
                            <Route path={Routers.PROMOTIONS.path} component={PromotionsPage}/>
                            <Route path={Routers.STORE_DETAIL.path} exact={true} component={StoreDetailPage}/>
                            <Route path={Routers.STORES.path} component={StoresPage}/>
                            <Route path={Routers.TEST.path} component={TestPage}/>
                            <Route path={Routers.USERS.path} component={UsersPage}/>
                            <Route path={Routers.GIFTCARDS.path} component={GiftCardsPage}/>
                            <Route path={Routers.GIFTCARD_ORDERS.path} component={GiftCardOrdersPage}/>
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    );
}

export default App;
