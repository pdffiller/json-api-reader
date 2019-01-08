import message from '../sample-message-2.json';
import { readAsList, readAsLookup } from '../src/index';
import { composeMappers, getValue, map, populate } from '../src/processing';


const lookup = readAsLookup(message);
const list = readAsList(message);

describe('processing.map', () => {
  test('it should create a function', () => {
    const mapOrgUser = map('organizationUsers', ({ id }) => id);
    expect(mapOrgUser).toBeInstanceOf(Function);
  });

  test('it should map orgUsers from lookup with replacing id with orgUserId', () => {
    const mapOrgUser = map('organizationUsers', () => ({ id, ...props }) => ({ ...props, orgUserId: id }));
    expect(mapOrgUser(lookup).entities.organizationUsers).toMatchSnapshot();
  });

  test('it should map orgUsers from list with replacing id with orgUserId', () => {
    const mapOrgUser = map('organizationUsers', () => ({ id, ...props }) => ({ ...props, orgUserId: id }));
    expect(mapOrgUser(list).entities.organizationUsers).toMatchSnapshot();
  });

  test('it should do nothing if lookup doesn\'t contain entities', () => {
    const mapOrgUser = map('someUnexistingEntities', () => ({ id, ...props }) => ({ ...props, orgUserId: id }));
    expect(mapOrgUser(lookup).entities).toEqual(lookup.entities);
  });

  test('it should map orgUsers from list with replacing id with orgUserId', () => {
    const mapOrgUser = map('someUnexistingEntities', () => ({ id, ...props }) => ({ ...props, orgUserId: id }));
    expect(mapOrgUser(list).entities).toEqual(list.entities);
  });
});


describe('processing.composeMappers', () => {
  const userToId = () => orgUser => ({
    ...orgUser,
    orgUserId: orgUser.id,
    id: orgUser.user,
    user: undefined,
  });

  const mergeWithUser = ({ entities }) => {
    const getUser = getValue(entities.users);
    return orgUser => ({
      ...orgUser,
      ...getUser(orgUser.id),
    });
  };

  test('it should create a function after mappers composition', () => {
    const mapOrgUser = composeMappers(
      mergeWithUser,
      userToId,
    );
    expect(mapOrgUser).toBeInstanceOf(Function);
  });

  test('it should be possible apply composed mappers with lookup', () => {
    const mapOrgUser = map('organizationUsers',
      composeMappers(
        mergeWithUser,
        userToId,
      )
    );
    expect(mapOrgUser(lookup).entities.organizationUsers).toMatchSnapshot();
  });

  test('it should be possible apply composed mappers with list', () => {
    const mapOrgUser = map('organizationUsers',
      composeMappers(
        mergeWithUser,
        userToId,
      )
    );
    expect(mapOrgUser(list).entities.organizationUsers).toMatchSnapshot();
  });
});

describe('processing.populate', () => {
  test('it should create a function', () => {
    const populateUser = populate('user', 'users');
    expect(populateUser).toBeInstanceOf(Function);
  });

  test('it should populate user in orgUsers from lookup with replacing id with orgUserId', () => {
    const populateUser = populate('user', 'users');
    const mapOrgUser = map('organizationUsers', populateUser);
    expect(mapOrgUser(lookup).entities.organizationUsers).toMatchSnapshot();
  });

  test('it should populate user in map orgUsers from list with replacing id with orgUserId', () => {
    const populateUser = populate('user', 'users');
    const mapOrgUser = map('organizationUsers', populateUser);
    expect(mapOrgUser(list).entities.organizationUsers).toMatchSnapshot();
  });
});
