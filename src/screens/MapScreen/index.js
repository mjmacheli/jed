import React, { Component } from "react";
import MapView from 'react-native-maps';
import {  StyleSheet, View, Dimensions} from "react-native"
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Title,
  
} from "native-base";
import * as Location from 'expo-location';

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farm:[],
      currentLocation:null
    };
  }

  async componentWillMount(){
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({currentLocation:location});

      fetch("https://saosa.herokuapp.com/api/Farm/get-farms")
      .then(response => response.json())
      .then(result => this.setState({farm:result}))
      .catch(error => console.log('error', error));
  }

  render() {
    console.log(this.state.farm)
    console.log(this.state.currentLocation)
    const navigation = this.props.navigation;
    return (
        
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Nearest Farm</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <Content >

      {
        this.state.currentLocation === null ? null :
        <MapView
        style={{ height:500 }}
        initialRegion={{
          latitude: this.state.currentLocation.coords.latitude,
          longitude:this.state.currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {
          this.state.farm.map(item => 
            <MapView.Marker
              coordinate={{latitude: parseFloat(item.latitude),
                  longitude: parseFloat(item.longitude),}}
              title={item.title}
              description={item.info}
            />    
          )
        }    
      </MapView>
      }

            </Content>
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });


export default MapScreen;
