export default function humanize(str){
    return str
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[_\s]+/g, ' ')
    .replace(/[a-z][A-Z]/g, function(m){
        let x = m.split("");
      return x[0]+' '+x[1];
    })
    .replace(/^[a-z]/, function(m) { return m.toUpperCase(); });
}