import React from 'react';
import PropTypes from 'prop-types';
import { Image,StyleSheet,Button ,  FlatList,ScrollView,Row,TouchableOpacity} from 'react-native';
import {Container, Content,  Body, H3, Text, View,Card, CardItem} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView,{Marker,Callout} from 'react-native-maps';
import { Loading, Error, Spacer } from '../UI';
import { Actions } from 'react-native-router-flux';
import { errorMessages } from '../../constants/messages';

const Map = ({
  error, loading, users, reFetch,
}) => {
  if (error) {
    return <Error content={error} tryAgain={reFetch} />;
  }

  if (loading) {
    return <Loading content={loading} />;
  }

  if (Object.keys(users).length < 1) {
    return <Error content={errorMessages.articles404} />;
  }
  return (
    <Container key="mapContainer">
      <MapView
        key="map"
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.25,
          longitude: -122.07,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {users.map((user:any)  => (
                <Marker
                  key={'marker'+user.id}
                  coordinate={user.coordinate}
                  title={user.username}
                  description={user.username}
                  >
                  <Callout style={{flex: 1}} key={"calloutMarker"+user.id}
                    onPress={e => {Actions.productsListBuy(user)}}>
                      <View style={{ flex:1,alignItems:'center'}}>
                          <Text >{user.username}</Text>
                      </View>
                      <Spacer size={10} />
                      <CardItem cardBody style={{flex:1}}>
                        <Icon  name="envelope-o" style={{flex:1}}/>
                        <Text style={{flex:2}}>{user.email}</Text>
                      </CardItem>
                      <CardItem cardBody style={{flex:1}}>
                        <Icon  name="phone" style={{flex:1,marginRight:10}}/>
                        <Text style={{flex:3}}>{user.phone}</Text>
                      </CardItem>
                      <Spacer size={10} />
                      <View style={{flex:1,flexDirection:'row',flexWrap:'wrap'}} key={"legumeContainer"+user.id}>
                      {user.products.length>1 && user.products.map((product:any,ind)  => (
                        ind>5?
                        <View style={{flex:1}} key={"legume"+user.id+product.id}>
                          <Image style={{width: 50, height: 50,flex:1}}
                          source={require('../../images/tomate.png')}/>
                          <Spacer size={10} />
                          <Text style={{flex:1,marginLeft:10}}>{product.price}€</Text>
                        </View> : <View key={"legume"+user.id+product.id}/>
                      ))
                    }
                      </View>
                    </Callout>
                  </Marker>
                ))
           }
      </MapView>
    </Container>
  );
};

Map.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  article: PropTypes.shape(),
  reFetch: PropTypes.func,
};

Map.defaultProps = {
  error: null,
  loading: false,
  article: {},
  reFetch: null,
};

export default Map;
