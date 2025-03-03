import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import AuthSlice from './slice/AuthSlice'
import CartSlice from './slice/CartSlice'

const rootReducer = combineReducers({
    AuthSlice,
    CartSlice
})

const store = configureStore({
    reducer: rootReducer
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store