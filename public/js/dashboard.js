function changeBG() {
  const body = document.getElementsByTagName("body")[0];
  const color = document.querySelectorAll(".text-dark");
  if (body.className == "bg-light") {
    body.removeAttribute("class");
    body.setAttribute("class", "bg-dark");
    color.forEach((cl) => {
      cl.classList.toggle("text-dark");
      cl.setAttribute("class", "text-light");
    });
  } else if (body.className == "bg-dark") {
    body.removeAttribute("class");
    body.setAttribute("class", "bg-light");
    color.forEach((cl) => {
      cl.classList.toggle("text-light");
      cl.setAttribute("class", "text-dark");
    });
  }
}
