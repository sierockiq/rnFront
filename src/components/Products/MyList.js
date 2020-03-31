import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { FlatList, TouchableOpacity, Image  } from 'react-native';
import {
  Container, Card, CardItem, Body, Text, Button,View,Form,Input
} from 'native-base';
import { Error, Spacer,Messages,Loading } from '../UI';
import { errorMessages } from '../../constants/messages';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getImage} from '../../lib/images'


const MyProductsList = ({
  error, loading,  reFetch , myProducts, deleteProduct, loadingForm , errorForm,successForm
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error content={error} tryAgain={reFetch} />;
  }

  if (!myProducts.length) {
    return <Error content={errorMessages.userEmpty} />;
  }

  return (
    <View style={{padding: 10 ,flex:1}}>
    {errorForm && <Messages message={errorForm} />}
    {loadingForm && <Messages type="info" message="Loading..." />}
    {successForm && <Messages type="success" message={successForm} />}
      <FlatList
        data={myProducts}
        renderItem={({ item }) => (
          <Card style={{ flex:1,opacity:  1}} >
            <CardItem cardTitle style={{ flex:1}}>
                <Text style={{ flex:2}} > {item.productTypeName}</Text>
                <View style={{width: 50, height: 50, flex :1 ,flexDirection:'row'}}>
                  <Image style={{width: 60, height: 60}}
                  source={getImage(item.productTypeName)}/>
                  <Icon name="info-circle" size={30}  onPress={() => Actions.productSingleBuy(item.id)}   />
                </View>
            </CardItem>
            <View style={{ flex:  1,flexDirection:'row',padding:10}} >
              <View style={{ flex:  1,flexDirection:'column'}}>
                <CardItem cardBody style={{ flex:1}}>
                    <Text style={{ flex:1}}>prix  </Text>
                    <Text style={{ flex:1}}>{item.price} €/kg</Text>
                </CardItem>
                <CardItem cardBody style={{ flex:1}}>
                    <Text style={{ flex:1}}>quantité restante  </Text>
                    <Text style={{ flex:1}}>{item.quantity} kg</Text>
                </CardItem>
              </View>
              <View style={{ flex:  1,padding:10,alignItems:'center'}}>
                 <Icon name="trash" size={30}  onPress={() =>  deleteProduct(item.id)}   />
              </View>
            </View>
          </Card>
        )}
        keyExtractor={item => item.id.toString()}
          />
        <Button  onPress={() => Actions.productForm()} >
          <Text>Ajouter</Text>
        </Button>
    </View>
  );
};

MyProductsList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  myProducts:PropTypes.arrayOf(PropTypes.shape({})),
  reFetch: PropTypes.func,
  deleteProduct: PropTypes.func.isRequired,
  errorForm: PropTypes.string,
  loadingForm: PropTypes.bool,
  successForm: PropTypes.string,
};

MyProductsList.defaultProps = {
  myProducts: [],
  error: null,
  reFetch: null,
  loading: false,
  errorForm: null,
  successForm: null,
  loadingForm: false,
};

export default MyProductsList;
