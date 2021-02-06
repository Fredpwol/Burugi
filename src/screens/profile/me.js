import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {StyleSheet, ScrollView, View, Linking} from 'react-native';
import {Header, ThemedView, Text, ListItem} from 'src/components';

import HeaderMe from './containers/HeaderMe';
import SettingMe from './containers/SettingMe';
import InformationMe from './containers/InformationMe';
import Container from 'src/containers/Container';
import SocialIcon from 'src/containers/SocialIcon';
import {TextHeader, CartIcon} from 'src/containers/HeaderComponent';

import {authSelector} from 'src/modules/auth/selectors';
import {
  wishListSelector,
  configsSelector,
  languageSelector,
} from 'src/modules/common/selectors';

import {grey5} from 'src/components/config/colors';
import {margin} from 'src/components/config/spacing';

class MeScreen extends Component {
  icon = (name) => {
    return {
      name: name,
      size: 18,
      color: grey5,
    };
  };

  handleLinkUrl = (url) => {
    Linking.openURL(url);
  };

  goPageOther = (router) => {
    this.props.navigation.navigate(router);
  };

  render() {
    const {
      t,
      configs,
      auth: {isLogin, user},
      language,
    } = this.props;

    // let nameUser = t('profile:text_hello_default');
    // if (isLogin && user && !isEqual(user, {})) {
    //   const stringName = t('profile:text_hello', {name: user.display_name});
    // }
    return (
      <ThemedView isFullView>
        <View style={styles.body}>
          {isLogin ?
          (<ListItem
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
            titleProps={{
              medium: true,
              onPress: () => navigation.navigate(mainStack.account),
            }}
            // rightElement={
            //   <TouchableOpacity style={styles.loginBell} onPress={() => false && navigation.navigate(profileStack.notification_list)}>
            //     <Icon name="bell" size={20} />
            //     {/*<Badge status="error" value={2} badgeStyle={styles.badge} textStyle={styles.textBadge} />*/}
            //   </TouchableOpacity>
            // }
            containerStyle={{backgroundColor:"transparent", marginBottom:50}}
            titleStyle={{color:"white"}}
          />) : null}
        <ScrollView style={styles.settingBody}>
          <Container style={[styles.viewContent]}>
            <HeaderMe />
            <InformationMe isLogin={isLogin} clickPage={this.goPageOther} />
            <SettingMe
              isLogin={isLogin}
              clickPage={this.goPageOther}
              goPhone={this.handleLinkUrl}
              phonenumber={configs.get('phone')}
            />
            <View style={styles.viewSocial}>
              <SocialIcon
                light
                raised={false}
                type="facebook"
                style={styles.socialIconStyle}
                iconSize={15}
                onPress={() => this.handleLinkUrl(configs.get('facebook'))}
              />

              <SocialIcon
                light
                raised={false}
                type="instagram"
                style={styles.socialIconStyle}
                iconSize={15}
                onPress={() => this.handleLinkUrl(configs.get('instagram'))}
              />

              <SocialIcon
                light
                raised={false}
                type="pinterest"
                style={styles.socialIconStyle}
                iconSize={15}
                onPress={() => this.handleLinkUrl(configs.get('pinterest'))}
              />

              <SocialIcon
                light
                raised={false}
                type="twitter"
                style={styles.socialIconStyle}
                iconSize={15}
                onPress={() => this.handleLinkUrl(configs.get('twitter'))}
              />
            </View>
            <Text h6 colorThird>
              {typeof configs.get('copyright') === 'string'
                ? configs.get('copyright')
                : configs.getIn(['copyright', language])}
            </Text>
          </Container>
        </ScrollView>
        </View>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  viewContent: {
    marginTop: margin.large,
    marginBottom: margin.big,
  },
  viewSocial: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginVertical: margin.large + 4,
  },
  socialIconStyle: {
    width: 32,
    height: 32,
    margin: 0,
    marginHorizontal: margin.small / 2,
    paddingTop: 0,
    paddingBottom: 0,
  },
  body:{
    backgroundColor:"black",
    paddingTop:50
  },
  settingBody:{
    backgroundColor: "white",
    borderRadius: 30,
  }
});

const mapStateToProps = (state) => {
  return {
    auth: authSelector(state),
    wishList: wishListSelector(state),
    configs: configsSelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(withTranslation()(MeScreen));
