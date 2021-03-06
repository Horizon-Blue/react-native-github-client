import gql from 'graphql-tag';
import { authFetch } from 'utils';

import getClient from '../../client';

const refreshUser = gql`
  query($login: String!) {
    user(login: $login) {
      id
      viewerIsFollowing
    }
  }
`;

// GitHub GraphQL API does not have follow / unfollow functionality yet
export const followUser = login => () =>
  authFetch(`https://api.github.com/user/following/${login}`, 'put', {
    headers: { 'Content-Length': 0 },
  })
    .then(getClient)
    .then(client =>
      client.query({
        query: refreshUser,
        fetchPolicy: 'network-only',
        variables: { login },
      })
    );

export const unfollowUser = login => () =>
  authFetch(`https://api.github.com/user/following/${login}`, 'delete', {
    headers: { 'Content-Length': 0 },
  })
    .then(getClient)
    .then(client =>
      client.query({
        query: refreshUser,
        fetchPolicy: 'network-only',
        variables: { login },
      })
    );
