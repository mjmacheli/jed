import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

const FarmerProfile = () => {

    let name ='tomatosedfdf'
    let farmID = 1
    let category = 'string'
        fetch('https://saosa.herokuapp.com/api/Product/add-products', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json-patch+json'
        },
        body:JSON.stringify({name, farmID, category})
    })
    .then(res => {res.status == 200})
    .catch(err => {
        return (console.log('not now  ' + err))
      })
    
    return (
        <Text>
            profile .........
        </Text>
    )
}

export default FarmerProfile