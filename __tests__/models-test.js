import {Thread, Message, Recipient} from '../src/models'

test('Successful Thread object', () => {
  let thread = new Thread({ messages: [] })
  expect(
    thread.messages
  ).toHaveLength(0);
});
