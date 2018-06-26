# json-api-reader

The api to parse messages in `json-api`-format into plain `js`-object,
grouped in lookups or in lists.

## Installation
```shell
npm i -D json-api-reader
```

Don't forget to add `json-api-reader` to the `peerDependencies` too.

## Usage

```js
import { readAsLookup, readAsList } from 'json-api-reader/lib';


const message = {
  "links": {
    "self": "http://example.com/articles",
    "next": "http://example.com/articles?page[offset]=2",
    "last": "http://example.com/articles?page[offset]=10"
  },
  "data": [{
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON API paints my bikeshed!"
    },
    "relationships": {
      "author": {
        "links": {
          "self": "http://example.com/articles/1/relationships/author",
          "related": "http://example.com/articles/1/author"
        },
        "data": { "type": "people", "id": "9" }
      },
      "comments": {
        "links": {
          "self": "http://example.com/articles/1/relationships/comments",
          "related": "http://example.com/articles/1/comments"
        },
        "data": [
          { "type": "comments", "id": "5" },
          { "type": "comments", "id": "12" }
        ]
      }
    },
    "links": {
      "self": "http://example.com/articles/1"
    }
  }],
  "included": [{
    "type": "people",
    "id": "9",
    "attributes": {
      "first-name": "Dan",
      "last-name": "Gebhardt",
      "twitter": "dgeb"
    },
    "links": {
      "self": "http://example.com/people/9"
    }
  }, {
    "type": "comments",
    "id": "5",
    "attributes": {
      "body": "First!"
    },
    "relationships": {
      "author": {
        "data": { "type": "people", "id": "2" }
      }
    },
    "links": {
      "self": "http://example.com/comments/5"
    }
  }, {
    "type": "comments",
    "id": "12",
    "attributes": {
      "body": "I like XML better"
    },
    "relationships": {
      "author": {
        "data": { "type": "people", "id": "9" }
      }
    },
    "links": {
      "self": "http://example.com/comments/12"
    }
  }]
};

const lookups = readAsLookup(message);

console.log(
  JSON.stringify(lookups, null, '  ')
);

const lists = readAsList(message);

console.log(
  JSON.stringify(lists, null, '  ')
);
```

First prints:
```json
{
  "entities": {
    "articles": {
      "1": {
        "id": "1",
        "title": "JSON API paints my bikeshed!",
        "author": "9",
        "comments": [
          "5",
          "12"
        ]
      }
    },
    "people": {
      "9": {
        "id": "9",
        "firstName": "Dan",
        "lastName": "Gebhardt",
        "twitter": "dgeb"
      }
    },
    "comments": {
      "5": {
        "id": "5",
        "body": "First!",
        "author": "2"
      },
      "12": {
        "id": "12",
        "body": "I like XML better",
        "author": "9"
      }
    }
  },
  "result": [
    "1"
  ]
}
```

Then prints:
```json
{
  "entities": {
    "articles": [
      {
        "id": "1",
        "title": "JSON API paints my bikeshed!",
        "author": "9",
        "comments": [
          "5",
          "12"
        ]
      }
    ],
    "people": [
      {
        "id": "9",
        "firstName": "Dan",
        "lastName": "Gebhardt",
        "twitter": "dgeb"
      }
    ],
    "comments": [
      {
        "id": "5",
        "body": "First!",
        "author": "2"
      },
      {
        "id": "12",
        "body": "I like XML better",
        "author": "9"
      }
    ]
  },
  "result": [
    "1"
  ]
}
```


## Specification

-----
### `readAsLookup(message) -> { entities, result }`

**Parameters**
 * message: `Object` - the message in `json-api` format as `js`-object

**Returns**: `Object`
 * entities: `{ [collectionName]: { [id]: Object } }` - lookup-object with keys that corespond to the `type` of entities mentioned in the `json-api`-message, and values that are also a lookup-objects containing objects' id's as keys and entities as values.

 * result: `any|any[]` - the id or list of ids of entities recieved in message (in the `data` section)

-----
 ### `readAsList(message) -> { entities, result }`

**Parameters**
 * message: `Object` - the message in `json-api` format as `js`-object

**Returns**: `Object`
 * entities: `{ [collectionName]: Object[] }` - lookup-object with keys that corespond to the `type` of entities mentioned in the `json-api`-message, and values that are arrays of appropriate entities.

 * result: `any|any[]` - the id or list of ids of entities recieved in message (in the `data` section)