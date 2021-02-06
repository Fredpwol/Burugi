import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, FlatList, Dimensions, Image, View} from 'react-native';
import {Badge, ListItem, Text} from 'src/components';
import Container from 'src/containers/Container';
import Notification from './Notification';
import OpacityView from 'src/containers/OpacityView';
import EmptyCategory from './EmptyCategory';
import {categorySelector} from 'src/modules/category/selectors';
import {borderRadius, margin, padding} from 'src/components/config/spacing';
import {grey6} from 'src/components/config/colors';
import unescape from 'lodash/unescape';
import {excludeCategory} from 'src/utils/category';
import {exclude_categories} from 'src/config/category';
import {TouchableOpacity} from 'react-native-gesture-handler';

const noImage = require('src/assets/images/imgCateDefault.png');

const {width} = Dimensions.get('screen');

const Style1 = ({category, goProducts}) => {
  const data = excludeCategory(category.data, exclude_categories);
  return (
    <>
      {/* <Notification containerStyle={styles.notification} /> */}
      {data.length < 1 ? (
        <EmptyCategory />
      ) : (
        <Container style={styles.content}>
          <Text bold h2>
            {'Categories'}
          </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            keyExtractor={(item) => `${item.id}`}
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.item} onPress={() => goProducts(item)}>
                <Image
                  source={
                    item.image && item.image.src
                      ? {uri: item.image.src, cache: 'reload'}
                      : noImage
                  }
                  style={styles.img}
                />
                <OpacityView style={styles.viewText}>
                  <Text style={styles.text} h4 medium>
                    {item.name}
                  </Text>
                </OpacityView>
              </TouchableOpacity>
            )}
          />
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  notification: {
    marginBottom: margin.base,
    marginTop: margin.large,
  },
  content: {
    flex: 1,
  },
  item: {
    margin: 5,
    borderRadius: borderRadius.base,
    height: 200,
    width: width / 2.1 - 5 * 3,
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: borderRadius.base + 1,
  },
  textBadge: {
    lineHeight: 18,
    color: grey6,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
  text: {
    paddingHorizontal: padding.base,
    paddingVertical: padding.base + 2,
    textAlign: 'center',
    color: 'white',
  },
  viewText: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    height: 60,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    category: categorySelector(state),
  };
};

export default connect(mapStateToProps)(Style1);
