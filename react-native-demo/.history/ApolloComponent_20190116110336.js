export default class App {
  createClient() {
    return new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: 'http://api.githunt.com/graphql',
      }),
    });
  }
  render() {
    return (
      <ApolloProvider client={this.createClient()}>
        <FeedWithData />
      </ApolloProvider>
    );
  }
}