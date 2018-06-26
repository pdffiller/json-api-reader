# json-api-reader

The api to parse messages in `json-api`-format into plain `js`-object,
grouped in lookups or in lists.

Since version `1.1.0` the module also supports the reverse transformation to
`jsonApiEntity` and to the `jsonApiMessage`.


## Installation
```shell
npm i -D json-api-reader
```

Don't forget to add `json-api-reader` to the `peerDependencies` too.


## Api

The module api is:
 * [readAsLookup](#to-lookup) - transforms `json-api`-message to set of entity-lookups
 * [readAsList](#to-list) - transforms `json-api`-message to set of entity-lists
 * [jsonApiEntity](#to-entity) - transforms `js`-object to the valid `json-api`-entity
 * [jsonApiMessage](#to-message) - transforms set of `js`-objects to the `json-api`-message

In order to reduce snippets of json-messages the sample has been extracted to the file: <br/>
[sample-message.json](https://github.com/pdffiller/json-api-reader/blob/master/sample-message.json)

Please get aware of it.

-----
<a name="to-lookup"></a>
## Transform json-api-message to set of lookups

> **readAsLookup**:<br/>
> `message -> { entities, result }`

**Parameters**
 * **message**: `Object` - the message in `json-api` format as `js`-object

**Returns**: `Object`
 * **entities**: `{ [collectionName]: { [id]: Object } }` - lookup-object with keys that corespond to the `type` of entities mentioned in the `json-api`-message, and values that are also a lookup-objects containing objects' id's as keys and entities as values.

 * **result**: `any|any[]` - the id or list of ids of entities recieved in message (in the `data` section)


### Usage

```js
import { readAsLookup } from 'json-api-reader/lib';
import message from 'json-api-reader/sample-message';


const lookups = readAsLookup(message);

console.log(
  JSON.stringify(lookups, null, '  ')
);
```

Prints:
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


-----
<a name="to-list"></a>
## Transform json-api-message to set of arrays

> **readAsList**:<br/>
> `message -> { entities, result }`

**Parameters**
 * **message**: `Object` - the message in `json-api` format as `js`-object

**Returns**: `Object`
 * **entities**: `{ [collectionName]: Object[] }` - lookup-object with keys that corespond to the `type` of entities mentioned in the `json-api`-message, and values that are arrays of appropriate entities.

 * **result**: `any|any[]` - the id or list of ids of entities recieved in message (in the `data` section)

 ### Usage

```js
import { readAsList } from 'json-api-reader/lib';
import message from 'json-api-reader/sample-message';


const list = readAsList(message);

console.log(
  JSON.stringify(list, null, '  ')
);
```

Prints:
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

----
<a name="to-entity"></a>

## Transform js-object to the valid json-api-entity

> **jsonApiEntity**:<br/>
> `({ type, refs?, attrs? }) -> jsObject -> { id?, type, attributes, relationships? }`

**Parameters**:

* **type**: `String` - the type of entity to be translated to the `json-api`

* **refs**: `String` | `String[]` | `{ [fieldName]: Boolean | String }` 
(*optional*) -- the object with keys correspond to the fields of `jsObject`.
The values should be `true`, `false` (in order to ommit the field) or `<entity-type>` to be translated to the `json-api`. The **refs** parameter will be mapped to the `relationships` parameter of resulted entity.
The string or an array of string will be interpreted as key names and values will be infered as `true`. If no value provided no `releationships` will be present in the result entity.

* **attrs**: `String` | `String[]` | `{ [fieldName]: Boolean | String }`
(*optional*) -- the object with keys that correspond to the fields of `jsObject`. The values could be `true`, `false` (in order to ommit field) or `<entity-field-name>` that be used as field name in `json-api`-entity. The `attrs` parameter will be mapped to the `attributes` field of resulted entity.
The string or an array of string will be interpreted as key names and values will be infered as `true`. If no value provided then all fields of `jsObject` (excl. `refs`) will be mapped to the `json-api`-format.

**Returns**:

> Anonymous Transforming Function:<br/>
> `jsObject -> { id?, type, attributes, relationships? }`

**Accepts**:
* **jsObject**: `Object` - `js`-object to be transformed to the `json-api`-entity

**Returns**: `json-api`-entity:
* **id**: `any` (*could be omitted*) -- the id of entity calculated as `jsObject.id`
* **type**: `String` -- the type of entity. Corresponds to the **type** argument of `jsonApiEntity`
* **attributes**: `Object` -- the attributes of entity

### Usage

```js
import { jsonApiEntity } from 'json-api-reader/lib/reverse';

const accounts = jsonApiEntity({
  type: 'Accounts'
});

const entity = accounts({
  id: '2600-0-0000',
  title: 'Current Account',
});

console.log(
  JSON.stringify(entity, null, '  ')
);
```

Prints:
```json
{
  "id": "2600-0-0000",
  "type": "accounts",
  "attributes": {
    "title": "Current Account"
  }
}
```

Another case:
```js
import { jsonApiEntity } from 'json-api-reader/lib/reverse';
import { entities } from  'json-api-reader/test/__fixtures__/base-result-list';

const articles = jsonApiEntity({
  type: 'articles',
  refs: { author: 'people', comments: true },
});
const value = entities.articles[0];
console.log(
  JSON.stringify(articles(value), null, '  ')
);
```

Prints:
```json
{
  "id": "1",
  "type": "articles",
  "attributes": {
    "title": "JSON API paints my bikeshed!"
  },
  "relationships": {
    "author": {
      "data": {
        "type": "people",
        "id": "9"
      }
    },
    "comments": {
      "data": [
        {
          "type": "comments",
          "id": "5"
        },
        {
          "type": "comments",
          "id": "12"
        }
      ]
    }
  }
}
```