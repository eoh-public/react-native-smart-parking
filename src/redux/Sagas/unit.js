import { takeEvery, put } from 'redux-saga/effects';
import { UNIT_DETAILS, UNITS_NEAR_ME } from '../Actions/unit';
import { API } from '../../configs';
import { axiosGet } from '../../utils/Apis/axios';

function* fetchUnitDetail(params) {
  const { unitId, config } = params;
  const result = yield axiosGet(API.UNIT.UNIT_DETAIL(unitId), config, true);
  if (result.success) {
    yield put({
      type: UNIT_DETAILS.SUCCESS,
      result,
    });
  } else {
    yield put({
      type: UNIT_DETAILS.FAIL,
      result,
    });
  }
}

function* fetchUnitsNearMe(params) {
  const { lat, lon, page } = params;
  const result = yield axiosGet(API.UNIT.UNIT_NEAR_ME(lat, lon, page));
  if (result.success) {
    yield put({
      type: UNITS_NEAR_ME.SUCCESS,
      result,
    });
  }
}

export default function* () {
  yield takeEvery(UNIT_DETAILS.REQUEST, fetchUnitDetail);
  yield takeEvery(UNITS_NEAR_ME.REQUEST, fetchUnitsNearMe);
}
