/* jshint esnext:true */

function mkdir (dir) {
   try {
        fs.mkdirSync(dir);
    } catch (e) {
        // probably already exists
    }
}
var fs = require('fs');
var exec = require('child_process').exec;

console.log("Writing output files to out/");
// TODO: .print statements aren't visible anywhere
fs.createReadStream('in/sites.csv').pipe(require('csv-parse')({ columns: true}, function(err, sites) {
    var sql = `\
.mode csv
.print Loading counts
.import in/bike_hour.csv bike_hour
.print Loaded input data, now exporting.
.headers on
`;
    mkdir('out');
    //console.log(sites[1]);
    sites.forEach(site => {
        if (site.siteid) {
            mkdir(`out/site`);
            mkdir(`out/site/${site.siteid}`);
            var cols = 'siteid,date,pub_hol,sch_hol,hr,nobs,state';
            sql += 
`.output out/site/${site.siteid}/all.csv
select ${cols} from bike_hour where siteid="${site.siteid}";`;
            [2010,2011,2012,2013,2014,2015,2016,2017].forEach(year => {
                sql += `
.output out/site/${site.siteid}/${year}.csv
select ${cols} from bike_hour where date like "${year}%" and siteid="${site.siteid}";
`;
            });
        }
    });
    fs.writeFileSync('cmd.sql', sql);
    // todo print stdout stream  https://stackoverflow.com/questions/20643470/execute-a-command-line-binary-with-node-js
    exec('sqlite3 < cmd.sql');
}));
