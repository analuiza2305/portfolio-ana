// ===== CONTROLE DE TEMA (CLARO/ESCURO) =====
const themeBtn = document.getElementById("themeBtn");
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Define o ícone do botão baseado no tema (sem emojis)
  if (theme === "light") {
    themeBtn.innerHTML = '<i data-lucide="moon"></i>';
  } else {
    themeBtn.innerHTML = '<i data-lucide="sun"></i>';
  }
  
  // Renderiza os ícones do Lucide novamente
  lucide.createIcons();
}

// Inicialização do tema
const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  setTheme(currentTheme === "light" ? "dark" : "light");
});


// ===== FUNCIONALIDADES GERAIS =====

// Ano atual no footer
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Menu Mobile
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isVisible = mobileMenu.style.display === "block";
    mobileMenu.style.display = isVisible ? "none" : "block";
  });

  // Fechar menu ao clicar em qualquer link
  document.querySelectorAll("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.style.display = "none";
    });
  });
}


// ===== CARROSSEL DE PROJETOS =====

const projects = [
  {
    type: "TCC - Etec Heliópolis",
    title: "Elo Materno",
    description: "O Elomaterno é um projeto desenvolvido como Trabalho de Conclusão de Curso (TCC) , com o objetivo de criar uma rede de apoio digital para mães solo , promovendo acolhimento, informação, orientação e conexão.",
    stack: ["HTML", "CSS", "JavaScript","Node.js", "Firebase","PWA"],
    link: "https://elo-materno.netlify.app/",
    github: "https://github.com/analuiza2305/Elomaterno"
  },
  {
    type: "Track Mach - CNIT 2025",
    title: "Track Mach - IoT em Problemas Portuários",
    description: "O Track Mach é um projeto de IoT para portos, criado para o CNIT 2025, com foco em monitorar e otimizar processos, reduzindo custos e aumentando a eficiência logística.",
    stack: ["HTML", "CSS", "JS", "Firebase"],
    link: "https://imaginative-kelpie-344992.netlify.app/",
    github: "https://github.com/analuiza2305/Track-mach"
  },
  {
    type: "L.A.R - Venturus 2025",
    title: "L.A.R - Lugar de Acolhimento e Recomeços",
    description: "O LAR (Lugar de Acolhimento e Recomeço) é um projeto da ETEC Heliópolis que cria um espaço de apoio para imigrantes recém-chegados ao Brasil, oferecendo suporte para as necessidades do dia a dia",
    stack: ["TypeScript", "UI"],
    link: "https://hackateen-tawny.vercel.app/",
    github: "https://github.com/analuiza2305/L.A.R---Projeto-Hackteen"
  },  
   {
    type: "Alfa Play",
    title: "Alfa Play - Edutainment gerador de histórias com IA para crianças de 3 a 7 anos",
    description: "O Alfa Play é uma plataforma de edutainment infantil, criada nas aulas de PW3, com um gerador de histórias por IA e controle para responsáveis.",
    stack: ["JavaScript", "PWA", "API - gemini", "Express.js"],
    link: "https://aalfaplay.netlify.app/",
    github: "https://github.com/analuiza2305/AlfaPlay"
  },
    {
    type: "Site da empresa TCC",
    title: "Manity Techonology",
    description: "Este projeto foi feito, pois no TCC, tínhamos que criar uma empresa de tecnologia ( Manity ), e depois associar o projeto (EloMaterno) à essa empresa, desenvolvemos esse site pensando em conseguir lidar melhor com as tecnologias de Front-end",
    stack: ["JavaScript", "Acessibilidade", "Internacionalização"],
    link: " https://manity-technology.netlify.app/",
    github: "https://github.com/analuiza2305/Manity_Tecnology"
  }
];

let current = 0;
const projectCard = document.getElementById("projectCard");
const dots = document.getElementById("dots");

function renderProject() {
  if (!projectCard) return;

  const p = projects[current];

  projectCard.innerHTML = `
    <span class="tag">${p.type}</span>
    <h3>${p.title}</h3>
    <p>${p.description}</p>

    <div class="stack">
      ${p.stack.map(item => `<span>${item}</span>`).join("")}
    </div>

    <div class="project-actions">
      <a class="btn primary" href="${p.link}" target="_blank">Abrir Projeto</a>
      <a class="btn ghost" href="${p.github}" target="_blank">GitHub</a>
    </div>
  `;

  renderDots();
  // Garante que novos elementos injetados (se houver ícones neles) sejam processados
  lucide.createIcons();
}

function renderDots() {
  if (!dots) return;
  
  dots.innerHTML = projects.map((_, i) => {
    return `<span class="dot ${i === current ? "active" : ""}" data-index="${i}"></span>`;
  }).join("");

  document.querySelectorAll(".dot").forEach(dot => {
    dot.addEventListener("click", (e) => {
      current = Number(e.target.dataset.index);
      renderProject();
    });
  });
}

// Botões de Navegação do Carrossel
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    current = (current + 1) % projects.length;
    renderProject();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    current = (current - 1 + projects.length) % projects.length;
    renderProject();
  });
}


// ===== FORMULÁRIO DE CONTATO =====

const form = document.getElementById("contactForm");
const sentMsg = document.getElementById("sentMsg");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simulação de envio
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    setTimeout(() => {
      sentMsg.style.display = "block";
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      form.reset();

      setTimeout(() => {
        sentMsg.style.display = "none";
      }, 3000);
    }, 1500);
  });
}

// Inicialização Geral
document.addEventListener("DOMContentLoaded", () => {
  renderProject();
  lucide.createIcons();
});