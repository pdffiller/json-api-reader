import { jsonApiEntity, jsonApiMessage } from '../src/reverse';

const list = [
  { user: '1232145-214234123-324234' },
  { user: '1232145-214234123-324235' },
  { user: '1232145-214234123-324236' },
  { user: '1232145-214234123-324237' }
];

const channelCollaborators = jsonApiEntity({
  type: 'channel_collaborators',
  refs: { user: 'users' },
});

const inviteCollaborator = jsonApiMessage({ channelCollaborators }, 'channelCollaborators');

const message = inviteCollaborator(
  { channelCollaborators: list },
);

console.log(JSON.stringify(message, null, 2));

test(() => {});
