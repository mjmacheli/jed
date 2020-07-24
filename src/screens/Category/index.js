import React, { Component } from "react";
import { View, Text, StyleSheet,TextInput, TouchableOpacity, Image, Dimensions } from "react-native";
import * as Location from 'expo-location';
const commonColor = require("../../theme/variables/commonColor");
const logo = require("../../../assets/logo.png");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          info:"",
          location:null,
          ...props
        };
      }

      async componentWillMount(){
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location)
            console.log('--Beg--')
            console.log(this.props)
            console.log('--End--')
            this.setState({location:location});
      }

      addFarm = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json-patch+json");
        const navigation = this.props.navigation;
        console.log('state ' + this.state.name)
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify({
            "title":this.state.name,
            "longitude":`${this.state.location.coords.longitude}`,
            "latitude":`${this.state.location.coords.latitude}`,
            "info":this.state.info,
            "farmPicture":"",
            // "userID": this.props.navigation.state.params.userID
          })
        };
        fetch("https://saosa.herokuapp.com/api/Farm/add-farm", requestOptions)
          .then(response => response.json())
          .then(result =>
            navigation.navigate("Drawer", {farm:result})
          )
          .catch(error => console.log('error', error));
      }

      gotof() {
        this.props.navigation.navigate("FarmerProfile")
      }
    render() {
        const navigation = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.logoContainerView}>
                    <Image source={logo} style={styles.imageShadow} />
                </View>
                <View style={{ margin: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Farm details</Text>
                </View>
                <View>
                    <TextInput
                    placeholder="farm name"
                    onChangeText={name => this.setState({name})}
                    style={{color: "#000", borderWidth:1, borderColor:"black"}}
                />
                <TextInput
                    placeholder="information"
                    onChangeText={info => this.setState({info})}
                    style={{color: "#000", borderWidth:1, borderColor:"black", marginTop:10, width: 300}}
                />

                </View>

                <TouchableOpacity style={styles.category} onPress={() => this.gotof()} >
                    <Text style={{ color: "white" }}>Add Farm</Text>
                </TouchableOpacity>
                
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    category: {
        backgroundColor: "#0b3d20",
        padding: 20,
        marginTop: 10,
        width: deviceWidth / 3,
        alignItems: "center"

    },
    logoContainerView: {
        height: deviceHeight / 3,
        backgroundColor: commonColor.brandPrimary
    },
    imageShadow: {
        width: deviceWidth / 3,
        height: deviceWidth / 3,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: deviceHeight / 12
    },
});

export default Category;
