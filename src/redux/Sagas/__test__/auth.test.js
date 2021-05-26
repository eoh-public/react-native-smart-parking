import authSagaAction, { initAuth } from '../auth';
import { takeEvery } from 'redux-saga/effects';
import { INIT_AUTH } from '../../Actions/auth';
import { runSaga } from '@redux-saga/core';

describe('Test auth saga', () => {
  const obj = { params: {} };

  it('Test auth saga listen', () => {
    const genObject = authSagaAction();
    const generator = genObject.next();
    expect(generator.value).toEqual(takeEvery(INIT_AUTH.REQUEST, initAuth));
    expect(genObject.next().done).toBeTruthy();
  });

  it('Test init auth saga success', async (done) => {
    const dispatched = [];
    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      initAuth,
      obj
    ).toPromise();
    expect(dispatched).toEqual([
      {
        type: INIT_AUTH.SUCCESS,
        data: obj.params,
      },
    ]);
    done();
  }, 500);
});
