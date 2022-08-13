Postgres login
```
psql -d cmdb -U jazhen
```
get bearer token
get last page of release history

for page in release history (from last page to page 1):
  call api: https://api.mangaupdates.com/v1/releases/days?page=PAGE&include_metadata=true

  for each release in reverse(response[results]):
    const record = release[record]
    record[title] = release[metadata][title]
    record[series_id] = release[series_id][title]

    insert record into database
