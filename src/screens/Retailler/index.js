import React, { Component, Fragment} from "react";
import { ImageBackground,Image, View,Text, ScrollView, } from "react-native";
import {
  Container,
  Content,
 
} from "native-base";

import styles from "./styles";
import {slideHaeder,data} from "./data"
const chatContactsImg = require("../../../assets/chatcontacts.png");


class Retailler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products:[]
    }
  }
  componentWillMount(){
    fetch(`https://saosa.herokuapp.com/api/Product/get-farm-products?farmID=${1}`)
    .then(response => response.json())
    .then(result => {
      this.setState({products:result})})
    .catch(error => console.log('error', error));
  }

  render() {
    const navigation = this.props.navigation;
    console.log('props ', this.props)
    return (
      <Container>
      
        <Content style={styles.content}>
          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            {this.state.products.map ((i,index) => (
              <View style={{ width: '25%', height: 200, margin:10}}>
              <Image source={data[index].img}  style={{ width: '100%', height: 200, margin:1 }}>
                
              </Image>
              <Text>{i.name}</Text>
              </View>
            ))}
          </View>
        </Content>
      </Container >
    );
  }
}

export default Retailler;
