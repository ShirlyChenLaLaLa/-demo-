// import { AppRegistry } from 'react-native';
// import App from './App';

// AppRegistry.registerComponent('demo', () => App);

// import * as React from 'react';
// export const { Provider,Consumer } = React.createContext("Light");

import { Provider } from './context';
import * as React from 'react';
import { render } from 'react-dom';
import App from './app';

const root = (
    <Provider>
        <App />
    </Provider>
)