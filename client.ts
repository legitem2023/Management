import { ApolloClient, InMemoryCache} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const path = process.env.NEXT_PUBLIC_SERVER_LINK;

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri:path
});

export default client


