import AWS from 'AWS'

function deserialize(item){
  let retval = {};
  for(let key of Object.keys(item)){
    var value = AWS.DynamoDB.Converter.output(item[key]);
    retval[key] = value;
  }
  return retval;
}

function serialize(item){
  let retval = {};
  for(let key of Object.keys(item)){
    var value = AWS.DynamoDB.Converter.input(item[key]);
    retval[key] = value;
  }
  return retval;
}

export class ProfileService {
  getProfile() {
    return new Promise((resolve, reject) => {

      var table = new AWS.DynamoDB({apiVersion: '2012-08-10', params: {TableName: 'cv_overkill_profile'}});

      return table.scan({}, function(err, data) {
          if (err) reject(err); // an error occurred
          else    {
            resolve(deserialize(data.Items[0]));
          }
      });
    });
  }
  saveProfile(profile) {
    return new Promise((resolve, reject) => {

      var table = new AWS.DynamoDB({apiVersion: '2012-08-10', params: {TableName: 'cv_overkill_profile'}});

      return table.putItem({Item: serialize(profile)}, function(err, data) {
          if (err) reject(err); // an error occurred
          else    {
            resolve();
          }
      });
    });
  }
}
