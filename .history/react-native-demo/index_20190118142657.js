// import { AppRegistry } from 'react-native';
// import App from './App';

// AppRegistry.registerComponent('demo', () => App);

// import * as React from 'react';
// export const { Provider,Consumer } = React.createContext("Light");

// import { Provider } from './context';
// import * as React from 'react';
// import { render } from 'react-dom';
// import App from './app';

// const root = (
//   <Provider value='Dark'>
//     <App />
//   </Provider>
// )

// import { Consumer } from './context';
// import * as React from 'react';

// export default class App extends React.Component {
//   render() {
//     return (
//       <Consumer>
//         {
//           theme => <div>Now, the theme is { theme }</div>
//         }
//       </Consumer>
//     )
//   }
// }

const ThemeContext = React.createContext('light');
const UserContext = React.createContext();

function Toolbar(props) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {
            user => (
              <ProfilePage user={user} theme={theme} />
            )
          }
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  )
}

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
        </UserContext.Provider>
      </ThemeContext.Provider>
    )
  }
}