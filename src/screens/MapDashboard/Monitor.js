import { getPusher, destroyPusher } from '../../utils/Pusher';

// eslint-disable-next-line promise/prefer-await-to-callbacks
export const watchViolationData = (user, callback) => {
  const channel = getPusher().subscribe(`private-user-${user.id}`);
  channel.bind('violation-created', callback);
};

export const unwatchViolationData = (user) => {
  getPusher().unsubscribe(`private-user-${user.id}`);
  destroyPusher();
};
