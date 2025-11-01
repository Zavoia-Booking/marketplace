import { all } from 'redux-saga/effects';
import { AuthSaga } from '../features/auth/sagas';
import { watchTokenHandler } from '../features/auth/hydrateSession.saga';

export default function* rootSaga() {
  yield all([
    AuthSaga(),
    watchTokenHandler(),
  ]);
}

