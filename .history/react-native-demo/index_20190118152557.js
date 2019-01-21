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

// const ThemeContext = React.createContext('light');
// const UserContext = React.createContext();

// function Toolbar(props) {
//   return (
//     <ThemeContext.Consumer>
//       {theme => (
//         <UserContext.Consumer>
//           {
//             user => (
//               <ProfilePage user={user} theme={theme} />
//             )
//           }
//         </UserContext.Consumer>
//       )}
//     </ThemeContext.Consumer>
//   )
// }

// class App extends React.Component {
//   render() {
//     const {signedInUser, theme} = this.props;
//     return (
//       <ThemeContext.Provider value={theme}>
//         <UserContext.Provider value={signedInUser}>
//           <Toolbar />
//         </UserContext.Provider>
//       </ThemeContext.Provider>
//     )
//   }
// }

// class Button extends React.Component {
//   componentDidMount() {
//     // ThemeContext value is this.props.theme
//   }

//   componentDidUpdate(prevProps, prevState) {

//   }

//   render() {
//     const {theme, children} = this.props;
//     return (
//       <button className={theme ? 'dark' : 'light'}>
//         {children}
//       </button>
//     );
//   }
// }

// export default props => (
//   <ThemeContext.Consumer>
//     {theme => <Button {...props} theme={theme}/>}
//   </ThemeContext.Consumer>
// )
// 新版本的 context 只能在 render 方法里面访问。 因为Context 只暴露在Consumer的render prop里面。

const ThemeContext = React.createContext('light');
function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
      {theme => <button className={theme} {...props} />}
    </ThemeContext.Consumer>
  )
}

export default props => (
  ThemedButton(props)
)