import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      neutral: 0,
      bad: 0
    })
  })
  test('increments function properly', () => {
    const state = initialState
    deepFreeze(state)
    let newState = counterReducer(state, { type: 'NEUTRAL' })
    deepFreeze(newState)
    newState = counterReducer(newState, { type: 'BAD' })
    newState = counterReducer(newState, { type: 'BAD' })
    expect(newState).toEqual({
      good: 0,
      neutral: 1,
      bad: 2
    })
  })
  test('counter is reset properly', () => {
    const state = initialState
    deepFreeze(state)
    const midState = counterReducer(state, { type: 'GOOD' })
    expect(midState).toEqual({ ...state, good: 1 })
    deepFreeze(midState)
    const endState = counterReducer(state, { type: 'ZERO' })
    expect(endState).toEqual(state)
  })
})
