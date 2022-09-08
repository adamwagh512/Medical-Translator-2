import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';
import Medical_Questions from './pages/Medical-Pages';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {

const token = localStorage.getItem('id_token');

return {
  headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
  },
};
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <div className="container">
      <Routes>
        <Route
        path="/"
        element={<Medical_Questions />}
       />
       </Routes>
    </div>
    </Router>
    </ApolloProvider>
  );
};

