import { ChannelRequestPriority, sortByPriority } from '../client';

describe('sortByPriority', () => {
  [
    {
      input: [{ priority: ChannelRequestPriority.Low }, { priority: ChannelRequestPriority.High }],
      expected: [
        { priority: ChannelRequestPriority.High },
        { priority: ChannelRequestPriority.Low },
      ],
    },
    {
      input: [{ priority: ChannelRequestPriority.Low }, { priority: undefined }],
      expected: [{ priority: undefined }, { priority: ChannelRequestPriority.Low }],
    },
    {
      input: [{ priority: undefined }, { priority: ChannelRequestPriority.High }],
      expected: [{ priority: ChannelRequestPriority.High }, { priority: undefined }],
    },
  ].forEach(({ input, expected }, index) => {
    it(`sorts by priority: ${index}`, () => {
      expect(input.sort(sortByPriority)).toEqual(expected);
    });
  });
});
