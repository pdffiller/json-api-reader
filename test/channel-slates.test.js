import { jsonApiEntity, jsonApiMessage } from '../src/reverse';

const lookup = {
  temp_id_1: {
    slate: '121224-1242141234-23141234-2342134',
    access: 'CAN-FILL',
  },
  temp_id_2: {
    slate: '121224-1242141234-23141234-2342134',
    access: 'CAN-FILL',
  },
  temp_id_3: {
    slate: '121224-1242141234-23141234-2342134',
    access: 'CAN-FILL',
  },
  temp_id_4: {
    slate: '121224-1242141234-23141234-2342134',
    access: 'CAN-FILL',
  },
};

const ChannelSlateModel = jsonApiEntity({
  type: 'channelSlates',
  refs: ['slate'],
  // attrs: ['access'],
});

const msgAddSlateToChannel = jsonApiMessage({ channel_slates: ChannelSlateModel }, 'channel_slates');

const message = msgAddSlateToChannel(
  { channel_slates: ['temp_id_1', 'temp_id_2'] },
  { channel_slates: lookup }
);

console.log(JSON.stringify(message, null, 2));

test(() => {});
