import { put, takeEvery } from 'redux-saga/effects';
import { INIT_AUTH } from '../Actions/auth';

function* initAuth(obj) {
  const { params = {} } = obj;
  yield put({
    type: INIT_AUTH.SUCCESS,
    data: params,
  });
}

export default function* () {
  yield takeEvery(INIT_AUTH.REQUEST, initAuth);
}
