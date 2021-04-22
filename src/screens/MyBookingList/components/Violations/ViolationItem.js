import React, { memo } from 'react';
import { View } from 'react-native';

const ViolationItem = memo(
  ({
    id,
    is_paid,
    arrive_at,
    leave_at,
    time_remaining,
    parking,
    confirmed_arrival_at,
    start_countdown,
    billing_id,
    spot_name,
    grand_total,
    payment_url,
    payment_method,
    onParkingCompleted,
    reloadData,
  }) => {
    return <View />;
  }
);

export default ViolationItem;
