# Retheme API (v1)

### GET `/v1/theme?domain={domain}` - the latest theme for a domain (KV)

Example: https://api.retheme.org/v1/theme?domain=houstonchronicle.com
```js
{
  "requests": 0,
  "modified": "2022-03-18T17:51:14.153Z",
  "theme": ".fancybox-lock, \n.fancybox-lock body {\n  overflow: visible;\n}\n\n.fancybox-overlay,\n.bc_inline_sub,\n.adModule,\n.mm_related,\n.article--    aside,\n.bc_nl_article_bottom_signup,\n.bottomZone,\n.topZone,\n.belowMastheadWrapper,\n.gallery,\n.bc_header,\n[data-component=\"ad\"],\nfooter {\n  display: none;\n}\n\nmain {\n  padding-bottom: 6em;\n}\n\nbody {\n  position: static;\n}\n\nmain#content {\n  display: flex;\n  flex-flow: row wrap;\n}\n\n.authorPage {\n  display: flex;\n}\n\narticle {\n  padding: 0;\n}"
}
```

---

### GET `/v1/manifest` - the latest themed manifest (KV)
This is the manifest of themed domains, served from KV, and updated each time a theme is updated/removed.  Each domain name is adler32 hashed (for privacy), along with a timestamp of the modified date of each theme for cache validation.  This now logs a user hash in the RETHEME.users table.

Example: https://api.retheme.org/v1/manifest
```js
{
  "date": "2022-04-15T22:40:02.059Z",
  "modified": "2022-04-15T22:40:02.007Z",
  "lastModified": {
    "165610144": 1650058464688,
    "169607829": 1648015251194,
    "178389677": 1647625837578,
    ...
  }
}
```

---

### GET `/v1/domains/themed` - the latest themed manifest (KV) (deprecated)
This is the manifest of themed domains, served from KV, and updated each time a theme is updated/removed.  Each domain name is adler32 hashed (for privacy), but lacks the modified date used to invalidate cache.

Example: https://api.retheme.org/v1/domains/themed
```js
{
  "date": "2022-04-15T22:40:02.059Z",
  "modified": "2022-04-15T22:40:02.007Z",
  "domains": [
    468583553,
    368247796,
    ...
  ]
}
```

---

### GET `/v1/object/domain?domain={domain}` - raw domain object (Durable Object)

Example: https://api.retheme.org/v1/object/domain?domain=houstonchronicle.com
```js
{
  "domain": "houstonchronicle.com",
  "themes": [
    {
      "theme": ".fancybox-lock, \n.fancybox-lock body {\n  overflow: visible;\n}\n\n.fancybox-overlay,\n.bc_inline_sub,\n.adModule,\n.mm_related,\n.article--aside,\n.bc_nl_article_bottom_signup,\n.bottomZone,\n.topZone,\n.belowMastheadWrapper,\n.gallery,\n.bc_header,\n[data-component=\"ad\"],\nfooter {\n  display: none;\n}\n\nmain {\n  padding-bottom: 6em;\n}\n\nbody {\n  position: static;\n}\n\nmain#content {\n  display: flex;\n  flex-flow: row wrap;\n}\n\n.authorPage {\n  display: flex;\n}\n\narticle {\n  padding: 0;\n}",
      "date": "2022-03-18T17:51:13.982Z"
    }
  ],
  "requests": 0,
  "modified": "2022-03-18T17:51:13.982Z"
}
```

---

### GET `/v1/object/domain?domains` - index of all tracked domains (Durable Object)

Example: https://api.retheme.org/v1/object/domains
```js
{
  "domains": {
    "twitter.com": {
      "requests": 1,
      "themed": true,
      "modified": "2022-03-18T18:09:30.158Z"
    },
    "amazon.com": {
      "requests": 0,
      "themed": true,
      "modified": "2022-03-19T07:38:49.114Z"
    },
    ...
  },
  "modified": "2022-04-15T22:40:02.007Z"
}
```

--- 

### GET `/v1/weekly-users` - the count of weekly users (KV)
Returns the count of the list of weekly users from RETHEME.users (KV).  Currently this will cap out at 1000 without additional work (pagination).

Example: https://api.retheme.org/v1/weekly-users
```js
{
  "users": 3
}
```

---

### POST `/v1/theme/update` - create or update a theme
```js
// payload
{
  domain: 'houstonchronicle.com',
  theme: 'css text goes here'
}
```

--- 

### POST `/v1/theme/remove` - create or update a theme
```js
// payload
{
  domain: 'houstonchronicle.com',
}
```

---

### POST `/v1/theme/request` - increment request counter for a domain
```js
// payload
{
  domain: 'houstonchronicle.com',
}
```

---

# XState Visualizer
![image](https://user-images.githubusercontent.com/865416/163867777-3fb9acf1-dc19-4db2-9f17-357e5cc7a892.png)

```js
  const fetchMachine = Machine({
    id: 'fetch',
    initial: 'API Request',
    context: {
      retries: 0
    },
    states: {
      'API Request': {
        on: {
          READ: 'KV',
          WRITE: 'DurableObject',
        }
      },
      KV: {
        on: {
          RESPOND: 'API Request',
        }
      },
      DurableObject: {
        on: {
          WRITE: 'KV',
        }
      },
    }
  })
```
