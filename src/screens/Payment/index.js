import React, {
  memo,
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Icon } from '@ant-design/react-native';
import { t } from 'i18n-js';

import Text from '../../commons/Text';
import { Colors, API } from '../../configs';
import { AlertAction, MenuActionMore, MenuActionList } from '../../commons';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { useBoolean, usePopover } from '../../hooks/Common';

import { useStateAlertRemove } from './hooks/useStateAlertRemove';
import Routes from '../../utils/Route';
import { axiosGet, axiosDelete, axiosPost } from '../../utils/Apis/axios';
import CardItem from './CardItem';

import {
  SvgCreditCardColor,
  SvgCreditCardGray,
} from '../../../assets/images/SmartParking';
import { TESTID } from '../../configs/Constants';

const Payment = memo(() => {
  const [showRemove, setShowRemove] = useState(false);
  const [showDefault, setShowDefault] = useState(false);
  const [isShowModal, setShowModal, setHideModal] = useBoolean(false);
  const [loading, setLoading] = useState(false);

  const [cards, setCards] = useState([]);
  const {
    childRef,
    showingPopover,
    showPopoverWithRef,
    hidePopover,
  } = usePopover();
  const {
    stateAlertRemove,
    onShowRemoveAlert,
    onShowChangeDefaultAlert,
    hideAlertAction,
  } = useStateAlertRemove();

  const listMenuItem = useMemo(
    () => [
      {
        action: () => {
          setShowDefault(true);
          setShowRemove(false);
        },
        text: t('change_default'),
      },
      {
        action: () => {
          setShowRemove(true);
          setShowDefault(false);
        },
        text: t('remove'),
      },
    ],
    []
  );

  const { navigate } = useNavigation();

  const listAddItems = useMemo(
    () => [
      {
        id: 1,
        icon: <SvgCreditCardColor width={24} height={24} />,
        text: 'Credit card',
        route: Routes.SmartParkingAddCard,
      },
    ],
    []
  );

  const buttonMoreRef = useRef(null);

  const onPlus = useCallback(() => {
    setShowModal();
  }, [setShowModal]);

  const onMore = useCallback(() => {
    showPopoverWithRef(buttonMoreRef);
  }, [buttonMoreRef, showPopoverWithRef]);

  const onMenuClick = useCallback((item) => {
    item.action && item.action();
  }, []);

  const fetchCard = useCallback(async () => {
    setLoading(true);
    const { success, data } = await axiosGet(API.ACCOUNTS.LIST_PAYMENT_METHODS);
    if (success) {
      setCards(data.cards);
    }
    setLoading(false);
  }, []);

  const onPressRemove = useCallback(async () => {
    hideAlertAction();
    const { success } = await axiosDelete(
      API.ACCOUNTS.REMOVE_CARD(stateAlertRemove.itemRemove.id)
    );
    if (success) {
      fetchCard();
      setShowRemove(false);
    }
    setLoading(false);
  }, [fetchCard, hideAlertAction, stateAlertRemove.itemRemove.id]);

  const onPressChangeDefault = useCallback(async () => {
    setLoading(true);
    hideAlertAction();
    const { success } = await axiosPost(API.ACCOUNTS.CHANGE_DEFAULT_CARD, {
      card: stateAlertRemove.itemRemove.id,
    });
    if (success) {
      fetchCard();
      setShowDefault(false);
    }
    setLoading(false);
  }, [fetchCard, hideAlertAction, stateAlertRemove.itemRemove.id]);

  const onItemAddClick = useCallback(
    (item) => {
      item.route && navigate(item.route, { fetchCard: fetchCard });
    },
    [fetchCard, navigate]
  );

  const onRefresh = useCallback(() => {
    fetchCard();
  }, [fetchCard]);

  useEffect(() => {
    fetchCard();
    setShowRemove(false);
  }, [fetchCard]);

  return (
    <View style={styles.container}>
      <WrapHeaderScrollable
        title={t('payment_methods')}
        styleScrollView={styles.container}
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity
              testID={TESTID.PAYMENT_ON_PLUS}
              style={styles.btnPlus}
              onPress={onPlus}
            >
              <Icon name={'plus'} size={30} color={Colors.Gray9} />
            </TouchableOpacity>
            <TouchableOpacity
              testID={TESTID.PAYMENT_ON_MORE}
              style={styles.btnMore}
              onPress={onMore}
              ref={buttonMoreRef}
            >
              <Icon name={'more'} size={30} color={Colors.Gray9} />
            </TouchableOpacity>
          </View>
        }
        onRefresh={onRefresh}
        loading={loading}
      >
        {loading ? null : cards.length > 0 ? (
          <View style={styles.content}>
            <Text semibold style={styles.title}>
              {t('saved_card')}
            </Text>
            {cards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                showRemove={showRemove}
                showDefault={showDefault}
                onPressMinus={onShowRemoveAlert(card)}
                onPressChangeDefault={onShowChangeDefaultAlert(card)}
              />
            ))}
            <Text semibold style={styles.title}>
              {t('other_payment_methods')}
            </Text>
            {/* {eWallets.map((wallet) => (
              <EWalletItem
                key={wallet.id}
                wallet={wallet}
                showRemove={showRemove}
                showDefault={showDefault}
                onPressMinus={onShowRemoveAlert(wallet.name)}
              />
            ))} */}
          </View>
        ) : (
          <View style={styles.content}>
            <SvgCreditCardGray style={styles.svgCreditCard} />
            <Text color={Colors.Gray7} style={styles.txtEmpty}>
              {t('have_not_method_yet')}
            </Text>
            <Text color={Colors.Gray7} style={styles.txtEmpty}>
              {t('tap_plus_to_add_more')}
            </Text>
          </View>
        )}
      </WrapHeaderScrollable>

      <MenuActionMore
        isVisible={showingPopover}
        hideMore={hidePopover}
        listMenuItem={listMenuItem}
        childRef={childRef}
        onItemClick={onMenuClick}
      />

      <MenuActionList
        title={t('choose_payment')}
        visible={isShowModal}
        hideModal={setHideModal}
        listItem={listAddItems}
        onItemClick={onItemAddClick}
      />

      <AlertAction
        visible={stateAlertRemove.visible}
        hideModal={hideAlertAction}
        title={stateAlertRemove.title}
        message={stateAlertRemove.message}
        leftButtonTitle={stateAlertRemove.leftButton}
        leftButtonClick={hideAlertAction}
        rightButtonTitle={stateAlertRemove.rightButton}
        rightButtonClick={showRemove ? onPressRemove : onPressChangeDefault}
        rightButtonStyle={
          showRemove ? styles.removeButton : styles.changeButton
        }
      />
    </View>
  );
});

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEmpty: {
    marginTop: 16,
  },
  svgCreditCard: {
    marginTop: 130,
  },
  btnPlus: {
    marginRight: 8,
  },
  btnMore: {
    marginRight: 10,
  },
  headerRight: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.Gray9,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 24,
    alignSelf: 'flex-start',
    paddingLeft: 16,
  },
  removeButton: {
    color: Colors.Gray6,
  },
  changeButton: {
    color: Colors.Primary,
  },
});
