import { jsonApiEntity } from './entity';
import { jsonApiMessage } from './message';

export { jsonApiEntity, jsonApiMessage };

export const ofType = type => values => ({
  [type]: values,
});
