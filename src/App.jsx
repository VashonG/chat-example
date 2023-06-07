import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';
import './layout.css';

const chatClient = new StreamChat('wjka83n58p22');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaWN5LWJhc2UtNyJ9.qgLz0WQDVs5bKBglhcjZMJmLnuu3yKRq0NT07zi_ee8';

chatClient.connectUser(
  {
    id: 'icy-base-7',
    name: 'icy-base-7',
    image: 'https://getstream.io/random_png/?id=icy-base-7&name=icy-base-7',
  },
  userToken,
);

const channel = chatClient.channel('messaging', 'custom_channel_id', {
  // add as many custom fields as you'd like
  image: 'https://www.karatcard.club/images/new/kUo0tPirEvxIlqHBvzLxYyDEAE-removebg-preview.png',
  name: 'Carat Advisor',
  members: ['icy-base-7'],
});

const App = () => (
  <Chat client={chatClient} theme='str-chat__theme-light'>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export const useClient = ({ apiKey, userData, tokenOrProvider }) => {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const client = new StreamChat(apiKey);
    // prevents application from setting stale client (user changed, for example)
    let didUserConnectInterrupt = false;

    const connectionPromise = client.connectUser(userData, tokenOrProvider).then(() => {
      if (!didUserConnectInterrupt) setChatClient(client);
    });

    return () => {
      didUserConnectInterrupt = true;
      setChatClient(null);
      // wait for connection to finish before initiating closing sequence
      connectionPromise
        .then(() => client.disconnectUser())
        .then(() => {
          console.log('connection closed');
        });
    };
  }, [apiKey, userData.id, tokenOrProvider]);

  return chatClient;
};

export default App;