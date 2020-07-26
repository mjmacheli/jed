import React, { Component, Fragment} from "react";
import { TextInput,Image, View,Text, ScrollView, TouchableOpacity, } from "react-native";
import {
  Container,
  Content,
 
} from "native-base";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products:[],
      adding:false,
      image:null,
      name:"",
      price:""
    }
  }
  componentWillMount(){
    fetch(`https://saosa.herokuapp.com/api/Product/get-farm-products?farmID=${this.props.navigation.state.params.farmID}`)
    .then(response => response.json())
    .then(result => {
      this.setState({products:result})})
    .catch(error => console.log('error', error));
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

      console.log(result.base64);
    } catch (E) {
      console.log(E);
    }
  };

  AddProduct(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`https://saosa.herokuapp.com/api/Product/add-products`,
    {
        method:"POST",
        headers: myHeaders,
        body: JSON.stringify({
            "name":this.state.name,
            "image":this.state.image,
            "price": this.state.price,
            "farmID": this.props.navigation.state.params.farmID 
        })
        
    } 
    )
    .then( this.props.navigation.goBack())
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Content>
        <TouchableOpacity 
                style={{borderColor:"Red", borderWidth:5, width:40,height:40, borderRadius:30,marginLeft:10, alignItems:"center"}}
                onPress={() => navigation.goBack()}
            >
                <Text style={{fontSize:20}}>{"<"}</Text>
            </TouchableOpacity>
            {
                !this.state.adding ?
                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            {this.state.products.map ((i,index) => (
              <View style={{ width: '25%', height: 200, marginHorizontal:10, marginVertical:30}}>
              <Image source={{uri:i.image}}  style={{ width: '100%', height: 200, margin:1 }}>
                
              </Image>
              <Text>{i.name}</Text>
              </View>
            ))}
            <TouchableOpacity style={{height:150, width:'25%',justifyContent:"center", alignSelf:"center", borderRadius:50, borderWidth:4}} onPress={() => this.setState({adding:true})}>
                <Text style={{alignSelf:"center"}}>Add</Text>                
            </TouchableOpacity>
          </View>
          :
          <Content style={{marginTop:40}}>
                    {
                    this.state.image === null ?

                    <TouchableOpacity onPress={this._pickImage} style={{alignSelf:"center", justifyContent:"center", width:150, height:150, borderRadius:75, borderWidth:2, marginBottom:20}}>
                    <Text style={{textAlign:"center"}}>product image</Text>
                    </TouchableOpacity>:
                    <Image source={{ uri: this.state.image }} style={{alignSelf:"center", justifyContent:"center", width:150, height:150,borderRadius:75, borderWidth:2, marginBottom:20}}/>
                    }
            <TextInput
                name="name"
                placeholder='name'
                onChangeText={ name => this.setState({name})}
                type="text"
                style={{alignSelf:"center", width:200, borderColor:"black", borderWidth:2, marginTop:5, borderRadius:20, paddingLeft:10}}
            />
            <TextInput
                name="price"
                placeholder='price'
                onChangeText={ price => this.setState({price})}
                type="text"
                style={{alignSelf:"center", width:200, borderColor:"black", borderWidth:2, marginTop:5, borderRadius:20, paddingLeft:10}}
            />
            <TouchableOpacity 
            style={{alignSelf:"center", width:200, backgroundColor:"green", borderWidth:2, marginTop:5, borderRadius:20, paddingLeft:10}}
                onPress={() => this.AddProduct()}
            >
                <Text style={{alignSelf:"center"}}>Add</Text>
            </TouchableOpacity>
         
        </Content>
            }
          
        </Content>
      </Container >
    );
  }
}

export default ProductsPage;
