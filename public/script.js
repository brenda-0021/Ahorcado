// Elementos del DOM
const wordDisplay = document.getElementById("word");
const remainingAttemptsEl = document.getElementById("attempts");
const alphabetButtons = document.querySelectorAll(".alphabet-btn");
const categorySelect = document.getElementById("category-select");
const timerEl = document.getElementById("timer");
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

// Palabras por categoría
const categories = {
  Frutas: [
    "MANZANA",
    "PLATANO",
    "KIWI",
    "NARANJA",
    "SANDIA",
    "FRESA",
    "MANGO",
    "PAPAYA",
    "CEREZA",
    "PIÑA",
    "DURAZNO",
    "MELON",
    "GUAYABA",
    "LIMON",
    "UVA",
    "HIGO",
    "GRANADA",
    "CIRUELA",
    "PERA",
    "MORAS",
  ],

  Animales: [
    "ELEFANTE",
    "JIRAFA",
    "CONEJO",
    "GATO",
    "PERRO",
    "TIGRE",
    "LEON",
    "CABALLO",
    "TIBURON",
    "DELFIN",
    "SERPIENTE",
    "RINOCERONTE",
    "ZORRO",
    "CANGURO",
    "AVESTRUZ",
    "PINGÜINO",
    "LORO",
    "OSO",
    "AGUILA",
    "KOALA",
  ],

  Colores: [
    "ROJO",
    "AZUL",
    "VERDE",
    "AMARILLO",
    "NEGRO",
    "BLANCO",
    "MORADO",
    "ROSADO",
    "NARANJA",
    "GRIS",
    "CAFE",
    "TURQUESA",
    "LILA",
    "AQUA",
    "VIOLETA",
    "MARRON",
    "CREMA",
    "BEIGE",
    "CYAN",
    "DORADO",
  ],

  Paises: [
    "MEXICO",
    "CANADA",
    "ARGENTINA",
    "BRASIL",
    "ESPAÑA",
    "ALEMANIA",
    "FRANCIA",
    "ITALIA",
    "CHINA",
    "JAPON",
    "COREA",
    "RUSIA",
    "INDIA",
    "EGIPTO",
    "AUSTRALIA",
    "CHILE",
    "PERU",
    "PORTUGAL",
    "SUECIA",
    "NIGERIA",
  ],

  Deportes: [
    "FUTBOL",
    "TENIS",
    "BASQUETBOL",
    "NATACION",
    "CICLISMO",
    "GOLF",
    "ATLETISMO",
    "BOXEO",
    "SURF",
    "VOLEIBOL",
    "BEISBOL",
    "HOCKEY",
    "RUGBY",
    "ESGRIMA",
    "ESCALADA",
    "ESQUI",
    "JUDO",
    "KARATE",
    "PATINAJE",
    "BALONMANO",
  ],

  Profesiones: [
    "MEDICO",
    "INGENIERO",
    "ARQUITECTO",
    "ABOGADO",
    "ENFERMERO",
    "MAESTRO",
    "POLICIA",
    "BOMBERO",
    "CHEF",
    "FOTOGRAFO",
    "MECANICO",
    "CARPINTERO",
    "ELECTRICISTA",
    "FISIOTERAPEUTA",
    "DENTISTA",
    "MUSICO",
    "ACTOR",
    "PINTOR",
    "DISEÑADOR",
    "CONTADOR",
  ],

  Ciudades: [
    "PARIS",
    "LONDRES",
    "TOKIO",
    "CIUDAD DE MEXICO",
    "NUEVA YORK",
    "BERLIN",
    "ROMA",
    "MOSCU",
    "SIDNEY",
    "DUBAI",
    "BUENOS AIRES",
    "LIMA",
    "MADRID",
    "TORONTO",
    "LOS ANGELES",
    "CHICAGO",
    "RIO DE JANEIRO",
    "BARCELONA",
    "SEUL",
    "PEKIN",
  ],

  Comida: [
    "HAMBURGUESA",
    "PIZZA",
    "SUSHI",
    "TACO",
    "PASTA",
    "ENSALADA",
    "SOPA",
    "BISTEC",
    "QUESADILLA",
    "EMPANADA",
    "CHURRO",
    "HELADO",
    "TORTA",
    "TAMAL",
    "FIDEOS",
    "PANQUEQUE",
    "GUISO",
    "SALSA",
    "AREPA",
    "CEVICHE",
  ],
};

// Variables del juego
let secretWord;
let guessedWord;
let remainingAttempts = 6;
let timer;
let timeRemaining = 120;

