/** @format */

import {AppRegistry} from 'react-native';
import Splash from './components/Splash_Screen';
import {name as appName} from './app.json';
import SourceComponent from './components/Source_Component';

AppRegistry.registerComponent(appName, () => SourceComponent);
