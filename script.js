function resolverSistema() {
  const a1 = parseFloat(document.getElementById('a1').value);
  const b1 = parseFloat(document.getElementById('b1').value);
  const c1 = parseFloat(document.getElementById('c1').value);
  const a2 = parseFloat(document.getElementById('a2').value);
  const b2 = parseFloat(document.getElementById('b2').value);
  const c2 = parseFloat(document.getElementById('c2').value);

  const det = a1 * b2 - a2 * b1;
  const resultado = document.getElementById('resultado');

  if (det === 0) {
    resultado.innerHTML = '<div class="alert alert-warning">O sistema não tem solução única.</div>';
    return;
  }

  const x = (c1 * b2 - c2 * b1) / det;
  const y = (a1 * c2 - a2 * c1) / det;

  resultado.innerHTML = `<div class="alert alert-success">Solução: x = ${x.toFixed(2)}, y = ${y.toFixed(2)}</div>`;
}

function gerarJogo() {
  const a1 = getRand(-5, 5);
  const b1 = getRand(-5, 5);
  const x = getRand(-5, 5);
  const y = getRand(-5, 5);
  const c1 = a1 * x + b1 * y;

  const a2 = getRand(-5, 5);
  const b2 = getRand(-5, 5);
  const c2 = a2 * x + b2 * y;

  document.getElementById("sistemaGerado").innerHTML = `
    ${a1}x + ${b1}y = ${c1}<br>
    ${a2}x + ${b2}y = ${c2}
  `;

  const correta = { x, y };
  const alternativas = [correta];

  while (alternativas.length < 4) {
    const altX = getRand(x - 3, x + 3);
    const altY = getRand(y - 3, y + 3);
    if (!alternativas.some(alt => alt.x === altX && alt.y === altY)) {
      alternativas.push({ x: altX, y: altY });
    }
  }

  alternativas.sort(() => Math.random() - 0.5);

  const altDiv = document.getElementById("alternativas");
  altDiv.innerHTML = "";
  const feedback = document.getElementById("feedback");
  feedback.innerHTML = "";

  alternativas.forEach(alt => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary m-1";
    btn.textContent = `x = ${alt.x}, y = ${alt.y}`;
    btn.onclick = () => {
      if (alt.x === x && alt.y === y) {
        feedback.innerHTML = `<div class="alert alert-success">🎉 Parabéns! Você acertou! Gerando novo sistema...</div>`;
        setTimeout(gerarJogo, 2000);
      } else {
        feedback.innerHTML = `
          <div class="alert alert-danger">
            ❌ Resposta incorreta.<br>
            ✅ Correta: x = ${x}, y = ${y}<br>
            Substituindo:<br>
            ${a1}×${x} + ${b1}×${y} = ${a1 * x + b1 * y} (✓ ${c1})<br>
            ${a2}×${x} + ${b2}×${y} = ${a2 * x + b2 * y} (✓ ${c2})
          </div>
          <div class="text-muted">Novo sistema em 5 segundos...</div>
        `;
        setTimeout(gerarJogo, 5000);
      }
    };
    altDiv.appendChild(btn);
  });
}

function getRand(min, max) {
  const n = Math.floor(Math.random() * (max - min + 1)) + min;
  return n === 0 ? getRand(min, max) : n;
}

document.addEventListener("DOMContentLoaded", gerarJogo);

let currentStep = 0;
function showNextStep() {
currentStep++;
const step = document.getElementById(`step${currentStep}`);
if (step) {
step.style.display = 'block';
} else {
alert("Todos os passos foram exibidos.");
}
}

let passoAtual = 0;
let exemploDados = {};

function gerarExemplo() {
// Gera valores aleatórios com solução inteira
const x = getRand(-5, 5);
const y = getRand(-5, 5);
const a1 = getRand(-5, 5);
const b1 = getRand(-5, 5);
const a2 = getRand(-5, 5);
const b2 = getRand(-5, 5);
const c1 = a1 * x + b1 * y;
const c2 = a2 * x + b2 * y;

exemploDados = { a1, b1, a2, b2, c1, c2, x, y };
passoAtual = 0;

const passos = [
`<strong>Sistema:</strong><br>${a1}x + ${b1}y = ${c1} &nbsp;&nbsp; (1)<br>${a2}x + ${b2}y = ${c2} &nbsp;&nbsp; (2)`,
`<strong>Passo 1:</strong> Isolar uma variável na equação (1):<br>${a1}x + ${b1}y = ${c1} → y = (${c1} - ${a1}x) / ${b1}`,
`<strong>Passo 2:</strong> Substituir y na equação (2) e resolver para x.`,
`<strong>Passo 3:</strong> Substituir x encontrado para descobrir y.`,
`✅ <strong>Solução:</strong> x = ${x}, y = ${y}<br>O ponto (${x}, ${y}) é a solução do sistema.`
];

const container = document.getElementById('passosContainer');
container.innerHTML = '';
passos.forEach((texto, i) => {
const div = document.createElement('div');
div.className = 'step';
div.id = `passo${i + 1}`;
div.innerHTML = texto;
container.appendChild(div);
});

// Reinicia controles
document.getElementById('btnProximoPasso').classList.remove('d-none');
document.getElementById('btnNovoExemplo').classList.add('d-none');
}

function mostrarProximoPasso() {
passoAtual++;
const passo = document.getElementById(`passo${passoAtual}`);
if (passo) {
passo.style.display = 'block';
}

if (!document.getElementById(`passo${passoAtual + 1}`)) {
document.getElementById('btnProximoPasso').classList.add('d-none');
document.getElementById('btnNovoExemplo').classList.remove('d-none');
}
}
