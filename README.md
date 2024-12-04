
# API Files

Steps to run the project with npm

```bash
  npm install
  npm run start
```
Steps to run the project with docker

```bash
  docker compose up -d --build
```


## API reference

#### Get files

```http
  GET /api/files/data
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fileName` | `string` | **Not required**. |

#### Get files External API

```http
  GET /api/files/list
```

