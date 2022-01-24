import {StateType, ActionType} from 'typesafe-actions';
export type ReducerState = StateType<  typeof import('../reducers/reducer').default>;
export type UserActions = ActionType<  typeof import('../actions/UserActions')>;