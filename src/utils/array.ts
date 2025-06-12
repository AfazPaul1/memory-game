export function secureShuffle<T>(arr:T[]):T[] {  
  const randomValues = new Uint32Array(arr.length)
  crypto.getRandomValues(randomValues)
  for (let i = arr.length-1; i > 0; i--) {
    const j = randomValues[i] % (i+1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr
}