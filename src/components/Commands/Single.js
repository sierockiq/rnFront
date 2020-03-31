import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import {
  Container, Card, CardItem, Body, Text, Button,View,Content,List
} from 'native-base';
import { Error, Spacer } from '../UI';
import { errorMessages } from '../../constants/messages';
import {getImage} from '../../lib/images'
//TODO delete when corrected. content is scrollview and bad 2 scrolleview on same page
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

const CommandSingle = ({
  error, loading, commands
}) => {
  if (error) {
    return <Error content={error}  />;
  }

  if (commands && commands.listCommands && commands.listCommands.length < 1) {
    return <Error content={errorMessages.articlesEmpty} />;
  }
  console.log(commands)
  return (
    <Container style={{ padding: 10,flex:1}}>
      <Content >
        <View  style={{ flex:1,flexDirection:'row'}}>
            <Text style={{ flex:1}} > Nom</Text>
            <Text style={{ flex:1}} > Quantité(kg)</Text>
            <Text style={{ flex:1}} > Prix(€)</Text>
        </View>

          <List
          style={{flex:1}}
            dataArray={commands.listCommands}
            renderItem={({ item }) => (
              <Card style={{ flex:1,opacity:  1}} >
                <CardItem cardTitle style={{ flex:1}}>
                    <Text style={{ flex:2}} > {item.name}</Text>
                    <Text style={{ flex:1}}>{item.quantity} kg</Text>
                    <Text style={{ flex:1}}>{item.price} €</Text>
                </CardItem>
              </Card>
            )}
            keyExtractor={item => item.id.toString()}
          />


        <Card style={{ flex:1,opacity:  1}} >
          <CardItem cardTitle style={{ flex:1}}>
              <Text style={{ flex:2}} > Total</Text>
              <Text style={{ flex:1}}>{commands.quantity} kg</Text>
              <Text style={{ flex:1}}>{commands.price} €</Text>
          </CardItem>
        </Card>
      </Content>
    </Container >
  );
};

CommandSingle.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  commands : PropTypes.shape({
    listCommands: PropTypes.arrayOf(PropTypes.shape({})),
    price:PropTypes.number,
    quantity : PropTypes.number
  }),
};

CommandSingle.defaultProps = {
  commands: {},
  error: null,
  loading: false,
};

export default CommandSingle;
