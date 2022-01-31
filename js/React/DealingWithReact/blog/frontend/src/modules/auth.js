import { createAction, handleActions } from 'redux-actions'
const SAMPLE_ACTION = 'auth/SAMPLE_ACTION'

export const sampleAction = createAction(SAMPLE_ACTION)

const initState = {}

const auth = handleActions(
  {
    [SAMPLE_ACTION]: (state, action) => state,
  },
  initState,
)
export default auth
