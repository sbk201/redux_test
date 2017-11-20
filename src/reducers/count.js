export default function count(state = { value: 123 }, action) {
  const value = state.value
  switch (action.type) {
    case 'increase':
      return { value: value + 1 }
    default:
      return state
  }
}