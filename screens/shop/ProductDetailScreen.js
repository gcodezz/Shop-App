import React from 'react'
import {
    View,
    ScrollView,
    Text,
    Image,
    Button,
    StyleSheet,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { withInAppNotification } from 'react-native-in-app-notification'

import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'


const ProductDetailScreen = props => {
    const dispatch = useDispatch()
    const productId  = props.navigation.getParam('productId')
    const selectedProduct = useSelector(
        state => state.products.availableProducts.find(
            product => product.id === productId)
    )

    return (
        <ScrollView>
            <Image 
                style={styles.image} 
                source={{uri: selectedProduct.imageUrl}}
            />
            <View style={styles.actions}>
                <Button 
                    title='Add to Cart' 
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct))
                        props.showNotification({
                            message: 'Item was added to cart',
                            onPress: () => Alert.alert('Alert', 'You clicked the notification!')
                        })
                    }}
                    color={Colors.primaryColor}
                />
            </View>
            
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 350,
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
})

export default withInAppNotification(ProductDetailScreen)