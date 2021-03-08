class MyPromise {
  constructor(fn) {
    this.status = 'pending';
    
    this.value = undefined;
    this.reason = undefined;

    this.resolveFullfilledArray = [];
    this.rejectArray = [];
    fn(this.resolve.bind(this),this.reject.bind(this))
  };

  then(onFullfilled,onRejected) {
    if(this.status === "pending") {
      this.resolveFullfilledArray.push(onFullfilled);
      this.rejectArray.push(onRejected);
    }
    else if(this.status === 'resolved') {
      onFullfilled(this.value);
    }
    else {
      this.onRjected(this.reason)
    }
    return this;
  }

  resolve(value) {
    this.value = value;
    this.status = 'resolved';
    this.resolveFullfilledArray.forEach(fn => fn(this.value))
  }

  reject(reason) {
    this.reason = reason;
    this.status = 'rejected';
    this.rejectArray.forEach(fn => fn(this.reason))
  }
}

export default MyPromise;