const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const commonColor = require("../../theme/variables/commonColor");

export default {
  backgroundContainer: {
    backgroundColor: "#FFFFFF"
  },
  logoContainerView: {
    height: deviceHeight / 3,
    
  },
  imageShadow: {
    width: deviceWidth / 3,
    height: deviceWidth / 3,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: deviceHeight / 12
  },
  formContainerView: {
    height: deviceHeight / 2,
    flexDirection: "row",
    alignSelf: "center",
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 10,
    paddingRight: 10
  },
  formView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    
  },
  inputGrp: {
    paddingLeft: 0,
    paddingRight: 0,
    flexDirection: "row"
  },
  formErrorIcon: {
    color: "black",
    marginTop: 5,
    right: 10
  },
  formErrorText1: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: commonColor.brandDanger,
    textAlign: "right"
  },
  formErrorText2: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: "transparent",
    textAlign: "right"
  },
  loginBtn: {
    backgroundColor: "#0b3d20",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 15,
    marginBottom: 5
  },
  forgotPasswordText: {
    fontSize: 15,
    fontWeight: "bold",
    color: commonColor.lightTextColor
  },
  footerView: {
    flex: 1,
    height: deviceHeight / 7
  },
  createAccountBtn: {
    alignSelf: "center",
    borderRadius: 0,
    bottom: 0,
    borderColor: commonColor.lightTextColor,
    position: "absolute"
  },
  createAccountBtnTxt: {
    color: commonColor.lightTextColor,
    fontWeight: "bold",
    fontSize: 14
  }
};
