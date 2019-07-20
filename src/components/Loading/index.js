import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <ActivityIndicator color="#7159c1;" size="large" />
    </Container>
  );
}
