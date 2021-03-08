const trans = function(objs,dist) {
  dist = dist || {};
  for({key,value} of objs) {
    dist[key] = value
  };
  return dist;
}

const data = [{
  key:'name',
  value: '123'
},{
  key:'age',
  value: '456'
},{
  key:'from',
  value: 'bytedance'
}];

//example 1
const a = trans(data)
// example 2
const b = {};
trans(data,b);

data.reduce((p,{key,value})=>({...p,[key]:value}),{})

