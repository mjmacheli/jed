import React from "react";
import { Dimensions, Platform } from "react-native";
const commonColor = require("../../theme/variables/commonColor");
import { Button, Icon, Footer, FooterTab, Badge, Text } from "native-base";
import IconMD from "react-native-vector-icons/MaterialCommunityIcons";
import IconMI from "react-native-vector-icons/MaterialIcons";
import IconAD from "react-native-vector-icons/AntDesign";
import Friends from "../Friends";
import Consumer from "./index";
import Notifications from "../Notifications";
import Chat from "../Chat";
import Settings from "../Settings";
import { createBottomTabNavigator } from "react-navigation";
import styles from "./styles";
const { height } = Dimensions.get("window");
const heightRatio = height / 667;
const HomeTabNavigation = createBottomTabNavigator(
  {
    Consumer: { screen: Consumer },
    Friends: { screen: Friends },
    Chat: { screen: Chat },
    Notifications: { screen: Notifications },
    Settings: { screen: Settings }
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
            <Button onPress={() => props.navigation.navigate("Consumer")}>
              {props.navigation.state.index === 0 ? (
                <IconMD
                  name={"home"}
                  size={24}
                  color="#0b3d20"
                />
              ) : (
                  // <IconMD></IconMD>
                  <IconAD name="home" size={24} color={"grey"} />
                )}
            </Button>
            
            
            <Button
              badge
              vertical
              onPress={() => props.navigation.navigate("Notifications")}
            >
              <Badge>
                <Text>4</Text>
              </Badge>
              <Icon
                name={
                  props.navigation.state.index === 3
                    ? "calendar"
                    : "calendar"
                }
                style={
                  props.navigation.state.index === 3
                    ? styles.activeIcon
                    : undefined
                }
              />
            </Button>
            <Button onPress={() => props.navigation.navigate("Settings")}>
              <IconMD
                name={
                  props.navigation.state.index === 4
                    ? "settings"
                    : "settings-outline"
                }
                color={
                  props.navigation.state.index === 4
                    ? "#0b3d20"
                    : "grey"
                }
                size={24}
              />
            </Button>
            
          </FooterTab>
        </Footer>
      );
    }
  }
);

export default HomeTabNavigation;
