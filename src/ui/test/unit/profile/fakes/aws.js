class AWS {
    doSomething() {
      this.somethingDone = true;
    }
}

class DynamoDBFake {
  static retvals = {}
  scan(_,cb) {
    cb(null, DynamoDBFake.retvals.scan)
  }
}

let retval = new AWS();
retval.DynamoDB = DynamoDBFake
retval.DynamoDB.Converter = {
  intput: i => i,
  output: o => o
}

export default retval;
