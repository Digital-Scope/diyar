export const jumpToIndex = (index, n, length) => (
  ((index + n) % length) + (index + n < 0 ? length : 0)
);
export const jumpTo = (current, n, array) => (
  array[jumpToIndex(array.findIndex(element => element === current), n, array.length)]
);

export const nextIndex = (index, length) => jumpToIndex(index, 1, length);
export const previousIndex = (index, length) => jumpToIndex(index, -1, length);

export const next = (current, array) => (
  array[nextIndex(array.findIndex(element => element === current), array.length)]
);
export const previous = (current, array) => (
  array[previousIndex(array.findIndex(element => element === current), array.length)]
);

export default {
  jumpToIndex,
  jumpTo,
  nextIndex,
  previousIndex,
  next,
  previous,
};
