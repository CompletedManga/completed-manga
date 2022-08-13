Postgres login
```
psql -d cmdb -U jazhen
```


## Flow
get bearer token

get last page of release history

for page in release history (from last page to page 1):
  call api: https://api.mangaupdates.com/v1/releases/days?page=PAGE&include_metadata=true

  for each release in reverse(response[results]):
    const record = release[record]
    record[title] = release[metadata][title]
    record[series_id] = release[series_id][title]

    insert record into database




## Get Bearer Token

Example Request
```http
PUT https://api.mangaupdates.com/v1/account/login

Body
{
  "username": "myusername",
  "password": "mypassword"
}
```

## Get Last Page Number of Release History

Example Request
```http
GET https://api.mangaupdates.com/v1/releases/days?page=99999&include_metadata=true

Auth
Bearer Token
```

https://api.mangaupdates.com/#operation/listReleasesByDay

Example Response
```json
{
  "total_hits": 7539,
  "page": 99999,
  "per_page": 3,
  "results": []
}
```

Usage

```js
const lastPageNumber = Math.ceil(total_hits / per_page);
```

## Get Releases On Page

Example Request
```http
GET https://api.mangaupdates.com/v1/releases/days?page=2489&include_metadata=true

Auth
Bearer Token
```

https://api.mangaupdates.com/#operation/listReleasesByDay

Example Response
```json
{
  "total_hits": 7539,
  "page": 2489,
  "per_page": 3,
  "results": [
    {
      "record": {
        "id": 22848,
        "title": "Dr. Slump",
        "volume": "2",
        "chapter": "19",
        "groups": [
          {
            "name": "Toriyama&#039;s World",
            "group_id": 51340375675
          }
        ],
        "release_date": "2001-07-24"
      },
      "metadata": {
        "series": {
          "series_id": 34763914967,
          "title": "Dr. Slump",
          "last_updated": {
            "timestamp": 1654883984,
            "as_rfc3339": "2022-06-10T17:59:44+00:00",
            "as_string": "June 10th, 2022 5:59pm GMT"
          },
          "admin": {
            "approved": true
          }
        },
        "user_list": {
          "list_type": null,
          "list_icon": null,
          "status": {
            "volume": null,
            "chapter": null
          }
        },
        "user_genre_highlights": [],
        "user_genre_filters": [],
        "user_group_filters": [],
        "type_filter": null
      }
    },
    {
      "record": {
        "id": 22850,
        "title": "Dr. Slump",
        "volume": "2",
        "chapter": "17-18",
        "groups": [
          {
            "name": "Toriyama&#039;s World",
            "group_id": 51340375675
          }
        ],
        "release_date": "2001-07-23"
      },
      "metadata": {
        "series": {
          "series_id": 34763914967,
          "title": "Dr. Slump",
          "last_updated": {
            "timestamp": 1654883984,
            "as_rfc3339": "2022-06-10T17:59:44+00:00",
            "as_string": "June 10th, 2022 5:59pm GMT"
          },
          "admin": {
            "approved": true
          }
        },
        "user_list": {
          "list_type": null,
          "list_icon": null,
          "status": {
            "volume": null,
            "chapter": null
          }
        },
        "user_genre_highlights": [],
        "user_genre_filters": [],
        "user_group_filters": [],
        "type_filter": null
      }
    },
    {
      "record": {
        "id": 341324,
        "title": "Et Cetera",
        "volume": "1",
        "chapter": "1",
        "groups": [
          {
            "name": "The Nameless Manga Translation Site",
            "group_id": 12127477955
          }
        ],
        "release_date": "2001-07-22"
      },
      "metadata": {
        "series": {
          "series_id": 58741851479,
          "title": "Et Cetera",
          "last_updated": {
            "timestamp": 1626818975,
            "as_rfc3339": "2021-07-20T22:09:35+00:00",
            "as_string": "July 20th, 2021 10:09pm GMT"
          },
          "admin": {
            "approved": true
          }
        },
        "user_list": {
          "list_type": null,
          "list_icon": null,
          "status": {
            "volume": null,
            "chapter": null
          }
        },
        "user_genre_highlights": [],
        "user_genre_filters": [],
        "user_group_filters": [],
        "type_filter": null
      }
    }
  ]
}
```

## Database Columns

- Record: store the entire json object
- id: when saving new records, stop when we find a duplicate id
