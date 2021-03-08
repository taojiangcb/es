import PromiseBase from '../es/extends/promise/promise.base'

test('should test promise ', () => {
  const p = new PromiseBase(
    function(resolve,reject) {
      resolve(1);
    }
  )
  p.then(function(x) {
    expect(x).toBe(1);
  })
})
