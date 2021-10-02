export function loginComponent() {
  const element = document.createElement("div");
  element.innerHTML = 'login page';
  document.querySelector('.hello').onclick = () => {
    document.body.appendChild(element);
  }
}
