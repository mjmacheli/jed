import React, { Component } from "react";
import { Image, StatusBar, Platform, TouchableOpacity,TextInput } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  View,
  Toast,
  Icon
} from "native-base";
import IconMD from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";

const commonColor = require("../../theme/variables/commonColor");
const logo = require("../../../assets/logo.png");

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(2);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

class Login extends Component {
  textInput;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    console.log('name ', input.name)
    console.log('value ', input.value)
    //input.name === 'email' ? setState({email: input.value}) : setState({password: input.value})  
      if(input.name == 'email') {
        setState({email: input.value})
      }
    return (
      <View>
        <Item error={error && touched} style={styles.inputGrp}>
          <IconMD
            active
            name={
              input.name === "email" ? "mail-outline" : "lock-open"
            }
            color={commonColor.contentTextColor}
            size={20}
          />
          <Input
            placeholderTextColor={commonColor.lightTextColor}
            style={{ color: commonColor.contentTextColor }}
            placeholder={input.name === "email" ? "Email" : "Password"}
            secureTextEntry={input.name === "password" ? true : false}
            {...input}
          />
          {touched && error
            ? <Icon
              active
              style={styles.formErrorIcon}
              onPress={() => this.textInput._root.clear()}
              name="close"
            />
            : <Text />}
        </Item>
        {touched && error
          ? <Text style={styles.formErrorText1}>
            {error}
          </Text>
          : <Text style={styles.formErrorText2}>error here</Text>}
      </View>
    );
  }

  login({email, password}) {
    console.log('email ', email)
    console.log('pw ', password)
  
    fetch(`https://saosa.herokuapp.com/api/Users/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json-patch+json"
      },
      body:JSON.stringify({email: email, password:password})
    })
    .then(res => res.json())
    .then(result => {
        this.setState({user: result})
        this.props.navigation.navigate("Drawer", {id: this.state.user.id});
      })
      .catch(err => {
        return (console.log('not now  ' + err))
      })

    // if (!this.state.user) {
    //   this.props.navigation.navigate("Drawer", {id: this.state.user.id});
    // } else {
    //   Toast.show({
    //     text: "Enter Valid Username & Password!",
    //     duration: 2500,
    //     position: "top",
    //     style: { marginTop: 20 },
    //     textStyle: { textAlign: "center" }
    //   });
    // }
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={styles.backgroundContainer}>
        <StatusBar
          backgroundColor={
            Platform.OS === "android"
              ? commonColor.statusBarColor
              : "transparent"
          }
          barStyle="light-content"
        />
        <Content>
          <View style={styles.logoContainerView}>
            <Image source={logo} style={styles.imageShadow} />
          </View>
          <View style={styles.formContainerView}>
            <View style={styles.formView}>
              <TextInput
                name="email"
                placeholder='Email'
                onChangeText={ email => this.setState({email})}
                type="email"
              />
              <TextInput
                onChangeText={ password => this.setState({ password })}
                secureTextEntry={true}
                placeholder="Password"
                value={this.state.password}
              />
              <Button
                block
                style={styles.loginBtn}
                onPress={() => this.login(this.state)}
              >
                <Text style={{ lineHeight: 16, fontWeight: "bold" }}>
                  LOG IN
                </Text>
              </Button>
              <Button
                transparent
                style={{ alignSelf: "center" }}
                onPress={() => navigation.navigate("Drawer")}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </Button>
            </View>
          </View>
          <View style={styles.footerView}>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.createAccountBtnTxt}>
                SIGNUP
              </Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}
export default Login;
