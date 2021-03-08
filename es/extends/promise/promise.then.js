class MyPromise {

  constructor(fn) {
    this.status = 'pending';
    this.value = undefined;
    this.callbacks = [];
    fn(this.resolve.bind(this),this.reject.bind(this))
  };

  handle(callback) {
    if(this.status === "pending") {
      this.callback.push(callback)
      return;
    }
    
    let cb = this.status === 'resolved' 
      ? callback.onFullfilled 
      : callback.onRejected;

    if(!cb) {
      //如果then中没有传递任何东西
      cb = this.status === 'resolved' 
        ? callback.resolve 
        : callback.rejected;

      cb && cb(this.value);
      return;
    }

    let ret;
    try {
      ret = cb(this.value);
      cb = this.state === 'resolved' ? callback.resolve : callback.rejected;
    }
    catch(e) {
      cb = callback.rejected;
    }
    finally {
      cb(ret);
    }
  }

  then(onFullfilled,onRejected) {
    return new MyPromise((resolve,reject)=>{
      this.handle({
        resolve,reject,
        fullFilled:onFullfilled,
        rejected:onRejected
      })
    })
  }

  catch(rejected) {
    return this.then(null,rejected);
  }

  // finally(onDone) {
  //   if (typeof onDone !== 'function') return this.then();
  //   let Promise = this.constructor;
  //   return this.then(
  //     value => Promise.resolve(onDone()).then(() => value),
  //     reason => Promise.resolve(onDone()).then(() => { throw reason })
  //   );
  // }

  resolve(value) {
    if(value && (typeof value === 'object' || typeof value === 'function')) {
      const then = value.then;
      if(typeof then === 'function') {
        then.call(value,this.resolve.bind(this),this.reject.bind(this));
        return;
      }
    }

    this.value = value;
    this.status = 'resolved';
    this.callbacks.forEach(callback => this.handle(callback))
  }

  reject(reason) {
    this.value = reason;
    this.status = 'rejected';
    this.callbacks.forEach(callback => this.handle(callback))
  }

  static Resolve(value) {
    if(value instanceof MyPromise) return value;
    //thenable
    else if(value && value.then && typeof value.then === 'function') {
      const then = value.then;
      return new Promise((resolve,rejected) => {
        then(resolve,rejected);
      })
    }
    else if(value) {
      return new MyPromise((resolve,rejected) => resolve(value));
    }
    else {
      return new MyPromise(resolve => resolve())
    }
  }

  static all(promises) {
    return new MyPromise((resolve, rejected) => {
      let fulfilledCount = 0;
      const itemNum = promises.length
      const rets = Array.from({ length: itemNum })
      promises.forEach((promise,index) => {
        MyPromise.Resolve(promise).then(result=> {
          fulfilledCount++;
          rets[index] = result;
          if(filfilledCount === itemNum) {
            resolve(rets);
          }
        },
        reason => rejected(reason))
      })
    })
  }
}
export default MyPromise;