import React, { useEffect, useState, useCallback } from 'react'
import { 
    FlatList, 
    View,
    Text, 
    Platform,
    StyleSheet,
    Button,
    ActivityIndicator
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as ordersActions from '../../store/actions/order'
import Colors from '../../constants/Colors'

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()

    const loadOrders = useCallback(async() => {
        setIsLoading(true)
        setError(null)
        try {
            await dispatch(ordersActions.fetchOrders())
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }, [dispatch, setError, setIsLoading])
    
    useEffect(() => {
        loadOrders()
    }, [dispatch, loadOrders])

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occurred!</Text>
                <Button 
                    title='Try again'
                    onPress={loadOrders}
                    color={Colors.primary}
                ></Button>
            </View>
        )
    }
    //console.log(isLoading)
    if (isLoading) {
        
        return (
            <View style={styles.centered}>
                <ActivityIndicator 
                    size='large'
                    color={Colors.primary}
                />
            </View>
        )
    }

    if(!isLoading && orders.length === 0) {
        //console.log('a')
        return (
            <View style={styles.centered}>
                <Text>No orders found. Maybe order some items</Text>
            </View>
        )
    }
    //console.log(orders)

    if (orders.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>No order found, maybe start ordering some products?</Text>
            </View>
        )
    }

    return (
        <FlatList 
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <OrderItem 
                    amount={itemData.item.totalAmount}
                    date={itemData.item.date}
                    items={itemData.item.items}
                />
            }
        />
    )
}
OrdersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Menu' 
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrdersScreen