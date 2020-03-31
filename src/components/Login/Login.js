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



const Login = ({
  error, loading, success, defaultValues,onFormSubmit
}) => {
  const {
    register, handleSubmit, errors, setValue,
  } = useForm({ defaultValues });

  useEffect(() => {
    register({ name: 'username' }, { required: errorMessages.missingEmail });
    register({ name: 'password' }, { required: "mot de passe required" });
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

          <Spacer size={20} />

          <Button block onPress={handleSubmit(onFormSubmit)} disabled={loading}>
            <Text>{loading ? 'Loading' : 'Se connecter'}</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};



Login.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  success: PropTypes.string,
  defaultValues: PropTypes.shape({
    username : PropTypes.string,
    password : PropTypes.string,
  }),
  onFormSubmit: PropTypes.func
};

Login.defaultProps = {
  error: null,
  success: null,
  loading: false,
  defaultValues: {
    username : "aa",
    password : "aa",
  },
};

export default Login;
