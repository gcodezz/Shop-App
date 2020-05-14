import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { enableScreens } from 'react-native-screens'
import { InAppNotificationProvider } from 'react-native-in-app-notification'
import ReduxThunk from 'redux-thunk'
//import { composeWithDevTools } from 'redux-devtools-extension'

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'
import NavigationContainer from './navigation/NavigationContainer'
import NotificationDesign from './components/shop/NotificationDesign'

enableScreens()

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <InAppNotificationProvider
        height={50}
        closeInterval={1000}
        notificationBodyComponent={NotificationDesign}
      >
        <NavigationContainer />
      </InAppNotificationProvider>
    </Provider>
  );
}
