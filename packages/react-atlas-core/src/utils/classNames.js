export default function classNames(...options) {
  let cn = [];
  options.forEach(opt => {
    if(opt) {
      if(typeof opt === 'string') { 
        cn.push(opt); 
      }
      if(typeof opt === 'object') { 
        let keys = Object.keys(opt).filter(key => !!opt[key]);
        cn.push(...keys);
      }
    }
  });
  return cn;
};