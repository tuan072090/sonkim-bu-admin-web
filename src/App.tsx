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
                            <Route path={Routers.ARTICLES + "/:id"} exact={true} component={ArticleDetailPage}/>
                            <Route path={Routers.ARTICLES} component={ArticlesPage}/>
                            <Route path={Routers.LOYALTY_PROGRAMS + "/:id"} exact={true}
                                   component={LoyaltyProgramDetailPage}/>
                            <Route path={Routers.LOYALTY_PROGRAMS} component={LoyaltyProgramsPage}/>
                            <Route path={Routers.PROMOTIONS + "/:id"} exact={true} component={PromotionDetailPage}/>
                            <Route path={Routers.PROMOTIONS} component={PromotionsPage}/>
                            <Route path={Routers.STORES + "/:id"} exact={true} component={StoreDetailPage}/>
                            <Route path={Routers.STORES} component={StoresPage}/>
                        </Switch>
                    </Router>
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    );
}

export default App;
