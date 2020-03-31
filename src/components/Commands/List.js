import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  Container, Card, CardItem, Body, Text, Button,View,List,Content
} from 'native-base';
import { Error, Spacer } from '../UI';
import { errorMessages } from '../../constants/messages';
//TODO delete when corrected. content is scrollview and bad 2 scrolleview on same page
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])
const CommandsList = ({
  error, loading, commands
}) => {
  if (error) {
    return <Error content={error}  />;
  }

  if (commands && commands.length < 1) {
    return <Error content={errorMessages.articlesEmpty} />;
  }
  console.log(commands)
  return (
    <Container style={{ padding: 10,flex:1}}>
      <Content style={{ flex:1}}>
          <View  style={{ flex:1,flexDirection:'row'}}>
              <Text style={{ flex:2}} > Fermier</Text>
              <Text style={{ flex:2}} > Date</Text>
              <Text style={{ flex:1}} > Prix(€)</Text>
          </View>
            <List
              dataArray={commands}
              renderItem={({ item }) => (
                <Card style={{ flex:1,opacity:  1}} >
                  <CardItem cardTitle style={{ flex:1}} button onPress={e => {Actions.commandSingle()}}>
                      <Text style={{ flex:2}} > {item.farmer}</Text>
                      <Text style={{ flex:2}}>{item.date}</Text>
                      <Text style={{ flex:1}}>{item.price} €</Text>
                  </CardItem>
                </Card>
              )}
              keyExtractor={item => item.id.toString()}
            />
        </Content>
    </Container>
  );
};

CommandsList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  commands : PropTypes.arrayOf(PropTypes.shape({}))
};

CommandsList.defaultProps = {
  commands: [],
  error: null,
  loading: false,
};

export default CommandsList;
