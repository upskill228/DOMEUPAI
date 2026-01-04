// Referências aos elementos
const header = document.querySelector(".cabecalho");
const nav = document.querySelector(".navPrincipal");
const toggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".menu-link");
const sections = document.querySelectorAll("section[id]");

// HEADER

// header activo no scroll
window.addEventListener("scroll", () => {
  if (!nav.classList.contains("open")) {
    header.classList.toggle("active", window.scrollY > 200);
  }
});

// Menu mobile - Abrir e fechar
toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.classList.toggle("active", isOpen);
  toggle.setAttribute("aria-expanded", isOpen);

  document.body.style.overflow = isOpen ? "hidden" : "";

  if (isOpen) {
    menuLinks[0].focus();
  } else {
    toggle.focus();
  }
});

// Fechar menu mobile ao clicar num link
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

// Fechar com ESC
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    nav.classList.remove("open");
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    toggle.focus();
  }
});

// Nav menu-links.active - quando se faz scroll pelas secções, destaca o link da secção correspondente
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        menuLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  },
  {
    rootMargin: "-80px 0px -40% 0px",
    threshold: 0.2
  }
);

sections.forEach(section => observer.observe(section));

// MODAL DE INFORMAÇÕES
const btnAbrir = document.getElementById("botaoInfo");
const modal = document.getElementById("modalInfo");
const btnFechar = document.getElementById("closeInfo");

// Abrir modal
btnAbrir.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("show");
  document.getElementById("nome").focus();
});

// Fechar modal com botão
btnFechar.addEventListener("click", () => {
  modal.classList.remove("show");
  btnAbrir.focus();
});

// Fechar modal clicando fora do conteúdo
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    btnAbrir.focus();
  }
});

// Fechar modal com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) {
    modal.classList.remove("show");
    btnAbrir.focus();
  }
});

// Feedback a simular envio do formulário

function enviarForm(event) {
  event.preventDefault();
  alert("Obrigado pelo contacto! Em breve irá receber uma resposta.");
}

// FOOTER

// Ano Corrente
let currentYear = new Date().getFullYear();
document.getElementById("current-year").textContent = currentYear;