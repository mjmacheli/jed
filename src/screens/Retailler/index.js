import React, { Component, Fragment} from "react";
import { Image, View,Text, ScrollView, } from "react-native";
import {
  Container,
  Content,
 
} from "native-base";

import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
const chatContactsImg = require("../../../assets/chatcontacts.png");
import {slideHaeder,data} from "./data"

class Retailler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products:[],
      farmID: ''
    }
  }

  farmid = async () => {
    try {
      const value = await AsyncStorage.getItem('farmID')
      if(value !== null) {
        this.setState({farmID: value})
      } else {
        this.setState({farmID: 1})
      }
    } catch(e){
      console.log('error', e)
    }
  }

  async componentWillMount(){
    const id = await AsyncStorage.getItem('farmID')
    fetch(`https://saosa.herokuapp.com/api/Product/get-farm-products?farmID=${id}`)
    .then(response => response.json())
    .then(result => {
      this.setState({products:result})
      console.log('resutls ', this.state.products)
    })
    .catch(error => console.log('error', error));
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
      
        <Content style={styles.content}>
          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
           {this.state.products.map ((i,index) => (
              <View style={{ width: '25%', height: 'auto', margin:17,}}>
                <Image source={{uri:i.image}}  style={{ width: '100%', height: 200, margin:1 }}>
                  
                </Image>
                <Text>{i.name}</Text>
                <Text>{i.price}</Text>
              </View>
           ))}
          </View>
        </Content>
      </Container >
    );
  }
}

export default Retailler;
