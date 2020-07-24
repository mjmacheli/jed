import { Dimensions, Platform } from "react-native";

const commonColor = require("../../theme/variables/commonColor");
const { height } = Dimensions.get("window");
const heightRatio = height / 667;
export default {
  drawerContent: {
    paddingTop: Platform.OS === "android" ? 0 : 35 * heightRatio,
    backgroundColor: "#0b3d20"
  },
  headerView: {
    flexDirection: "row",
    paddingLeft: 15,

    marginLeft: Platform.OS === "ios" ? undefined : -30,
    marginBottom: 5
  },
  backWhite: {
    backgroundColor: "white",
    height: heightRatio * 550
  },
  searchBlockView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginTop: Platform.OS === "android" ? 10 : 0
  },
  sidebarSearch: {
    flex: 1,
    height: Platform.OS === "android" ? 35 : 35,
    paddingBottom: 0,

    marginLeft: Platform.OS === "android" ? 25 : null,
    backgroundColor: commonColor.brandPrimary,
    borderRadius: 8,
    borderBottomWidth: 0,
    paddingLeft: 15
  },
  searchIcon: {
    fontSize: 20,
    color: "#fff"
  },
  searchPlaceholder: {
    top: Platform.OS === "ios" ? undefined : -2
  },
  settingsIcon: {
    color: "#fff",
    fontSize: 28
  },
  userDataListitem: {
    paddingBottom: 15,
    paddingLeft: Platform.OS === "android" ? 0 : 0,
    position: "relative"
  },
  userDataNameText: {
    color: "#FFFFFF",
    fontSize: 18
  },
  userDataDescriptionText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 13,
    fontWeight: "bold"
  },
  userDataArrowIcon: {
    color: "rgba(255,255,255,0.3)",
    position: "absolute",
    right: 10,
    top: 25
  },
  menuHeadView: {
    backgroundColor: "#f7f7f7"
  },
  menuHeaderText: {
    color: commonColor.lightTextColor,
    fontSize: 12,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 10
  },
  menuIconContainerView: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  menuIcon: {
    fontSize: Platform.OS === "ios" ? 25 : 25,
    color: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  menuItemText: {
    paddingLeft: 15,
    color: commonColor.contentTextColor,
    fontSize: 15
  },
  contactList: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    borderTopWidth: 1,
    borderTopColor: "#DDDEE3",
    paddingBottom: 30
  }
};
