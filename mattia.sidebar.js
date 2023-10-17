let isNuovoF1Visible = false;

function mostraDiv() {
  let f1 = document.getElementById("f1");
  let f2 = document.getElementById("f2");
  let f3 = document.getElementById("f3");
  const nuovoF1 = document.getElementById("nuovoF1");
  const nuovoF2 = document.getElementById("nuovoF2");

  if (nuovoF2.classList.contains("d-none")) {
    nuovoF2.classList.remove("d-none");
  } else if (nuovoF1.classList.contains("d-none")) {
    nuovoF1.classList.remove("d-none");
  } else if (f3.classList.contains("d-none")) {
    f3.classList.remove("d-none");
  } else if (f2.classList.contains("d-none")) {
    f2.classList.remove("d-none");
  } else if (f1.classList.contains("d-none")) {
    f1.classList.remove("d-none");
  }
}

function togliDiv() {
  let f1 = document.getElementById("f1");
  let f2 = document.getElementById("f2");
  let f3 = document.getElementById("f3");
  let nuovoF2 = document.getElementById("nuovoF2");
  let nuovoF1 = document.getElementById("nuovoF1");

  if (!nuovoF2.classList.contains("d-none")) {
    nuovoF2.classList.add("d-none");
  } else if (!nuovoF1.classList.contains("d-none")) {
    nuovoF1.classList.add("d-none");
  } else if (!f3.classList.contains("d-none")) {
    f3.classList.add("d-none");
  } else if (!f2.classList.contains("d-none")) {
    f2.classList.add("d-none");
  } else if (!f1.classList.contains("d-none")) {
    f1.classList.add("d-none");
  }
}