function drawHangman(attemptsLeft) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#ebebeb";

  // Dibujar la base
  ctx.beginPath();
  ctx.moveTo(50, 400); // Línea base
  ctx.lineTo(150, 400);
  ctx.stroke();

  // Dibujar el poste
  ctx.beginPath();
  ctx.moveTo(100, 400); // Poste
  ctx.lineTo(100, 50);
  ctx.stroke();

  // Dibujar el travesaño
  ctx.beginPath();
  ctx.moveTo(100, 50); // Traversa
  ctx.lineTo(200, 50);
  ctx.stroke();

  // Dibujar la cuerda
  ctx.beginPath();
  ctx.moveTo(200, 50); // Cuerda
  ctx.lineTo(200, 100);
  ctx.stroke();

  // Dibujar partes del cuerpo según intentos restantes
  if (attemptsLeft <= 5) {
    // Dibujar la cabeza
    ctx.beginPath();
    ctx.arc(200, 120, 20, 0, Math.PI * 2, true); // Cabeza
    ctx.stroke();
  }
  if (attemptsLeft <= 4) {
    // Dibujar el cuerpo
    ctx.beginPath();
    ctx.moveTo(200, 140); // Cuerpo
    ctx.lineTo(200, 250);
    ctx.stroke();
  }
  if (attemptsLeft <= 3) {
    // Dibujar brazo izquierdo
    ctx.beginPath();
    ctx.moveTo(200, 180);
    ctx.lineTo(150, 200); // Brazo izquierdo
    ctx.stroke();
  }
  if (attemptsLeft <= 2) {
    // Dibujar brazo derecho
    ctx.beginPath();
    ctx.moveTo(200, 180);
    ctx.lineTo(250, 200); // Brazo derecho
    ctx.stroke();
  }
  if (attemptsLeft <= 1) {
    // Dibujar pierna izquierda
    ctx.beginPath();
    ctx.moveTo(200, 250);
    ctx.lineTo(150, 300); // Pierna izquierda
    ctx.stroke();
  }
  if (attemptsLeft === 0) {
    // Dibujar pierna derecha
    ctx.beginPath();
    ctx.moveTo(200, 250);
    ctx.lineTo(250, 300); // Pierna derecha
    ctx.stroke();
  }
}

// Función para obtener una palabra aleatoria según la categoría
function getRandomWord(category) {
  const words = categories[category];
  return words[Math.floor(Math.random() * words.length)];
}

// Función para iniciar el temporizador
function startTimer() {
  timeRemaining = 120; // 2 minutos
  updateTimerDisplay();

  timer = setInterval(() => {
    timeRemaining--;

    if (timeRemaining <= 0) {
      clearInterval(timer); // Detener el temporizador
      alert("¡Se acabó el tiempo! Has perdido.");
      disableAllButtons();
    }

    updateTimerDisplay();
  }, 1000);
}

// Función para actualizar el temporizador en pantalla
function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerEl.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// Función para reiniciar el juego con una nueva palabra
function startNewGame(category) {
  secretWord = getRandomWord(category).toUpperCase();
  guessedWord = Array(secretWord.length).fill("_");
  remainingAttempts = 6;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawHangman(remainingAttempts);

  // Actualizar el display
  wordDisplay.textContent = guessedWord.join(" ");
  remainingAttemptsEl.textContent = remainingAttempts;

  alphabetButtons.forEach((button) => (button.disabled = false));

  clearInterval(timer);
  startTimer();
}

// Asignar evento de cambio de categoría
categorySelect.addEventListener("change", () => {
  const selectedCategory = categorySelect.value;
  startNewGame(selectedCategory);
});

// Inicializar el juego con la categoría por defecto
startNewGame(categorySelect.value);

// Evento click en cada letra
alphabetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const letter = button.textContent.toUpperCase();
    button.disabled = true;

    if (secretWord.includes(letter)) {
      for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === letter) {
          guessedWord[i] = letter;
        }
      }
      wordDisplay.textContent = guessedWord.join(" ");
    } else {
      remainingAttempts--;
      remainingAttemptsEl.textContent = remainingAttempts;
      drawHangman(remainingAttempts);
    }

    if (remainingAttempts === 0) {
      drawHangman(remainingAttempts);
      alert("¡Perdiste! La palabra era: " + secretWord);
    } else if (!guessedWord.includes("_")) {
      disableAllButtons(); // Desactivar botones antes de mostrar confeti
      showConfetti();

      // Esperar 1 segundo antes de mostrar la alerta
      setTimeout(() => {
        alert("¡Ganaste! La palabra era: " + secretWord);
      }, 1000);
    }
  });
});

// Desactivar todos los botones cuando el juego termina
function disableAllButtons() {
  alphabetButtons.forEach((button) => (button.disabled = true));
}

// Función para mostrar la animación de confeti
function showConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}
