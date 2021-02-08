import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {StyleSheet, ScrollView, View} from 'react-native';
import {ThemedView, Text, ListItem} from 'src/components';
import ItemCategoryMenu from './ItemCategoryMenu';

import {categorySelector} from 'src/modules/category/selectors';
import {configsSelector, languageSelector} from 'src/modules/common/selectors';
import {authSelector} from 'src/modules/auth/selectors';
import {padding, margin} from 'src/components/config/spacing';

import {homeTabs, mainStack} from 'src/config/navigator';
import {excludeCategory} from '../utils/category';
import {exclude_categories_sidebar} from '../config/category';

class Sidebar extends React.Component {
  constructor(props){
    super(props)
    const {auth: {user, isLogin}} = this.props;
    this.state = { user, isLogin};
  }
  handlePage = (router, params = {}) => {
    const {navigation} = this.props;
    if (!navigation) {
      return null;
    }
    navigation.navigate(router, params);
  };


  render() {
    const {t, category, configs, language, navigation, auth:{ user, isLogin}} = this.props;
    const dataHelpInfo = [
      {
        id: '1',
        name: t('common:text_home'),
        router: mainStack.home_tab,
        params: {
          screen: homeTabs.home_drawer,
        },
      },
      {
        id: '2',
        name: "Stories",
        router: mainStack.blogs,
      },
      {
        id: '3',
        name: t('common:text_about'),
        router: mainStack.page,
        params: {
          id: configs.getIn(['about', language]),
          type: 'page',
        },
      },
      {
        id: '4',
        name: t('profile:text_term'),
        router: mainStack.page,
        params: {
          id: configs.getIn(['term', language]),
          type: 'page',
        },
      },
      {
        id: '5',
        name: t('common:text_privacy_full'),
        router: mainStack.page,
        params: {
          id: configs.getIn(['policy', language]),
          type: 'page',
        },
      },
      {
        id: '6',
        name: 'common:text_contact',
        router: mainStack.contact,
      },
    ];

    const {data} = category;

    // Filter include category
    const _data = excludeCategory(data, exclude_categories_sidebar);
    // const {user, isLogin} = this.state;

    return (
      <ThemedView isFullView>
        <ScrollView>
        {isLogin ?
          (<View style={{backgroundColor:"black"}}>
             <ListItem
            title={user.display_name}
            subtitle={user.user_email}
            leftAvatar={{
              source: user.avatar
                ? {uri: user.avatar}
                : require('src/assets/images/pDefault.png'),
              size: 60,
              rounded: true,
              onPress: () => navigation.navigate(mainStack.account),
            }}
            containerStyle={{backgroundColor:"transparent", paddingVertical:25}}
            titleStyle={{color:"white"}}
          />
          </View>) : null}
          <Text h3 medium style={[styles.title, styles.titleHead]}>
            {t('common:text_category')}
          </Text>
          {_data.map((c) => (
            <ItemCategoryMenu
              key={c.id}
              category={c}
              isOpen={
                navigation.state && navigation.state.isDrawerOpen
                  ? navigation.state.isDrawerOpen
                  : false
              }
              goProducts={this.handlePage}
            />
          ))}
          <Text h3 medium style={styles.title}>
            {t('common:text_help')}
          </Text>
          {dataHelpInfo.map((value) => (
            <ListItem
              key={value.id}
              title={t(value.name)}
              titleProps={{
                medium: true,
              }}
              type="underline"
              small
              containerStyle={styles.item}
              onPress={() => this.handlePage(value.router, value.params)}
            />
          ))}
        </ScrollView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: margin.small + 1,
    paddingHorizontal: padding.large,
    paddingVertical: padding.small,
    backgroundColor:"#E4EEF1"
  },
  titleHead: {
    paddingTop: getStatusBarHeight(),
  },
  item: {
    paddingHorizontal: padding.large,
  },
});

const mapStateToProps = (state) => ({
  auth: authSelector(state),
  category: categorySelector(state),
  configs: configsSelector(state),
  language: languageSelector(state),
});
export default connect(mapStateToProps)(withTranslation()(Sidebar));
