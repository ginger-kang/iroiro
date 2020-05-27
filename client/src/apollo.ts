import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: "https://showmethestyle225739-dev.s3.ap-northeast-2.amazonaws.com/"
});

export default client;