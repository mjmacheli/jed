import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Header,
  Item,
  Input,
  Icon,
  Button
} from "native-base";
import data from "./data";
import styles from "./styles";



const chatContactsImg = require("../../../assets/chatcontacts.png");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farm:[],
      searchResult:[],
      searching:false
    };
  }
  componentWillMount(){
    fetch("https://saosa.herokuapp.com/api/Farm/get-farms")
    .then(response => response.json())
    .then(result => {
      this.setState({farm:result})
    console.log(result)})
    .catch(error => console.log('error', error));
  }

  search = (text) =>{
    var searchResult = this.state.farm.filter(function(farm){
      if(farm.title.toUpperCase().includes(text.text.toUpperCase()) || farm.info.toUpperCase().includes(text.text.toUpperCase())){
        return farm
      }
    })
    this.setState({searchResult:searchResult})
  }


  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={{marginTop:40}}>
        <Header searchBar >
          <Item style={{ borderRadius: 6, backgroundColor: "rgba(255,255,255,0.5)" }}>
            <Icon name="search" style={{ color: "#fff" }} />
            <Input
              placeholderTextColor={"rgba(255,255,255,0.5)"}
              placeholder="Search"
              onChangeText={text => this.search({text})}
              onFocus={() => this.setState({searching:true})}
            />
          </Item>

          <Button
            transparent
            style={styles.headerBtn}
            onPress={() => navigation.openDrawer()}
          >
            <Image source={chatContactsImg} style={styles.sidebarIcon} />
          </Button>
        </Header>
        <Content style={styles.content}>
          {
            this.state.searching ?  
            <View style={{ ...styles.listViewBlock, alignItems: "center", justifyContent: "center" }}>
            {this.state.searchResult.map((item) => (
              <Card 
                style={{ width: "95%", }} 
                key={item.id}>
             
                  <View style={{ backgroundColor: "white", opacity: 0.9 }}>
                    <Image source={item.farmPicture} style={{ width: "100%", height: 200 }} />
                  </View>
                  <CardItem
                    button 
                    onPress={() => alert("This is Card Header")}>
                    <Body>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ paddingHorizontal: 10, }}>
                          <Image source={item.farmPicture} style={{ width: 50, height: 50, borderRadius: 25, }} />
                        </View>
                        <View>
                          <Text style={{ color: "black", fontSize: 15, fontWeight: "bold" }}>{item.title}</Text>
                          <Text style={{ color: "gray", fontSize: 14 }}>{item.info}</Text>
                        </View>
                      </View>
                    </Body>
                  </CardItem>
              </Card>))}

          </View> :

            <View style={{ ...styles.listViewBlock, alignItems: "center", justifyContent: "center" }}>


            {this.state.farm.map((item) => (<Card style={{ width: "95%", }} key={item.id}>
              <View style={{ backgroundColor: "white", opacity: 0.9 }}>
                <Image source={item.farmPicture} style={{ width: "100%", height: 200 }} />
              </View>
              <CardItem 
                button 
                  onPress={() => {
                    navigation.navigate("Retailler", {farmID: item.id})}
                  }>
                <Body>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ paddingHorizontal: 10, }}>
                      <Image source={item.farmPicture} style={{ width: 50, height: 50, borderRadius: 25, }} />
                    </View>
                    <View>
                      <Text style={{ color: "black", fontSize: 15, fontWeight: "bold" }}>{item.title}</Text>
                      <Text style={{ color: "gray", fontSize: 14 }}>{item.info}</Text>
                    </View>
                  </View>
                </Body>
              </CardItem>
            </Card>))}

          </View>
          }

          
        </Content>
      </Container >
    );
  }
}

export default Home;
