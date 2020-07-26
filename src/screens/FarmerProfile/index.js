import React, { useEffect, useState } from 'react'
import { Text, View, Image,ScrollView, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

const FarmerProfile = ({navigation}) => {
    
    const [user, setUser] = useState(null)
    const [farm, setFarm] = useState(null)
    
    useEffect(()=> {
        getData()
    },[])

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('userID')
          if(value !== null) {
            getuser(value)
          }
        } catch(e) {
          console.log("error", e)
        }
    }

    const getuser = (id) => {
        fetch(`https://saosa.herokuapp.com/api/Users/getUser?id=${id}`)
        .then(response => response.json())
        .then(result => {
            setUser(result)
            console.log(result)
        })
        .catch(error => console.log('error', error));

        fetch(`https://saosa.herokuapp.com/api/Farm/get-farm?id=${id}`)
        .then(response => response.json())
        .then(result => {
            setFarm(result)
            console.log(result)
        })
        .catch(error => console.log('error', error));
    }
  
    return (

        <ScrollView style={{flex:1, marginTop:20}}>
            <TouchableOpacity 
                style={{borderColor:"Red", borderWidth:5, width:40,height:40, borderRadius:30,marginLeft:10, alignItems:"center"}}
                onPress={() => navigation.goBack()}
            >
                <Text style={{fontSize:20}}>{"<"}</Text>
            </TouchableOpacity>
           {
               user !== null? 
               <View style={{alignItems:"center", width:"100%"}}>
                   <Text style={{fontSize:40}}>user Details</Text>
                   <Image source={{uri:user.picture}} style={{height:150, width:150, borderWidth:2, borderColor:"red"}}/>
                   <Text>{`Name and Surname : ${user.name}  ${user.surname}`}</Text>
                   <Text>{`Email : ${user.email}`}</Text>
                   <Text>{`Type : ${user.type}`}</Text>
               </View>
               :console.log("null")
           }
           {
               farm !== null?
               <View style={{alignItems:"center", width:"100%", marginTop:10}}>
                   <Text style={{fontSize:40}}>Farm Details</Text>
                   <Image source={{uri:farm.farmPicture}} style={{height:150, width:150, borderWidth:2, borderColor:"red"}}/>
                   <Text>{`Title : ${farm.title}`}</Text>
                   <Text>{`Info : ${farm.info}`}</Text>

                   <TouchableOpacity  
                        style={{alignSelf:"center", width:200, backgroundColor:"green", borderWidth:2, marginTop:15, borderRadius:20, paddingLeft:10}}
                   onPress={()=> navigation.navigate('AddProducts',{farmID:farm.id})}>
                       <Text style={{alignSelf:"center"}}>view Products</Text>
                   </TouchableOpacity>
               </View>
               :null
           }
        </ScrollView>
        
    )
}

export default FarmerProfile