import React from 'react';
import {
  Container, Content, Text, H1, H2, H3,
} from 'native-base';
import Spacer from './UI/Spacer';

const About = () => (
  <Container>
    <Content padder>
      <Spacer size={30} />
      <H1>Qui sommes nous ? </H1>
      <Spacer size={10} />
      <Text>
        Nous voulons redonner le pouvoir aux gens en éliminant les intermédiaires.
        {' '}
      </Text>

      <Spacer size={30} />
      <H2>Pourquoi utiliser cette application ?</H2>
      <Spacer size={10} />
      <Text>
         Vous en avez marre des intermédiaires.
         Vous êtes un fermier qui n'arrivez pas à joindre les deux bouts à la fin du mois.
         Vous avez envie de consommer local
        {' '}
      </Text>

      <Spacer size={30} />
      <H3>N'hésitez plus et inscrivez-vous ! </H3>
      <Spacer size={10} />
      <Text>
        Ce sera intéressant et il faut agir vite pour ne pas laisser la France tomber entre les mains de prédateurs nomades.
        {' '}
      </Text>
    </Content>
  </Container>
);

export default About;
