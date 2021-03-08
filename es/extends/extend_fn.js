

export function create(child,parent) {
  child.prototype = Object.create(parent.prototype,{
    construct:{
      configurable:false,
      writable:true,
      enumerable:false,
      value:child
    }
  })
}

/**
 * es5 实现原型链继承 两个要点，一个主意事项。
 * 1.继承的实现是修改原型链对象上的原型链,实现父子级关系。
 * 2.还需要修改prototype constructor 指向当前函数
 * 主意：防止父级 constructor 多次被执行，需要早中间用一个空函数进行隔档,不要直接new parent() 防止多次调用 
 */
export function es5Extends(child,parent) {
  // 新建一个空函数
  const F = function() {};
  //挂载父级原型链
  F.prototype = parent.prototype;
  //作为子级的父级原型。
  const prototype = new F();
  //将原型构造函数指回 child 自身。
  prototype.constructor = child;
  //挂载 子级 原型
  child.prototype = prototype;
}