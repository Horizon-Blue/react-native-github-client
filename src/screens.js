import { Navigation } from 'react-native-navigation';

import User from './components/User';
import Explore from './components/Explore';

// register all screens of the app (including internal ones)
export default (store, Provider, client) => {
  const registerPage = (name, component) =>
    Navigation.registerComponent(name, () => component, store, Provider, {
      client
    });

  registerPage('profile.user', User);
  registerPage('explore', Explore);
};