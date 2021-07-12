import { removeDuplicateSearch, keyExtractor } from '../array';

test('test removeDuplicateSearch', () => {
  let recentSearch = [
    { description: 'a' },
    { description: 'b' },
    { description: 'c' },
  ];
  removeDuplicateSearch(recentSearch, 'b');
  expect(recentSearch).toStrictEqual([
    { description: 'a' },
    { description: 'c' },
  ]);
});

test('test keyExtractor', () => {
  const item = {
    id: 111,
    name: 'test',
  };
  const result = keyExtractor(item);
  expect(result).toStrictEqual(111);
});
