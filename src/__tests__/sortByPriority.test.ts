import { sortByPriority } from '../client';
import { ChannelRequestPriority } from '../types';

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
      input: [
        { priority: ChannelRequestPriority.Low },
        { priority: ChannelRequestPriority.Medium },
      ],
      expected: [
        { priority: ChannelRequestPriority.Medium },
        { priority: ChannelRequestPriority.Low },
      ],
    },
    {
      input: [
        { priority: ChannelRequestPriority.Medium },
        { priority: ChannelRequestPriority.High },
      ],
      expected: [
        { priority: ChannelRequestPriority.High },
        { priority: ChannelRequestPriority.Medium },
      ],
    },
  ].forEach(({ input, expected }, index) => {
    it(`sorts by priority: ${index}`, () => {
      expect(input.sort(sortByPriority)).toEqual(expected);
    });
  });
});
