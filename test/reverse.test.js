import { jsonApiEntity, jsonApiMessage } from '../src/reverse';


describe('jsonApiEntity', () => {
  test('should create a mapper function', () => {
    const mapper = jsonApiEntity({
      type: 'Account'
    });
    expect(mapper).toBeInstanceOf(Function);
  });

  test('should map with type only', () => {
    const mapper = jsonApiEntity({
      type: 'Accounts'
    });
    const value = {
      id: '2600-0-0000',
      title: 'Current Account',
    };

    expect(mapper(value)).toMatchSnapshot();
  });

  test('should map with refs', () => {
    const mapper = jsonApiEntity({
      type: 'articles',
      refs: { author: 'people', comments: true },
    });
    const article = require('./__fixtures__/base-result-list').entities.articles[0];
    expect(mapper(article)).toMatchSnapshot();
  });

  test('should map with attrs', () => {
    const mapper = jsonApiEntity({
      type: 'people',
      attrs: ['lastName', 'twitter'],
    });
    const user = require('./__fixtures__/base-result-list').entities.people[0];
    expect(mapper(user)).toMatchSnapshot();
  });
});

describe('jsonApiMessage', () => {
  test('should create a function', () => {
    const Account = jsonApiEntity({ type: 'accounts' });
    const selector = jsonApiMessage({ Account }, 'Account');
    expect(selector).toBeInstanceOf(Function);
  });

  test('should create a valid json-api message', () => {
    const Account = jsonApiEntity({ type: 'accounts' });
    const selector = jsonApiMessage({ Account }, 'Account');
    const values = {
      Account: [
        {
          id: '2600-0-0000',
          title: 'Current Account',
        },
        {
          id: '2605-0-0000',
          title: 'Card Account',
        }
      ]
    };
    expect(
      selector(values)
    ).toMatchSnapshot();
  });

  test('should create a valid message in complex case', () => {
    const { entities, result } = require('./__fixtures__/base-result');
    const articles = jsonApiEntity({
      type: 'articles',
      refs: { author: 'people', comments: true },
    });
    const people = jsonApiEntity({ type: 'people' });
    const comments = jsonApiEntity({
      type: 'comments',
      refs: { author: 'people' }
    });

    const selector = jsonApiMessage({ articles, people, comments }, 'articles');
    const values = {
      articles: result,
      people: Object.keys(entities.people),
      comments: Object.keys(entities.comments),
    };

    const message = selector(values, entities);

    expect(message).toMatchSnapshot();
    expect(
      selector({
        ...values,
        articles: result[0]
      }, entities)
    ).toMatchSnapshot();
  });

  test('should create a valid message in complex case', () => {
    const { entities: values } = require('./__fixtures__/base-result-list');
    const articles = jsonApiEntity({
      type: 'articles',
      refs: { author: 'people', comments: true },
    });
    const people = jsonApiEntity({ type: 'people' });
    const comments = jsonApiEntity({
      type: 'comments',
      refs: { author: 'people' }
    });

    const selector = jsonApiMessage({ articles, people, comments }, 'articles');

    const message = selector(values);

    expect(message).toMatchSnapshot();
  });
});
