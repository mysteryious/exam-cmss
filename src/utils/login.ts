export let setocaltion: (key:string,form:any) => void = (key,form) => {
  window.localStorage.setItem(key, JSON.stringify(form));
}

export let removeltion: (key:string) => void = (key) => {
  window.localStorage.removeItem(key);
}

export let getocaltion: (key:string) => any = (key) => {
 return window.localStorage.getItem(key);
}