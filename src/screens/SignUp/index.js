import React, {Component} from "react";
import {Image, TouchableOpacity} from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  View,
  ListItem,
  Radio
} from "native-base";
import RadioGroup from 'react-native-custom-radio-group';
import {Grid, Col} from "react-native-easy-grid";
import styles from "./styles";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const commonColor = require("../../theme/variables/commonColor");
const logo = require("../../../assets/logo.png");
import AsyncStorage from '@react-native-community/async-storage';


const radioGroupList = [{
  label: 'Farmer',
  value: 'farmer'
}, {
  label: 'Supplier',
  value: 'supplier'
}, {
  label: 'Consumer',
  value: 'consumer'
}];

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      surname: "",
      email: "",
      password: "",
      mobileoremail:"",
      confirmPassword:"",
      activeBgColor: "white",
      activeTxtColor: "black",
      inActiveBgColor: "white",
      inActiveTxtColor: "black",
      type:"",
      image: null,
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  async storeData(value){
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('userID', jsonValue)
    } catch (e) {
      console.log("error")
    }
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

  register = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const navigation = this.props.navigation;

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        "email":this.state.mobileoremail,
        "password":this.state.password,
        "picture":this.state.image,
        "surname":this.state.surname ,
        "type":this.state.type,
        "name":this.state.firstname
      })
    };

    fetch("https://saosa.herokuapp.com/api/users/register", requestOptions)
      .then(response => response.json())
      .then(result => {
        storeData(result)
        if(this.state.type === "farmer"){
          navigation.navigate("Category", {userID:result})
        }
        else(
          navigation.navigate("Drawer")
        )
      }
      )
      .catch(error => console.log('error', error));
  }

  changeStyle(value) {
    if(value == "farmer") {
        this.setState({
              activeBgColor: "red",
              activeTxtColor: "white",
              inActiveBgColor: "white",
              inActiveTxtColor: "black",
              type:"farmer"
        });
    } else if(value == "supplier") {
        this.setState({
              activeBgColor: "blue",
              activeTxtColor: "white",
              inActiveBgColor: "white",
              inActiveTxtColor: "black",
              type:"supplier"

        });
    } else if(value == "consumer") {
         this.setState({
               activeBgColor: "green",
               activeTxtColor: "white",
               inActiveBgColor: "white",
               inActiveTxtColor: "black",
               type:"consumer"
         });
    }
}

  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={styles.background}>
        <Content>
          <View style={styles.logoContainerView}>
            <Image source={logo} style={styles.imageShadow} />
          </View>
          <View style={styles.formContainerView}>
            {
              this.state.image === null ?

              <TouchableOpacity onPress={this._pickImage} style={{alignSelf:"center", justifyContent:"center", width:150, height:150, borderRadius:75, borderWidth:2}}>
              <Text style={{textAlign:"center"}}>user picture</Text>
            </TouchableOpacity>:
              <Image source={{ uri: this.state.image }} style={{alignSelf:"center", justifyContent:"center", width:150, height:150,borderRadius:75, borderWidth:2}}/>
            }
          
            <Grid>
              <Col style={{paddingRight: 10}}>
                <Item borderType="underline" style={styles.inputGrp}>
                  <Input
                    placeholder="First Name"
                    placeholderTextColor={commonColor.lightTextColor}
                    onChangeText={firstname => this.setState({firstname})}
                    style={{color: "#000"}}
                  />
                </Item>
              </Col>
              <Col style={{paddingLeft: 10}}>
                <Item borderType="underline" style={styles.inputGrp}>
                  <Input
                    placeholder="Surname"
                    placeholderTextColor={commonColor.lightTextColor}
                    onChangeText={surname => this.setState({surname})}
                    style={{color: "#000"}}
                  />
                </Item>
              </Col>
            </Grid>
            <Item borderType="underline" style={styles.inputGrp}>
              <Input
                placeholder="Email address"
                placeholderTextColor={commonColor.lightTextColor}
                onChangeText={mobileoremail => this.setState({mobileoremail})}
                style={{color: "#000"}}
              />
            </Item>
            <Item borderType="underline" style={styles.inputGrp}>
              <Input
                placeholder="Enter New password"
                placeholderTextColor={commonColor.lightTextColor}
                secureTextEntry
                onChangeText={password =>
                  this.setState({password})}
                style={{color: "#000"}}
              />
            </Item>
            <Item borderType="underline" style={styles.inputGrp}>
              <Input
                placeholder="Re-enter your New password"
                placeholderTextColor={commonColor.lightTextColor}if
                secureTextEntry
                onChangeText={confirmPassword => this.setState({confirmPassword})}
                style={{color: "#000"}}
              />
            </Item>

            <RadioGroup
                radioGroupList={radioGroupList}
                buttonContainerActiveStyle = {{backgroundColor: this.state.activeBgColor}}
                buttonTextActiveStyle = {{color: this.state.activeTxtColor}}
                buttonContainerInactiveStyle = {{backgroundColor: this.state.inActiveBgColor}}
                buttonTextInactiveStyle = {{color: this.state.inActiveTxtColor}}
                onChange={(value) => {this.changeStyle(value);}}
          />
            <Button
              block
              style={styles.createBtn}
              onPress={() => this.register()}
            >
              <Text style={{lineHeight: 16, fontWeight: "bold"}}>CREATE</Text>
            </Button>
          </View>
          <View style={styles.footerView}>
            <Button
              transparent
              style={styles.signInBtn}
              onPress={() => navigation.navigate("Home", {
                "email":this.state.mobileoremail,
                "password":this.state.password,
                "picture":"",
                "surname":this.state.surname ,
                "name":this.state.firstname
              })}
            >
              <Text style={styles.signInBtnText}>
                Have an Account already? Sign In
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default SignUp;