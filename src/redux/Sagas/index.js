import { all, call, spawn } from 'redux-saga/effects';
import watchAuth from './auth';

export default function* sagas() {
  const watches = [watchAuth];

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
