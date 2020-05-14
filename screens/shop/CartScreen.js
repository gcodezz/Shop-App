import React, { 
    useState, 
    useEffect,
    useCallback
} from 'react'
import {
    View,
    Text,
    FlatList,
    Button,
    Alert,
    ActivityIndicator,
    StyleSheet,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { withInAppNotification } from 'react-native-in-app-notification'

import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/order'

const CartScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const transformedCartItems = []
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a, b) => 
            a.productId > b.productId ? 1 : -1
        )
    })

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured!', error, [{ text: 'Okay' }])
        }
    }, [error])

    const dispatch = useDispatch()

    const orderHandler = useCallback(async() => {
        setIsLoading(true)
        setError(null)
        try{    
            await dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
            props.showNotification({
                message: 'items ordered successfully. Check Orders for more details'
            })
        } catch (e) {
            setError(e.message)
        }
        setIsLoading(false)

    }, [dispatch, orderActions])

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                <Button 
                    color={Colors.accent} 
                    title="Order Now"
                    disabled={cartItems.length === 0}
                    onPress={orderHandler}
                />
            </View>
            <View>
                <FlatList 
                    data={cartItems}
                    keyExtractor={item => item.productId}
                    renderItem={itemData => 
                        <CartItem 
                            quantity={itemData.item.quantity} 
                            title={itemData.item.productTitle}
                            amount={itemData.item.sum}
                            deletable
                            onRemove={() => {
                                dispatch(cartActions.removeFromCart(itemData.item.productId))
                                props.showNotification({
                                    message: 'Item was removed from cart'
                                })
                            }}
                        />
                    }
                />
            </View>
        </View>
    )
}
CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    screen: {
        margin: 20    
    },
    summary: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontSize: 18,
        fontWeight: 'bold' 
    },
    amount: {
        color: Colors.primary
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default withInAppNotification(CartScreen)