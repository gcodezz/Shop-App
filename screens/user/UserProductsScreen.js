import React, { 
    useState, 
    useEffect 
} from 'react'
import { 
    View,
    Text,
    FlatList, 
    Button, 
    Platform,
    Alert,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { withInAppNotification } from 'react-native-in-app-notification'

import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products'

const UserProductsScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()

    const editProductHandler = (id) => {
        props.navigation.navigate({
            routeName: 'EditProduct',
            params: {
                productId: id
            }
        })
    }

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured!', error, [{ text: 'Okay' }])
        }
    }, [error])

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you want to delete the item?', [
            { text: 'No', style: 'default' },
            { 
                text: 'Yes', 
                style: 'destructive', 
                onPress: async() => {
                    setError(null)
                    setIsLoading(true)
                    try {
                        await dispatch(productsActions.deleteProduct(id))
                        props.showNotification({
                            message: 'Product has been deleted'
                        })
                    } catch (e) {
                        setError(e.message)
                    }
                    setIsLoading(false)
                }
            }
        ])
        
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    if (userProducts.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>No products found, maybe start creating some?</Text>
            </View>
        )
    }

    return (
        <FlatList 
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id)
                    }}
                >
                    <Button 
                        color={Colors.primary}
                        title='Edit'
                        onPress={() => {
                            editProductHandler(itemData.item.id)
                        }}    
                    />
                    <Button 
                        color={Colors.primary}
                        title='Delete'
                        onPress={deleteHandler.bind(this, itemData.item.id)}
                    />
                </ProductItem>
            )}
        />
    )
}

UserProductsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Products',
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
                    title='Menu' 
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navData.navigation.navigate({
                            routeName: 'EditProduct',
                            params: {
                                headerName: 'Edit Product'
                            }
                        })
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

export default withInAppNotification(UserProductsScreen)