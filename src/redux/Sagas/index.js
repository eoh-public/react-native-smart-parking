import { all, call, spawn } from 'redux-saga/effects';
import watchAuth from './auth';
import watchUnit from './unit';
import watchDashboard from './dashboard';

export default function* sagas() {
  const watches = [watchAuth, watchUnit, watchDashboard];

  yield all(
    watches.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {}
        }
      })
    )
  );
}
