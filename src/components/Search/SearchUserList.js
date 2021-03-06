import React, { PureComponent } from 'react';
import { Text } from 'native-base';
import { Query } from 'react-apollo';
import UserListView from '../User/UserListView';
import { searchQuery } from './queries';
import _ from 'lodash/fp';

import { deepMerge } from 'utils';

type Props = {
  query: String,
  navigator: Object,
};

/**
 * The view that display user search results
 * @extends PureComponent
 */
class SearchUserList extends PureComponent<Props> {
  handleRefetch = refetch => listview => () => {
    if (listview.state.refreshing) return;
    listview.setState({ refreshing: true });
    refetch().then(listview.setState({ refreshing: false }));
  };

  handleFetchMore = edges => fetchMore => listview => () => {
    if (listview.isFetchingMore) return;
    listview.isFetchingMore = true;
    fetchMore({
      variables: {
        after: _.last(edges).cursor,
        query: this.props.query,
        type: 'USER',
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        listview.isFetchingMore = false;
        return deepMerge(previousResult, fetchMoreResult);
      },
    });
  };

  renderSearchResult = ({ loading, error, data, fetchMore, refetch }) => {
    return !this.props.query ? null : loading ? (
      <Text>Loading...</Text>
    ) : error ? (
      <Text>{error.message}</Text>
    ) : (
      <UserListView
        users={data.search.edges}
        fetchMore={this.handleFetchMore(data.search.edges)(fetchMore)}
        refetch={this.handleRefetch(refetch)}
        navigator={this.props.navigator}
      />
    );
  };

  render = () => (
    <Query
      query={searchQuery}
      variables={{ query: this.props.query, type: 'USER' }}
      skip={!this.props.query}
    >
      {this.renderSearchResult}
    </Query>
  );
}

export default SearchUserList;
