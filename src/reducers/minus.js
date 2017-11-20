export default function minus(state = { value: 0 }, action) {
  const value = state.value
  switch (action.type) {
    case 'minus':
      return { value: value - 1 }
    default:
      return state
  }
}