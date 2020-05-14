import React, { useEffect, useState, useCallback } from 'react'
import {
    FlatList,
    StyleSheet,
    Button,
    Platform,
    Alert,
    ActivityIndicator,
    View,
    Text
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { withInAppNotification } from 'react-native-in-app-notification'

import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import HeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState()
    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()

    const loadProducts = useCallback(async() => {
        setIsRefreshing(true)
        setError(null)
        try {
            await dispatch(productsActions.fetchProducts())
        } catch (err) {
            setError(err.message)
        }
        setIsRefreshing(false)
    }, [dispatch, setIsLoading, setError])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'willFocus', 
            loadProducts
        )

        return () => {
            willFocusSub.remove()
        }
    }, [loadProducts])

    useEffect(() => {
        setIsLoading(true)
        loadProducts().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadProducts])

    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title 
            }
        })
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occurred!</Text>
                <Button 
                    title='Try again'
                    onPress={loadProducts}
                    color={Colors.primary}
                ></Button>
            </View>
        ) 
    }

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

    if(!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe add some products</Text>
            </View>
        )
    }

    //console.log(products)
    return (
        <FlatList 
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl} 
                    title={itemData.item.title} 
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title)
                    }}
                >
                    <Button 
                        color={Colors.primary}
                        title='View Details'
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title)
                        }}    
                    />
                    <Button 
                        color={Colors.primary}
                        title='To Cart'
                        onPress={() => {
                            props.showNotification({
                                message: 'Item was added to cart'
                            })
                            dispatch(cartActions.addToCart(itemData.item))
                        }}
                    />
                </ProductItem>
            }
        />
    )
}

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Products',
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
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Cart' 
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => {
                        navData.navigation.navigate('Cart')
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

export default withInAppNotification(ProductsOverviewScreen)