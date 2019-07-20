import React, { Component } from 'react';

import PropTypes from 'prop-types';

import api from '../../services/api';
import Loading from '../../components/Loading';
import {
  Container,
  Header,
  Name,
  Avatar,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    pageNumber: 1,
    loading: true,
  };

  async componentDidMount() {
    this.load();
  }

  loadMore = async () => {
    const { pageNumber } = this.state;

    const page = pageNumber + 1;

    this.load(page);
  };

  load = async (page = 1) => {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const { stars } = this.state;

    const response = await api.get(`users/${user.login}/starred`, {
      params: { page },
    });

    this.setState({
      stars: page > 1 ? [...stars, ...response.data] : response.data,
      pageNumber: page,
      loading: false,
    });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading } = this.state;

    const user = navigation.getParam('user');

    if (loading) {
      return <Loading />;
    }

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio> {user.bio} </Bio>
        </Header>

        <Stars
          onEndReachedThreshold={0.2}
          onEndReached={this.loadMore}
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title> {item.name} </Title>
                <Author> {item.owner.login} </Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
