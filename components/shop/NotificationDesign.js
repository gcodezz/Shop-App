import React from 'react'
import { View, Text } from 'react-native'

export default NotificationDesign = (props) => {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
      >
      <Text style={{
        color: 'white',
        fontWeight: 'bold',      
        marginBottom: 15,
      }}
      >{props.message}</Text>
        
      </View>
    )
  }