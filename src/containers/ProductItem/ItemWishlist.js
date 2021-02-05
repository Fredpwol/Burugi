import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import unescape from 'lodash/unescape';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import {Image, Text, Button, ThemeConsumer} from 'src/components';
import Price from '../Price';
import Icon from "react-native-vector-icons/Ionicons";
import {configsSelector} from 'src/modules/common/selectors';
import {mainStack} from 'src/config/navigator';
import {withAddToCart} from 'src/hoc/hoc-add-to-card';

import {SIMPLE} from 'src/config/product';
import {padding, margin} from 'src/components/config/spacing';
import {sizes} from 'src/components/config/fonts';
import {white, black} from 'src/components/config/colors';

const stockStatusList = ['instock', 'onbackorder'];
const { width } = Dimensions.get("window");
const ItemWishlist = React.memo((props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {item, style, configs, loading, addCart, onDelete} = props;
  const {
    name,
    images,
    price_format,
    type,
    id,
    purchasable,
    stock_status,
  } = item;
  const goProductDetail = () =>
    navigation.navigate(mainStack.product, {
      product: item,
    });

  const getAddToCart = () => addCart(id);
  const titleButton =
    type === SIMPLE ? t('common:text_add_cart') : t('common:text_choose_item');
  return (
    <ThemeConsumer>
      {({theme}) => (
        <View style={[{backgroundColor: theme.ProductItem2.backgroundColor}, styles.itemContainer]}>
          <Icon name="ios-trash" style={styles.deleteIcon} onPress={() => onDelete(item.id)} />
          <TouchableOpacity
            style={[
              styles.item,
              {borderColor: theme.colors.border},
              style && style,
            ]}
            onPress={goProductDetail}>
            <Image
              source={
                images && images[0]
                  ? {uri: images[0].src, cache: 'reload'}
                  : require('src/assets/images/pDefault.png')
              }
              resizeMode="stretch"
              style={styles.image}
            />
              <View style={[styles.info, styles.col]}>
                <Text colorSecondary style={[styles.textName]}>
                  {unescape(name)}
                </Text>
                <Price price_format={price_format} type={type} />
              </View>
              {type !== SIMPLE ||
              (type === SIMPLE &&
                stockStatusList.includes(stock_status) &&
                purchasable &&
                configs.toggleCheckout) ? (
                <Button
                  title={titleButton}
                  buttonStyle={styles.button}
                  titleStyle={styles.titleButton}
                  size={'small'}
                  loading={loading}
                  onPress={type === SIMPLE ? getAddToCart : goProductDetail}
                />
              ) : null}
          </TouchableOpacity>
        </View>
      )}
    </ThemeConsumer>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
  },
  item:{
    width: (width / 2) - (margin.small * 3),
    margin: margin.small,
    borderWidth:1,
    borderRadius:20
  },
  container: {
    padding: padding.large,
    borderBottomWidth: 1,
  },
  image: {
    width: (width / 2) - (margin.small * 3),
    height: 120,
    borderTopRightRadius:20,
    borderTopLeftRadius:20
  },
  right: {
    paddingLeft: padding.large,
    alignItems: 'flex-start',
  },
  info: {
    marginBottom: margin.small,
    alignItems:"center"
  },
  textName: {
    fontSize:8
  },
  button: {
    paddingHorizontal: padding.big,
    backgroundColor: black,
    borderColor: black,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20
  },
  titleButton: {
    color: white,
    fontSize: sizes.h6,
  },
  deleteIcon:{
    fontSize:24,
    position:"absolute",
    right:20,
    zIndex:10,
    top: 10,
    color:"red"
  }
});
const mapStateToProps = (state) => {
  return {
    configs: configsSelector(state).toJS(),
  };
};

export default compose(
  connect(mapStateToProps, null),
  withAddToCart,
)(ItemWishlist);
