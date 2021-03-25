import React, { useRef, useState } from 'react';
import { Dimensions, View, TouchableOpacity, StyleSheet } from 'react-native';
import Popover from 'react-native-popover-view';
import Modal from 'react-native-modal';
import { IconOutline } from '@ant-design/icons-react-native';
import {t} from 'i18n-js';;

import { Colors } from '../../../../configs';
import Text from '../../../../commons/Text';
import BackDefault from '../../../../commons/BackDefault';
import Header from '../../../../commons/Header';
import ImageButton from '../../../../commons/ImageButton';
import { navigate } from '../../../../navigations/utils';
import Routes from '../../../../utils/Route';
import AddMemberIcon from '../../../../../assets/images/Popover/Dashboard/AddMember.svg';

const { width: widthScreen } = Dimensions.get('window');

const HeaderComponent = ({
  hasBack,
  leftComponent,
  centerComponent,
  rightComponent,
  navigation,
  title,
  wrapStyle,
  goBack,
  dark,
  hideRight,
  fixedHeight, // when height of header is fixed
  style,
}) => {
  const popoverRef = useRef();
  const [menu, setMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const hideModal = () => {
    setShowModal(false);
  };
  const onItemClick = (route) => {
    setShowModal(false);
    setMenu(false);
    navigate(route);
  };

  return (
    <View style={[style && style, styles.justifyCenter]}>
      <Modal
        isVisible={showModal}
        onBackButtonPress={hideModal}
        onBackdropPress={hideModal}
        style={styles.noMargin}
      >
        <View style={styles.popoverStyle}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>{t('add_new')}</Text>
            </View>
            <View style={styles.actionWrapper}>
              <View style={styles.action}>
                <ImageButton
                  style={styles.action}
                  onPress={() => onItemClick(Routes.Sharing)}
                  image={<AddMemberIcon width={43} height={43} />}
                />
                <View style={styles.marginTop10}>
                  <Text styles={styles.actionText}>{t('member')}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Popover
        popoverStyle={styles.menuStyle}
        placement="bottom"
        onRequestClose={() => setMenu(false)}
        isVisible={menu}
        from={popoverRef}
        arrowStyle={styles.wrap}
      >
        <TouchableOpacity
          style={[styles.menuWrapper, styles.modalHeader]}
          onPress={() => onItemClick(Routes.ManageUnit)}
        >
          <Text style={styles.modalHeaderText}>{t('manage_unit')}</Text>
        </TouchableOpacity>
      </Popover>
      <Header
        wrapStyle={styles.wrap}
        leftComponent={
          <BackDefault
            fixedHeight
            goBack={goBack}
            color={dark ? Colors.Black : Colors.White}
          />
        }
        title={title}
        rightComponent={
          hideRight ? (
            <View />
          ) : (
            <View style={styles.leftButtonContainer}>
              <TouchableOpacity
                onPress={() => setShowModal(true)}
                style={styles.rightHeader}
              >
                <IconOutline
                  name="plus"
                  size={32}
                  color={dark ? Colors.Black : Colors.White}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setMenu(true)}
                style={styles.rightHeader}
              >
                <IconOutline
                  name="more"
                  size={30}
                  color={dark ? Colors.Black : Colors.White}
                />
              </TouchableOpacity>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.TextTransparent,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  menuStyle: {
    borderRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  menuWrapper: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  actionWrapper: {
    padding: 16,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    flexBasis: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: Colors.Gray8,
    lineHeight: 30,
  },
  leftButtonContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 15,
    paddingTop: 2,
  },
  // modal
  popoverStyle: {
    width: widthScreen,
    backgroundColor: Colors.White,
    bottom: 0,
    left: 0,
    position: 'absolute',
    borderRadius: 10,
  },
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
  modalHeader: {
    padding: 16,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: Colors.Gray4,
  },
  modalHeaderText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  noMargin: {
    margin: 0,
  },
  marginTop10: {
    marginTop: 10,
  },
});

export default HeaderComponent;
