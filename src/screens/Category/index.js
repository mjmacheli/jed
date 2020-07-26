import React, { Component } from "react";
import { View, Text, StyleSheet,TextInput, TouchableOpacity, Image, Dimensions } from "react-native";
import * as Location from 'expo-location';
const commonColor = require("../../theme/variables/commonColor");
const logo = require("../../../assets/logo.png");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          info:"",
          image: null,
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

      componentDidMount() {
        this.getPermissionAsync();
      }
    

      getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      };
    
      _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
          });
          if (!result.cancelled) {
            this.setState({ image: `data:image/jpg;base64,${result.base64}`});
        }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };

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
            "farmPicture":this.state.image,
            "userID": this.props.navigation.state.params.userID
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

                    {
                    this.state.image === null ?

                    <TouchableOpacity onPress={this._pickImage} style={{alignSelf:"center", justifyContent:"center", width:150, height:150, borderRadius:75, borderWidth:2, marginBottom:20}}>
                    <Text style={{textAlign:"center"}}>user picture</Text>
                    </TouchableOpacity>:
                    <Image source={{ uri: this.state.image }} style={{alignSelf:"center", justifyContent:"center", width:150, height:150,borderRadius:75, borderWidth:2, marginBottom:20}}/>
                    }
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

                <TouchableOpacity style={styles.category} onPress={() => this.addFarm()} >
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
