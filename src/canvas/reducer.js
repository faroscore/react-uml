// @flow

import type { ActionShape, Action } from '../diagram/reducer';
import type { Id } from '../entity/reducer';

export type CanvasState = {
  offset: {
    x: number,
    y: number,
  },
  cursor: {
    x: number,
    y: number,
  },
  connecting: {
    currently: boolean,
    from: Id,
  },
};

export type Coords = { x: number, y: number };
export type ConnectingPayload = {
  currently: boolean,
  from: Id,
};
export type CanvasAction =
  | ActionShape<'rd/canvas/SET_OFFSET', Coords>
  | ActionShape<'rd/canvas/TRACK', Coords>
  | ActionShape<'rd/canvas/CONNECT', ConnectingPayload>;

const canvasReducer = (state: CanvasState, action: Action): CanvasState => {
  switch (action.type) {
    case 'rd/canvas/SET_OFFSET':
      return {
        ...state,
        offset: action.payload,
      };

    case 'rd/canvas/TRACK':
      /* TODO: these coordinates are also useful for entity in general. I
       * shouldn't be tracking mouse position in several places independently
       * and perhaps I should converge to always using the cursor position as
       * calculated in the canvas reducer */

      /* TODO: History shouldn't be tracking mouse position. I should define
        * explicitely what actions should history listen for or find some way
        * to not track mouse position as something "undoable" 'cause that
        * doesn't make sense for the user. Nor anyone. Capisce? */

      return {
        ...state,
        cursor: {
          x: action.payload.x - state.offset.x,
          y: action.payload.y - state.offset.y,
        },
      };

    case 'rd/canvas/CONNECT':
      return {
        ...state,
        connecting: action.payload,
      };

    case 'rd/entity/LINK_TO':
      return {
        ...state,
        connecting: {
          currently: false,
          from: '',
        },
      };

    default:
      return state;
  }
};

export const setOffset = (payload: Coords): CanvasAction => ({
  type: 'rd/canvas/SET_OFFSET',
  payload,
});

export const trackMovement = (payload: Coords): CanvasAction => ({
  type: 'rd/canvas/TRACK',
  payload,
});

export const connecting = (payload: ConnectingPayload): CanvasAction => ({
  type: 'rd/canvas/CONNECT',
  payload,
});

export default canvasReducer;
