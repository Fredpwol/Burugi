import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import isEqual from 'lodash/isEqual';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  I18nManager,
  Image,
  Dimensions,
} from 'react-native';
import {Header, ThemedView, Text} from 'src/components';
import {SwipeListView} from 'react-native-swipe-list-view';
import ProductItem from 'src/containers/ProductItem';
import {TextHeader, CartIcon} from 'src/containers/HeaderComponent';
import Empty from 'src/containers/Empty';
import ButtonSwiper from 'src/containers/ButtonSwiper';
import Icon from 'react-native-vector-icons/FontAwesome';

import {removeWishList} from 'src/modules/common/actions';
import {fetchWishList} from 'src/modules/product/actions';
import {
  loadingWishListSelector,
  dataWishListSelector,
} from 'src/modules/product/selectors';

import {
  wishListSelector,
  countWishListSelector,
} from 'src/modules/common/selectors';

import {margin} from 'src/components/config/spacing';
import {homeTabs} from 'src/config/navigator';
import { FlatList } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');
class WishListScreen extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData = (data = this.props.wishList) => {
    const {dispatch} = this.props;
    dispatch(fetchWishList(data));
  };

  removeItem = (product_id) => {
    const {dispatch} = this.props;
    dispatch(removeWishList(product_id));
  };

  componentDidUpdate(prevProps) {
    const {wishList} = this.props;
    if (!isEqual(wishList, prevProps.wishList)) {
      this.fetchData(wishList);
    }
  }
  renderData = (data) => {
    const {t, navigation} = this.props;
    if (!data || data.length < 1) {
      return (
        <>
          <Image
            source={require('src/assets/images/wishlist.png')}
            style={{width, height: height / 2}}
          />
          <View style={{alignItems: 'center'}}>
            <Text h2 bold>
              {'Your Wishlist Is Empty'}
            </Text>
            <Text style={{textAlign: 'center'}}>
              {'Simply sign in to pick up where you left off.\n Go Shopping'}
            </Text>
            <Image
              source={require('src/assets/images/curve-arrow.png')}
              style={{
                height: 40,
                width: 60,
                right: 60,
                top: 80,
                position: 'absolute',
              }}
            />
            {/* <View style={styles.fab}> */}
            {/* </View> */}
          </View>
          <Icon
            name="plus-circle"
            style={styles.fab}
            onPress={() => navigation.navigate(homeTabs.shop)}
          />
        </>
      );
    }
    return (
      <FlatList 
      data={data} 
      numColumns={2}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({item, index}) => (
          <ProductItem
          item={item}
          style={index === 0 ? styles.firstItem : undefined}
          type="wishlist"
          onDelete={this.removeItem}
        />
      )} />
      // <SwipeListView
      //   useFlatList
      //   keyExtractor={(item) => `${item.id}`}
      //   data={data}
        // renderItem={({item, index}) => (
        //   <ProductItem
        //     item={item}
        //     style={index === 0 ? styles.firstItem : undefined}
        //     type="wishlist"
        //   />
        // )}
      //   renderHiddenItem={({item}) => (
      //     <View style={styles.viewSwiper}>
      //       <ButtonSwiper onPress={() => this.removeItem(item.id)} />
      //     </View>
      //   )}
      //   leftOpenValue={70}
      //   rightOpenValue={-70}
      //   disableLeftSwipe={I18nManager.isRTL}
      //   disableRightSwipe={!I18nManager.isRTL}
      // />
    );
  };

  render() {
    const {t, countWishlist, data, loading} = this.props;

    const subtitle =
      countWishlist > 1
        ? t('common:text_items', {count: countWishlist})
        : t('common:text_item', {count: countWishlist});

    return (
      <ThemedView style={styles.container}>
        <Header
          centerComponent={
            <TextHeader title={t('common:text_wishList')} subtitle={subtitle} />
          }
          rightComponent={<CartIcon />}
        />
        {loading ? (
          <View style={styles.viewLoading}>
            <ActivityIndicator size="small" />
          </View>
        ) : (
          this.renderData(data)
        )}
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewLoading: {
    marginVertical: margin.large,
  },
  viewSwiper: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  firstItem: {
    borderTopWidth: 1,
  },
  fab: {
    fontSize: 60,
    right: 10,
    position: 'absolute',
    bottom: 10,
  },
});

const mapStateToProps = (state) => ({
  data: dataWishListSelector(state).toJS(),
  loading: loadingWishListSelector(state),
  wishList: wishListSelector(state).toJS(),
  countWishlist: countWishListSelector(state),
});

export default connect(mapStateToProps)(withTranslation()(WishListScreen));
