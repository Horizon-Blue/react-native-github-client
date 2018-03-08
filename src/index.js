import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import registerScreens from './screens';
// Due to security reason, I cannot include this file in version control
// Please follow this link if you want to generate your own personal token:
// https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
import { GITHUB_TOKEN } from './config';
import loadIcons from './utils/loadIcons';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: async operation => {
    const token = await AsyncStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: `Bearer ${token || GITHUB_TOKEN}`
      }
    });
  }
});

registerScreens(client.store, ApolloProvider, client);

const run = icons => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Explore',
        screen: 'profile.main', // placeholder
        title: 'Explore',
        icon: icons.globe
      },
      {
        label: 'User',
        screen: 'profile.main',
        title: 'Profile',
        icon: icons.user
      }
    ]
  });
};

loadIcons(['user', 'globe']).then(run);
