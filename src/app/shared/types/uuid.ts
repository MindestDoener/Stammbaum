export function makeUUID(): number {
    let uuid = '';
    for (let i = 0; i < 10; i++) {
        uuid += Math.round(Math.random() * 9).toString();
    }
    return parseInt(uuid, 10);
}
