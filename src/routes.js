import { createAppContainer, createStackNavigator } from 'react-navigation';

/**
 *  Create stack navigator faz um stack de rotas, onde as rotas
 *  acessadas anteriormente fica salva, podendo assim voltar
 *
 *  Create Switch navigator Não empilha as rotas, então quandoo passo
 *  de uma routa para a outra a rota anterior deixa de existir.
 */
import Main from './Pages/Main';
import User from './Pages/User';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#fff',
      },
    }
  )
);

export default Routes;
