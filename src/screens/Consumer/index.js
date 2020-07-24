import React, { Component } from "react";
import { Image, View, } from "react-native";
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


class Consumer extends Component {


  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Header searchBar >
          <Item style={{ borderRadius: 6, backgroundColor: "rgba(255,255,255,0.5)" }}>
            <Icon name="search" style={{ color: "#fff" }} />
            <Input
              placeholderTextColor={"rgba(255,255,255,0.5)"}
              placeholder="Search"
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

          <View style={{ ...styles.listViewBlock, alignItems: "center", justifyContent: "center" }}>


            {data.map((item) => (<Card style={{ width: "95%", }} key={item.id}>
              <View style={{ backgroundColor: "white", opacity: 0.9 }}>
                <Image source={item.img} style={{ width: "100%", height: 200 }} />
              </View>



              <CardItem>


                <Body>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ paddingHorizontal: 10, }}>
                      <Image source={item.img} style={{ width: 50, height: 50, borderRadius: 25, }} />
                    </View>
                    <View>
                      <Text style={{ color: "black", fontSize: 15, fontWeight: "bold" }}>{item.title}</Text>
                      <Text style={{ color: "gray", fontSize: 14 }}>{item.descr}</Text>
                      <Text style={{ color: "gray", fontSize: 14 }}>{item.km}</Text>
                    </View>

                  </View>

                </Body>


              </CardItem>


            </Card>))}

          </View>
        </Content>
      </Container >
    );
  }
}

export default Consumer;
