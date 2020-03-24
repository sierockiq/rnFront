import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Container, Content, Card, CardItem, Body, H3, Text,
} from 'native-base';
import { Loading, Error, Spacer } from '../UI';
import { errorMessages } from '../../constants/messages';

const ProductsSingle = ({
  error, loading, product, reFetch,
}) => {
  if (error) {
    return <Error content={error} tryAgain={reFetch} />;
  }

  if (loading) {
    return <Loading content={loading} />;
  }

  if (!product) {
    return <Error content={errorMessages.product404} />;
  }

  return (
    <Container>
      <Content padder>
        <Spacer size={25} />
        <H3>{product.productTypeName}</H3>
        <Spacer size={15} />
          <Card>
            <CardItem header bordered>
              <Text>Content</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{product.price}</Text>
              </Body>
            </CardItem>
          </Card>
        <Spacer size={20} />
      </Content>
    </Container>
  );
};

ProductsSingle.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  product: PropTypes.shape(),
  reFetch: PropTypes.func,
};

ProductsSingle.defaultProps = {
  error: null,
  loading: false,
  product: {},
  reFetch: null,
};

export default ProductsSingle;
