export function makeUUID(): number {
  let uuid = '';
  for (let i = 0; i < 10; i++) {
    uuid += Math.round(Math.random() * 9).toString();
    while (i === 0 && uuid === '0') { // first number should not be 0
      uuid = Math.round(Math.random() * 9).toString();
    }
  }
  return parseInt(uuid, 10);
}
