import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Item, View, Tabs, Tab } from 'native-base';

import SearchRepositoryList from './SearchRepositoryList';
import SearchUserList from './SearchUserList';
import Container from 'SafeContainer';

type Props = {
  navigator: Object,
};

/**
 * A component to do and display search result
 * @extends PureComponent
 */
class Search extends PureComponent<Props> {
  static navigatorStyle = {
    tabBarHidden: true,
  };

  state = {};
  timer = null;

  componentWillUnmount = () => clearTimeout(this.timer);

  /**
   * Wait for 1 second after user stop typing to begin searching
   * @param  {String} text current text in search field
   */
  handleChangeQuery = text => {
    clearTimeout(this.timer);
    this.setState({ text });
    this.timer = setTimeout(this.updateQuery, 1000);
  };

  /**
   * make the query as the same as the text in search bar
   */
  updateQuery = () => this.setState({ query: this.state.text });

  render = () => (
    <Container>
      <View style={styles.searchContainer}>
        <Item rounded>
          <Input
            onChangeText={this.handleChangeQuery}
            value={this.state.text}
            autoCapitalize="none"
          />
        </Item>
      </View>
      <Tabs locked>
        <Tab heading="Repository">
          <SearchRepositoryList
            query={this.state.query}
            navigator={this.props.navigator}
          />
        </Tab>
        <Tab heading="User">
          <SearchUserList
            query={this.state.query}
            navigator={this.props.navigator}
          />
        </Tab>
      </Tabs>
    </Container>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#F8F8F8',
  },
});

export default Search;
