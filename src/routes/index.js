import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import DefaultProps from '../constants/navigation';
import AppConfig from '../constants/config';

import { ArticlesForm, ArticlesList, ArticlesSingle,
  ProductsForm, ProductsList, ProductsSingle ,
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
          key="articlesList"
          title="Articles List"
          icon={() => <Icon name="shopping-basket" size={28} {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="articlesList" component={ArticlesList} />
          <Scene key="articlesSingle" component={ArticlesSingle} />
        </Stack>

        <Stack
          key="productsList"
          title="Product List"
          icon={() => <Icon name="product-hunt" size={28} {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="productsList" component={ProductsList} />
          <Scene key="productSingle" component={ProductsSingle} />
        </Stack>


        <Stack
          key="form"
          title="Articles Form"
          icon={() => <Icon name="phone" size={28} {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="form" component={ArticlesForm} />
        </Stack>
      </Tabs>
    </Scene>
  </Stack>
);

export default Index;
