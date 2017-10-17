function(inFilePath) checkAndConvert {
  const csvFilePath = inFilePath
  const csv = require('csvtojson')
  csv()
    .fromFile(csvFilePath)
    .on('json', (jsonObj) => {
      // combine csv header row and csv line to a json object
      // jsonObj.a ==> 1 or 4
      console.log(JSON.Stringify(jsonObj));
    })
    .on('done', (error) => {
      console.log('end')
    })
}

funtion() aloha{
  alert("aloha");
}
