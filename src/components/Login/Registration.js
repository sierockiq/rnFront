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



const Registration = ({
  error, loading, success, defaultValues,onFormSubmit
}) => {
  const {
    register, handleSubmit, errors, setValue,
  } = useForm({ defaultValues });

  useEffect(() => {
    register({ name: 'username' }, { required: errorMessages.missingEmail });
    register({ name: 'email' }, { required: "email required" ,pattern:{value: /^\S+@\S+$/i, message :"email pattern not good"}});
    register({ name: 'password' }, { required: "mot de passe required" });
    register({ name: 'adress' }, { required: "adress required" });
    register({ name: 'city' }, { required: "city required" });
    register({ name: 'phone' }, { required: "phone required",pattern:{value:  /\d{10}/i, message :"Tél doit faire 10 caractères"}} );
  }, [register]);


  return (
    <Container>
      <Content padder>
        <Header title="Inscription"  />

        {error && <Messages message={error} />}
        {loading && <Messages type="info" message="Loading..." />}
        {success && <Messages type="success" message={success} />}

        <Form>
          <Item stackedLabel>
            <Label>Nom</Label>
            <Input
              type="text"
              name="username"
              autoCapitalize="none"
              placeholder="Alain Soral"
              defaultValue={defaultValues.username || ''}
              onChangeText={(value) => setValue('username', value)}
            />
          </Item>
          {errors.username && <Text>{errors.username.message}</Text>}

          <Item stackedLabel>
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              autoCapitalize="none"
              placeholder="alain.soral@er.fr"
              keyboardType="email-address"
              defaultValue={defaultValues.email || ''}
              onChangeText={(value) => setValue('email', value)}
            />
          </Item>
          {errors.email && <Text>{errors.email.message}</Text>}

          <Item stackedLabel>
            <Label>Mot de passe</Label>
            <Input
              type="text"
              name="password"
              autoCapitalize="none"
              placeholder="quenelle"
              defaultValue={defaultValues.password || ''}
              onChangeText={(value) => setValue('password', value)}
            />
          </Item>
          {errors.password && <Text>{errors.password.message}</Text>}

          <Item stackedLabel>
            <Label>Adresse</Label>
            <Input
              type="text"
              name="adress"
              autoCapitalize="none"
              placeholder="10 rue la monnaie"
              defaultValue={defaultValues.adress || ''}
              onChangeText={(value) => setValue('adress', value)}
            />
          </Item>
          {errors.adress && <Text>{errors.adress.message}</Text>}

          <Item stackedLabel>
            <Label>Ville</Label>
            <Input
              type="text"
              name="city"
              autoCapitalize="none"
              placeholder="Birkenau"
              defaultValue={defaultValues.city || ''}
              onChangeText={(value) => setValue('city', value)}
            />
          </Item>
          {errors.city && <Text>{errors.city.message}</Text>}

          <Item stackedLabel>
            <Label>Téléphone</Label>
            <Input
              type="tel"
              name="phone"
              autoCapitalize="none"
              keyboardType="phone-pad"
              placeholder="0836656565"
              defaultValue={defaultValues.phone || ''}
              onChangeText={(value) => setValue('phone', value)}
            />
          </Item>
          {errors.phone && <Text>{errors.phone.message}</Text>}

          <Spacer size={20} />

          <Button block onPress={handleSubmit(onFormSubmit)} disabled={loading}>
            <Text>{loading ? 'Loading' : 'Submit'}</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};



Registration.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  success: PropTypes.string,
  defaultValues: PropTypes.shape({
    email: PropTypes.string,
    username : PropTypes.string,
    password : PropTypes.string,
    adress: PropTypes.string,
    city: PropTypes.string,
    phone : PropTypes.string,
  }),
  onFormSubmit: PropTypes.func
};

Registration.defaultProps = {
  error: null,
  success: null,
  loading: false,
  defaultValues: {
    email: "a@a.for",
    username : "aa",
    password : "aa",
    adress:"16 cité du perier",
    city : "bordeaux",
    phone : "0980505215"
  },
};

export default Registration;
