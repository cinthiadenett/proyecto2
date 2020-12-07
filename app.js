import React, {Component} from 'react';
import { AppLoading } from 'expo';
import {  Container, Header, Title, Content, Footer, FooterTab, Button, 
          Right, Body, Text, InputGroup, Input, Icon, Card, CardItem} from 'native-base';
import * as Font from 'expo-font';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const axios = require("axios");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handlerButtom = this.handlerButtom.bind(this);
    this.handlerChange = this.handlerChange.bind(this);
    this.state = {
      isReady: false,
      response: [],
      consulteApi: false,
      data: 0
    };
  }

  handlerChange = (text) => {
    var valor = text;
    this.setState({ value: valor });
    console.log(valor);

  }

  handlerButtom = () => {
    console.log("handleado");
    var nombre = this.state.value;
    axios.get('https://www.anapioficeandfire.com/api/characters',{params:{name:nombre}})
      .then( response =>{

        if(response.data[0] === undefined || response.data[0] === null || response.data[0] === 0 || response.data[0] === ''){
          console.log(response);
          this.setState({consulteApi:false});
        }else{
          console.log(response);
          this.setState({consulteApi:true, data: response.data[0]});
        }

      })
      .catch(error => {
       
        console.log(error);
      });

  }
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    if(this.state.consulteApi === true){
      return (
        <Container>
        <Header>
          <Body>
            <Title>Ice And Fire And Game of Thrones  API</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <InputGroup borderType="rounded" >
            <Icon name="md-search" style={{color: '#9999ff'}}></Icon>
            <Input  onChangeText={this.handlerChange.bind(this)} style={{color: '#00c497'}} />
          </InputGroup>
          <Button onPress={this.handlerButtom.bind(this)} full info>
            <Text>Buscar</Text>
          </Button> 
          <Card style={{flex: 0}}>
            <CardItem>
              <Body>
                <Image source={{uri: this.state.data.img}} style={{height: 500, width: 310, flex: 1}}/>
                <Text>Nombre: {this.state.data.name}</Text>
                <Text>Nickname: {this.state.data.nickname}</Text>
                <Text>Ocupaciones: </Text>
                <Text>Titulo: {this.state.data.title}</Text>
                <Text>nacio: {this.state.data.born}</Text>
                <Text>Murio: {this.state.data.die}</Text>
                <Text>Actor: {this.state.data.portrayed}</Text>
                <Text>Estado: {this.state.data.status}</Text>
                <Text>Temporadas activo: </Text>
              </Body>
            </CardItem>
           </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Api ReactNative </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
    }else{
      return(
        <Container>
        <Header>
          <Body>
            <Title> Ice And Fire And Game of Thrones API</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <InputGroup borderType="rounded" >
            <Icon name="md-search" style={{color:'#384850'}}></Icon>
            <Input  onChangeText={this.handlerChange.bind(this)} style={{color: '#00c497'}} />
          </InputGroup>
          <Button onPress={this.handlerButtom.bind(this)} full info>
            <Text>Buscar</Text>
          </Button> 
          <Card style={{flex: 0}}>
            <CardItem>
              <Body>

                <Text>lo sentimos Nose encontro nada aun!</Text>

              </Body>
            </CardItem>
           </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text> ReactNative API 2020</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>    
      ); 
    }
  }
}