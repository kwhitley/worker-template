# Template API (v1)

### GET `/version` - the release version of this API

Example `/version`
```js
{
  "version": "0.1.0"
}
```

---

### GET `/v1/counter/:id` - get a counter

Example `/v1/counter/foo`
```js
{
  id: 'foo',
  counter: 0,
}
```

---

### GET `/v1/counter/:id/:action` - execute an action on a counter

Example:
```js
// GET /v1/counter/foo/increment
{
  id: 'foo',
  counter: 1,
}

// GET /v1/counter/foo/increment
{
  id: 'foo',
  counter: 2,
}

// GET /v1/counter/foo/reset
{
  id: 'foo',
  counter: 0,
}
```

---
