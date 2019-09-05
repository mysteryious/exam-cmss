
const key="account";

export let setocaltion: (form:object) => void = (form) => {
  window.localStorage.setItem(key, JSON.stringify(form));
}

export let removeltion: () => void = () => {
  window.localStorage.removeItem(key);
}

export let getocaltion: () => any = () => {
 return window.localStorage.getItem(key);
}