import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up-page/sign-in-and-sign-up.component";
import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from "./redux/user/user.actions";

const App = () => {
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch])

    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/shop' component={ShopPage}/>
                <Route exact path='/checkout' component={CheckoutPage}/>

                <Route exact path='/signin' render={() => currentUser ?
                    (<Redirect to='/'/>
                    ) : (
                        <SignInAndSignUpPage/>)
                }
                />
            </Switch>
        </div>
    );
}

export default App;
