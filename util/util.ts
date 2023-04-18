export const parseUint8Array = (data: string): Uint8Array => {
  const a = JSON.parse(data) as { [key: string]: number };
  const retVal = new Uint8Array(Object.keys(a).length);
  for(let i = 0; i < Object.keys(a).length; i++) {
    retVal[i] = a[i]!;
  }
  return retVal;
}

export const string2ArrayBuffer = (str: string) => {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return bufView;
}