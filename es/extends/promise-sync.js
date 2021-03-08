

export default function myPromise(constructor) {
  let self = this;
  // A+ 规范
  self.status = 'pending';        // pending 挂起, fulfilled(resolved), rejected
  self.value = undefined;         // promise 成功的值
  self.reason = undefined;        // promise 失败的值

  self.onFullfilledArray = [];
  self.onRejectedArray = [];

  function resolve(value) {
    if(self.status === 'pending') {
      self.value = value;
      self.status = 'resolved'
      self.onFullfilledArray.forEach(function(f){
        f(self.value);
        //如果状态从pending变为resolved，
        //那么就遍历执行里面的异步方法
      })
    }
  }

  function reject(reason) {
    if(self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected';
      self.onRejectedArray.forEach(function(f) {
        f(self.reason);
      })
    }
  }

  try {
    constructor(resolve,reject);
  }
  catch(e) {
   reject(e); 
  }

  console.log('__proto__',self.__proto__);
  self.then = function (onFullfilled,onRejected) {
    switch(self.status) {
      case "pending":
        self.onFullfilledArray.push(function(value) {
          onFullfilled(value);
        });
        self.onRejectedArray.push(function(reason) {
          onRejected(reason);
        })
        break;
      case "resovled":
        onFullfilled(self.value);
        break;
      case "rejected":
        onRejected(self.reason);
        break;
    }
  }
}
