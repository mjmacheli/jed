import React from "react";
import { Dimensions, Platform } from "react-native";
const commonColor = require("../../theme/variables/commonColor");
import { Button, Icon, Footer, FooterTab, Badge, Text } from "native-base";
import IconMD from "react-native-vector-icons/MaterialCommunityIcons";
import IconMI from "react-native-vector-icons/MaterialIcons";
import IconAD from "react-native-vector-icons/AntDesign";
import Friends from "../Friends";
import Home from "./index";
import Notifications from "../Notifications";
import Chat from "../Chat";
import Settings from "../Settings";
import BarCode from "../BarCode";
import MapScreen from "../MapScreen"
import Calendar from "../Calendar"
import { createBottomTabNavigator } from "react-navigation";
import styles from "./styles";
import ContentProvider from "../ContentProvider"
const { height } = Dimensions.get("window");
const heightRatio = height / 667;
const HomeTabNavigation = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Friends: { screen: Friends },
    Chat: { screen: Chat },
    Notifications: { screen: Notifications },
    Settings: { screen: Settings },
    BarCode:{screen:BarCode },
    MapScreen: { screen: MapScreen },
    Calendar: { screen: Calendar },
    ContentProvider: { screen: ContentProvider}
  },
  {
    tabBarPosition: "bottom",
    lazy: true,
    tabBarComponent: props => {
      return (
        <Footer
          style={{ height: Platform.OS === "ios" ? 57 * heightRatio : null }}
        >
          <FooterTab>
            <Button onPress={() => props.navigation.navigate("Home")}>
              {props.navigation.state.index === 0 ? (
                <IconMD
                  name={"home"}
                  size={24}
                  color="#0b3d20"
                />
              ) : (
                  // <IconMD></IconMD>
                  <IconAD name="home" size={24} color={"62172"} />
                )}
            </Button>
            {/* <Button onPress={() => props.navigation.navigate("ContentProvider")}>
              <IconMD
                name={
                  props.navigation.state.index === 1
                    ? "file-document-box-multiple"
                    : "file-document-box-multiple"
                }
                color={
                  props.navigation.state.index === 1
                    ? "#0b3d20"
                    : "grey"
                }
                size={24}
              />
            </Button> */}
            <Button onPress={() => props.navigation.navigate("MapScreen")}>
              <IconMD
                name={
                  props.navigation.state.index === 2
                    ? "map-marker"
                    : "map-marker"
                }
                color={
                  props.navigation.state.index === 2
                    ? "#0b3d20"
                    : "grey"
                }
                size={26}
              />
            </Button>
            {/* <Button
              badge
              vertical
              onPress={() => props.navigation.navigate("Calendar")}
            >
              <Badge>
                <Text>4</Text>
              </Badge>
              <Icon
                name={
                  props.navigation.state.index === 3
                    ? "notifications"
                    : "notifications"
                }
                style={
                  props.navigation.state.index === 3
                    ? styles.activeIcon
                    : undefined
                }
              />
            </Button> */}
           
          </FooterTab>
        </Footer>
      );
    }
  }
);

export default HomeTabNavigation;
