import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import Login from "./screens/Login/";
import SignUp from "./screens/SignUp/";
import HomeTabNavigation from "./screens/Home/tabNavigation";
import SideBar from "./screens/Sidebar/";
import UpdatePost from "./screens/UpdatePost/";
import ChatScreen from "./screens/Chat/ChatScreen";
import Profile from "./screens/Profile";
import NearbyFriends from "./screens/NearbyFriends";
import BlankPage from "./screens/BlankPage";
import Category from "./screens/Category";
import Calendar from "./screens/Calendar";
import Retailler from "./screens/Retailler/tabNavigation";
import Consumer from "./screens/Consumer/tabNavigation";
import FarmerProfile from './screens/FarmerProfile'

const Drawer = DrawerNavigator(
  {
    Consumer: { screen: Consumer },
    Retailler: { screen: Retailler },
    HomeTabNavigation: { screen: HomeTabNavigation },
    Profile: { screen: Profile },
    NearbyFriends: { screen: NearbyFriends },
    BlankPage: { screen: BlankPage },
    FarmerProfile: {screen: FarmerProfile}

  },
  {
    initialRouteName: "HomeTabNavigation",
    contentComponent: props => <SideBar {...props} />
  }
);

const App = StackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    Drawer: { screen: Drawer },
    UpdatePost: { screen: UpdatePost },
    ChatScreen: { screen: ChatScreen },
    Category: { screen: Category },
    Calendar: { screen: Calendar },
    Retailler: { screen: Retailler },
    FarmerProfile: { screen: FarmerProfile}

  },
  {
    index: 0,
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <App />
  </Root>;
