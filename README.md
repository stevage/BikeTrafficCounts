## Bike traffic count data

This repo contains scripts to split up a large spreadsheet of bike traffic data provided by Cameron Munroe (https://cdmresearch.shinyapps.io/bike_counts/), and the resulting outputs.

### Usage

First, install sqlite3.

1. `npm install`
2. `node .``

### Output

Each file contains hourly traffic counts, linked to the `in/sites.csv` file.

```
out/site/SITEID/YEAR.csv
out/site/SITEID/all.csv
```