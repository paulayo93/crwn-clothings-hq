import {takeLatest, call, put, all} from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import {convertCollectionsSnapShotToMap, firestore} from "../../firebase/firebase.utils";
import {fetchCollectionsFailure,  fetchCollectionsSuccess} from "./shop.actions";


export function* fetchCollectionsAsync() {
    yield console.log('I am fired')

    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield  call(convertCollectionsSnapShotToMap, snapshot);
        yield  put(fetchCollectionsSuccess(collectionsMap));

    } catch (error) {
        yield  put(fetchCollectionsFailure(error.message));
    }


    // collectionRef.get().then(snapshot => {
    //     const collectionsMap =   convertCollectionsSnapShotToMap(snapshot)
    //     dispatch(fetchCollectionsSuccess(collectionsMap))
    //     this.setState({loading: false});
    // }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,
       fetchCollectionsAsync )
}

export  function* shopSagas() {
    yield all([call(fetchCollectionStart)])
}
