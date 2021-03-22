import { put, takeLatest } from 'redux-saga/effects';
import { API } from '../../configs';
import { axiosPost } from '../../utils/Apis/axios';
import { ADD_USER } from '../Actions/dashboard';

function* addUser({ payload }) {
  const result = yield axiosPost(API.UNIT.ADD_USER, { phone_number: payload });
  if (result.success) {
    yield put({
      type: ADD_USER.SUCCESS,
      result,
    });
  } else {
    yield put({
      type: ADD_USER.FAIL,
      result,
    });
  }
}

export default function* () {
  yield takeLatest(ADD_USER.REQUEST, addUser);
}
