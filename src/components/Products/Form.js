import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Label,
  Input,
  Button,
} from 'native-base';
import { Messages, Header, Spacer } from '../UI';
import { errorMessages } from '../../constants/messages';

const ProductsForm = ({
  error, loading, success, onFormSubmit, defaultValues,
}) => {
  const {
    register, handleSubmit, errors, setValue,
  } = useForm({ defaultValues });

  useEffect(() => {
    register({ name: 'name' }, { required: errorMessages.missingEmail });
    register({ name: 'price' }, { required: "price required" ,min: {value: 0,message: 'prix sup 0'   } });
    register({ name: 'quantity' }, { required: "quantity required" ,min: {value: 0,message: 'quantity sup 0'   } });
  }, [register]);

  console.log(errors)
  return (
    <Container>
      <Content padder>
        <Header title="Nouveau Produit"  />

        {error && <Messages message={error} />}
        {loading && <Messages type="info" message="Loading..." />}
        {success && <Messages type="success" message={success} />}

        <Form>
          <Item stackedLabel>
            <Label>Nom</Label>
            <Input
              type="text"
              name="name"
              autoCapitalize="none"
              placeholder="Tomate"
              defaultValue={defaultValues.name || ''}
              onChangeText={(value) => setValue('name', value)}
            />
          </Item>
          {errors.name && <Text>{errors.name.message}</Text>}

          <Item stackedLabel>
            <Label>Prix</Label>
            <Input
              type="text"
              name="price"
              autoCapitalize="none"
              placeholder="2.6"
              keyboardType="numeric"
              defaultValue={defaultValues.price || ''}
              onChangeText={(value) => setValue('price', value)}
            />
          </Item>
          {errors.price && <Text>{errors.price.message}</Text>}

          <Item stackedLabel>
            <Label>Quantité disponible</Label>
            <Input
              type="text"
              name="quantity"
              autoCapitalize="none"
              placeholder="10"
              keyboardType="numeric"
              defaultValue={defaultValues.quantity || ''}
              onChangeText={(value) => setValue('quantity', value)}
            />
          </Item>
          {errors.quantity && <Text>{errors.quantity.message}</Text>}

          <Spacer size={20} />

          <Button block onPress={handleSubmit(onFormSubmit)} disabled={loading}>
            <Text>{loading ? 'Loading' : 'Submit'}</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

ProductsForm.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  success: PropTypes.string,
  defaultValues: PropTypes.shape({
    email: PropTypes.string,
  }),
  onFormSubmit: PropTypes.func.isRequired,
};

ProductsForm.defaultProps = {
  error: null,
  success: null,
  loading: false,
  defaultValues: {},
};

export default ProductsForm;
