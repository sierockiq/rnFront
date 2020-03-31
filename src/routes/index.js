import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultProps from '../constants/navigation';
import AppConfig from '../constants/config';

import {ProductsForm, ProductsList,MyProductsList, ProductsSingle ,
  CommandsForm, CommandsList, CommandsSingle
  ,MapContainer} from '../containers';

import AboutComponent from '../components/About';

const Index = (
  <Stack hideNavBar>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
      >
        <Stack
          key="home"
          title={AppConfig.appName}
          icon={() => <Icon name="home" size={28} {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="home" component={AboutComponent} />
        </Stack>

        <Stack
          key="map"
          title="Map"
          icon={() => <Icon name="map" size={28} {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="map" component={MapContainer} />
          <Scene key="productsListBuy" component={ProductsList} />
          <Scene key="productSingleBuy" component={ProductsSingle} />
        </Stack>


        <Stack
          key="commandsList"
          title="Commandes"
          icon={() => <Icon name="shopping-basket" size={28} {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="commandsList" component={CommandsList} />
          <Scene key="commandSingle" component={CommandsSingle} />
        </Stack>

        <Stack
          key="productsList"
          title="Produits"
          icon={() => <Icon name="product-hunt" size={28} {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="myProductsList" component={MyProductsList} />
          <Scene key="productSingle" component={ProductsSingle} />
          <Scene key="productForm" component={ProductsForm} />
        </Stack>
      </Tabs>
    </Scene>
  </Stack>
);

export default Index;
