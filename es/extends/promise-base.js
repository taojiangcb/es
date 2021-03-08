

export default function myPromise(constructor) {
  let self = this;
  // A+ 规范
  self.status = 'pending';        // pending 挂起, fulfilled(resolved), rejected
  self.value = undefined;         // promise 成功的值
  self.reason = undefined;        // promise 失败的值

  function resolve(value) {
    if(self.status === 'pending') {
      self.value = value;
      self.status = 'resolved'
    }
  }
  
  function reject(reason) {
    if(self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected';
    }
  }

  try {
    constructor(resolve,reject);
  }
  catch(e) {
   reject(e); 
  }

  console.log('__proto__',self.__proto__);
  self.then = function (onFuliflled,onRejected) {
    switch(self.status) {
      case "resovled":
        onFuliflled(self.value);
        break;
      case "rejected":
        onRejected(self.reason);
        break;
    }
  }
}
