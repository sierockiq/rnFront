import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { FlatList, TouchableOpacity, Image  } from 'react-native';
import {
  Container, Card, CardItem, Body, Text, Button,View,Form,Input
} from 'native-base';
import { Error, Spacer,Messages } from '../UI';
import { errorMessages } from '../../constants/messages';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useForm } from 'react-hook-form';

const getImage = function(name) {
    switch (name) {
      case "tomate":
        return require('../../images/tomate.png');
      case "radis":
        return require('../../images/radis.png');
      case "melon":
        return require('../../images/melon.png');
      case "concombre":
        return require('../../images/concombre.png');
      case "hulk":
        return require('../../images/tomate.png');
      default:
        return require('../../images/tomate.png');
    }
  };

const ProductsList = ({
  error, loading,  reFetch , user,onFormSubmit , loadingForm , errorForm,successForm
}) => {
  if (error) {
    return <Error content={error} tryAgain={reFetch} />;
  }

  if (!user) {
    return <Error content={errorMessages.userEmpty} />;
  }

  return (
    <View style={{padding: 10 ,flex:1}}>
    {errorForm && <Messages message={errorForm} />}
    {loadingForm && <Messages type="info" message="Loading..." />}
    {successForm && <Messages type="success" message={successForm} />}
      <FlatList
        data={user.products}
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
                <Input
                  style={{flex:1}}
                  type="number"
                  placeholder="Quantité voulue"
                  keyboardType="numeric"
                  defaultValue={ `${item.quantiteVoulue}` | ''}
                  onChangeText={(value) => item.quantiteVoulue=value}
                />
              </View>
            </View>
          </Card>
        )}
        keyExtractor={item => item.id.toString()}
          />
        <Button block onPress={() => onFormSubmit(user)} disabled={loadingForm}>
          <Text>{loadingForm ? 'Loading' : 'Commander'}</Text>
        </Button>
    </View>
  );
};

ProductsList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  user:
    PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      //TODO
    }),
  reFetch: PropTypes.func,
  onFormSubmit: PropTypes.func.isRequired,
  errorForm: PropTypes.string,
  loadingForm: PropTypes.bool,
  successForm: PropTypes.string,
};

ProductsList.defaultProps = {
  user: {},
  error: null,
  reFetch: null,
  loading: false,
  errorForm: null,
  successForm: null,
  loadingForm: false,
};

export default ProductsList;
