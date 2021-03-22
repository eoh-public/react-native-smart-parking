import { removeDuplicateSearch } from '../array';

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
