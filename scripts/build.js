var utterances = require("../src/utterances");
var fs = require('fs'),
    archiver = require('archiver');

try {
  fs.mkdirSync(__dirname + '/../dist');
} catch (err) { }

try {
  fs.mkdirSync(__dirname + '/../dist/speechAssets');
} catch (err) { }

console.log("Generating dist/speechAssets/IntentSchema.json");
fs.writeFileSync(__dirname + "/../dist/speechAssets/IntentSchema.json", JSON.stringify(utterances.intentSchema, null, 2));

console.log("Generating dist/speechAssets/SampleUtterances.txt");
fs.writeFileSync(__dirname + "/../dist/speechAssets/SampleUtterances.txt", utterances.sampleUtterances.join("\n"));

console.log("Generating dist/lambda.zip");
var output = fs.createWriteStream(__dirname + '/../dist/lambda.zip');
var archive = archiver('zip');

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('Done.');
});


archive.on('error', function(err) {
    throw err;
});

archive.pipe(output);

archive.file(__dirname + '/../out/index.js', { name: 'index.js' });
archive.file(__dirname + '/../out/package.json', { name: 'package.json' });

archive.finalize();
