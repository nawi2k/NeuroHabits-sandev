let habitos = JSON.parse(localStorage.getItem('NEURO_HABITS_V17')) || [];
const DIAS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

let estadoGoggins = JSON.parse(localStorage.getItem('NEURO_GOGGINS_STATE')) || { nivel: 1, metaRequerida: 50 };
let historialDiario = JSON.parse(localStorage.getItem('NEURO_HISTORIAL_DIARIO') || '{}');

const AUDIO_FAIL_BITCH = new Audio('./assets/bitch.mp3'); 
const AUDIO_TICK_GOGGINS = new Audio('https://www.myinstants.com/media/sounds/bell-ring.mp3'); 

function obtenerIndiceDiaActual() {
  const ahora = new Date();
  let jsDay = ahora.getDay(); 
  const hora = ahora.getHours();
  
  if (hora < 4) {
    jsDay = jsDay === 0 ? 6 : jsDay - 1; 
  }
  return jsDay === 0 ? 6 : jsDay - 1; 
}

const LISTA_EXCUSAS_GOGGINS = [
  "«David Goggins corrió 160 kilómetros en 19 horas con las dos rótulas destrozadas y fallas en los riñones a los 33 años. ¿Y vos me decís que estás muy cansado para entrenar?»",
  "«¿Tenés frío, te duele la cabeza o estás cómodo en el sillón? A Goggins le amputaban la piel de los pies por ampollas y seguía corriendo. La edad y el dolor son solo excusas de tu mente.»",
  "«¿Decís que no tenés tiempo? Goggins trabajaba 12 horas matando cucarachas, hacía mil millas al mes en ultra maratones y estudiaba. El tiempo no se tiene, se roba.»",
  "«Tu cerebro te miente diciendo que no podés más. Cuando sentís que estás al 100%, apenas vas por el 40%. ¡Dejá de negociar con tu debilidad!»",
  "«¿La excusa de hoy es que hace calor, que llovía o que tuviste un mal día? A nadie le importa. El mundo sigue girando y tus metas no se van a cumplir solas.»",
  "«Si buscas comodidad, estás eligiendo la mediocridad. El crecimiento solo vive del otro lado del sufrimiento.»"
];

const LISTA_FILOSOFIA = [
  "«Aerodinámicamente, el cuerpo de una abeja no está hecho para volar; lo bueno es que la abeja no lo sabe.»",
  "«No te desesperes, antes tenías menos.»",
  "«Tienes poder sobre tu mente, no sobre lo que sucede a tu alrededor. Comprende esto y encontrarás la fortaleza.» — Marco Aurelio",
  "«¿Cómo no te desesperaste si no avanzabas? — Porque lo entrené.»",
  "«El éxito significa ir de fracaso en fracaso sin perder el entusiasmo.»",
  "«Nunca te sentirás listo, porque estar listo no es un sentimiento. Es una decisión.»",
  "«La mayoría de la gente te dirá que pares porque ellos no pueden seguir. No confíes en sus límites, confía en tu capacidad de sufrir. Al final del día es tu mente contra ti, nadie más cuenta.» — David Goggins",
  "«Tuve que inventar un tipo que ni siquiera existía.» — David Goggins",
  "«Tu mínimo es el máximo de alguien. Tu máximo es el mínimo de alguien.»",
  "«Recuerda que la vida te hace perder, para ver si de verdad quieres ganar.»",
  "«Toqué tantas veces fondo que, cada vez que bajo, ya sé que mañana subiré.» — Jorge Luis Borges",
  "«La comodidad mata los sueños.» — Nahuel Sandoval",
  "«En condiciones de paz, el hombre de guerra se ataca a sí mismo.» — Friedrich Nietzsche",
  "«Renunciar a los placeres temporales para construir algo grande no es perderse nada.»",
  "«Domina tu mente, sé el hombre más disciplinado que haya existido en mi entorno. Que nadie, ni mis impulsos ni mi pasado, decida por mí.» — Nahuel Sandoval",
  "«Si le pides a Dios ganar un maratón, te enviará un par de zapatos, no una medalla.»",
  "«Ese antojo no te hizo perder músculo o engordar, pero sí te recordó que aún no dominas tu mente.»",
  "«Cuando la cabeza dice que pares, estás en un 40% de tu verdadero potencial.» — David Goggins",
  "«¿Quién sos cuando nadie te está mirando?»",
  "«El día que el hombre supere sus deseos y adicciones, ese día el hombre se vuelve libre de verdad para lograr cosas increíbles y conocer su verdadero potencial.»",
  "«No pares, no te conformes y cada día aunque te sientas bien. Busca un punto para mejorar.» — Nahuel Sandoval",
  "«Si Dios puede quitarte algo que nunca imaginaste perder, también puede darte algo que nunca imaginaste tener.»"
];

const FRASES_GOGGINS_FAIL = [
  "¿En serio? ¿Sos una perra o querés cambiar?",
  "¡Puras excusas! Tu sistema límbico te está gobernando.",
  "Nadie viene a salvarte. ¡Levantate y hacé lo que tenés que hacer!",
  "¿Realmente querías mejorar o era mentira?",
  "Estás cómodo y por eso estás perdiendo. ¡Stay Hard!",
  "Deja de llorar y ponete a trabajar. ¡Media pila!",
  "El dolor es temporal. Tu mediocridad si sigues así será eterna."
];

const FRASES_GOGGINS_SUCCESS = [
  "Stay Hard! Te estás volviendo imparable.",
  "Estás construyendo callos en la mente. ¡Sigue empujando!",
  "Rompiendo tus propios límites. ¡Eso es mentalidad de 1%!",
  "No paren cuando estén cansados, paren cuando hayan TERMINADO.",
  "La única persona en el espejo puede frenarte. ¡Bien hecho!",
  "Dominio absoluto de la corteza prefrontal. ¡Imparable!"
];

const RANGOS_GOGGINS = [
  { nivel: 1, meta: 50, nombre: "NIVEL 1: ZONA DE CONFORT", desc: "Meta: 50%", img: "./assets/goggins_lvl1.png" },
  { nivel: 2, meta: 60, nombre: "NIVEL 2: ESTABLECIENDO BASES", desc: "Meta: 60%", img: "./assets/goggins_lvl2.png" },
  { nivel: 3, meta: 70, nombre: "NIVEL 3: CALLOUS YOUR MIND", desc: "Meta: 70%", img: "./assets/goggins_lvl3.png" },
  { nivel: 4, meta: 80, nombre: "NIVEL 4: EL 1% MÁS DURO", desc: "Meta: 80%", img: "./assets/goggins_lvl4.png" },
  { nivel: 5, meta: 90, nombre: "NIVEL MAX: STAY HARD!", desc: "Meta: 90%", img: "./assets/goggins_lvl5.png" }
];

function renderizarTabla() {
  const container = document.getElementById('tablaHabitosContainer');
  const diaHoyIdx = obtenerIndiceDiaActual();
  
  if (habitos.length === 0) {
    container.innerHTML = `
      <div class="empty-msg">
        <p>📋 No tenés hábitos registrados aún.</p>
        <p style="font-size:11px; margin-top:4px;">Hacé clic en <strong>"+ Nuevo Hábito"</strong> para empezar.</p>
      </div>
    `;
    actualizarMetricas();
    return;
  }

  let html = `
    <table>
      <thead>
        <tr>
          <th>Hábitos</th>
          ${DIAS.map((d, idx) => `<th style="text-align:center; ${idx === diaHoyIdx ? 'color:var(--accent-cyan); text-shadow:0 0 8px var(--shadow-neon);' : ''}">${d}</th>`).join('')}
          <th style="text-align:center;">%</th>
          <th style="text-align:center;">🗑️</th>
        </tr>
      </thead>
      <tbody>
  `;

  habitos.forEach((h, hIdx) => {
    const com = h.checks.filter(c => c === 'YES').length;
    const pct = Math.round((com / 7) * 100);

    html += `
      <tr>
        <td title="${h.nombre}"><strong>${h.nombre}</strong></td>
        ${h.checks.map((chk, dIdx) => {
          let claseCss = 'cell-checkbox';
          let textoSim = '';
          let attrClick = '';

          if (dIdx > diaHoyIdx) {
            claseCss += ' locked';
            textoSim = '🔒';
          } else {
            if (chk === 'YES') { claseCss += ' checked-yes'; textoSim = '✔'; }
            else if (chk === 'NO') { claseCss += ' checked-no'; textoSim = '✖'; }
            
            attrClick = `data-h="${hIdx}" data-d="${dIdx}"`;
          }

          return `
            <td style="text-align:center;">
              <div class="${claseCss}" ${attrClick} title="Clic izq: Cumplido (✔) | Clic der: Fallado (✖)">${textoSim}</div>
            </td>
          `;
        }).join('')}
        <td style="text-align:center; font-weight:bold; color:var(--accent-cyan);">${pct}%</td>
        <td style="text-align:center;">
          <button style="background:none; border:none; color:var(--accent-red); cursor:pointer;" onclick="eliminarHabito(${hIdx})">✕</button>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
  actualizarMetricas();
}

function manejarClickHabito(hIdx, dIdx, tipoClick) {
  const diaHoyIdx = obtenerIndiceDiaActual();
  if (!habitos[hIdx] || dIdx > diaHoyIdx) return;

  const actual = habitos[hIdx].checks[dIdx];
  let nuevo;
  if (tipoClick === 'LEFT') {
    nuevo = (actual === 'YES') ? null : 'YES';
  } else {
    nuevo = (actual === 'NO') ? null : 'NO';
  }
  habitos[hIdx].checks[dIdx] = nuevo;
  localStorage.setItem('NEURO_HABITS_V17', JSON.stringify(habitos));

  // 1) Primero se redibuja la tabla, así la ✔ / ✖ aparece siempre al instante
  try { renderizarTabla(); } catch (e) { console.error('Error al redibujar:', e); }

  // 2) Después los efectos (animación, sonido, frase). Si alguno falla, la tabla ya quedó actualizada
  try {
    if (nuevo === 'YES') {
      dispararAnimacionCerebro('PREFRONTAL');
      try { AUDIO_TICK_GOGGINS.currentTime = 0; AUDIO_TICK_GOGGINS.play().catch(() => {}); } catch (e) {}

      const fraseExito = FRASES_GOGGINS_SUCCESS[Math.floor(Math.random() * FRASES_GOGGINS_SUCCESS.length)];
      const elFrase = document.getElementById('frasePrefrontal');
      elFrase.innerText = `"${fraseExito}"`;
      elFrase.classList.remove('trigger-glow-blue');
      void elFrase.offsetWidth;
      elFrase.classList.add('trigger-glow-blue');
    } else if (nuevo === 'NO') {
      dispararAnimacionCerebro('LIMBICO');
      try { AUDIO_FAIL_BITCH.currentTime = 0; AUDIO_FAIL_BITCH.play().catch(() => {}); } catch (e) {}

      const fraseFallo = FRASES_GOGGINS_FAIL[Math.floor(Math.random() * FRASES_GOGGINS_FAIL.length)];
      const elFrase = document.getElementById('fraseLimbico');
      elFrase.innerText = `"${fraseFallo}"`;
      elFrase.classList.remove('trigger-glow-red');
      void elFrase.offsetWidth;
      elFrase.classList.add('trigger-glow-red');
    }
  } catch (e) {
    console.error('Error en los efectos:', e);
  }
}

// Un solo "escuchador" para toda la tabla: no se pierde cuando la tabla se redibuja
const contenedorTabla = document.getElementById('tablaHabitosContainer');
contenedorTabla.addEventListener('mousedown', (e) => {
  const celda = e.target.closest('.cell-checkbox[data-h]');
  if (!celda) return;
  e.preventDefault();
  const h = Number(celda.dataset.h);
  const d = Number(celda.dataset.d);
  if (e.button === 0) manejarClickHabito(h, d, 'LEFT');
  else if (e.button === 2) manejarClickHabito(h, d, 'RIGHT');
});
contenedorTabla.addEventListener('contextmenu', (e) => e.preventDefault());

function dispararAnimacionCerebro(tipo) {
  const imgPrefrontal = document.getElementById('imgBrainPrefrontal');
  const imgLimbico = document.getElementById('imgBrainLimbico');

  imgPrefrontal.classList.remove('flash-prefrontal');
  imgLimbico.classList.remove('flash-limbico');
  void imgPrefrontal.offsetWidth;

  if (tipo === 'PREFRONTAL') {
    imgPrefrontal.classList.add('flash-prefrontal');
  } else {
    imgLimbico.classList.add('flash-limbico');
  }
}

function actualizarMetricas() {
  let totalChecksPosibles = habitos.length * 7;
  let totalChecksHechos = 0;
  let totalFallos = 0;

  habitos.forEach(h => {
    totalChecksHechos += h.checks.filter(c => c === 'YES').length;
    totalFallos += h.checks.filter(c => c === 'NO').length;
  });

  let pctTotal = totalChecksPosibles > 0 ? Math.round((totalChecksHechos / totalChecksPosibles) * 100) : 0;
  let pctLimbico = totalChecksPosibles > 0 ? Math.round((totalFallos / totalChecksPosibles) * 100) : 0;

  document.getElementById('progressPercent').innerText = `${pctTotal}%`;
  document.getElementById('progressBarFill').style.width = `${pctTotal}%`;
  document.getElementById('valPrefrontal').innerText = `${pctTotal}%`;
  document.getElementById('valLimbico').innerText = `${pctLimbico}%`;

  calcularRachaYMostrar();
  
  if (!document.getElementById('textoExcusaDiaria').dataset.loaded) {
    siguienteExcusa();
    siguienteFraseFilosofia();
    document.getElementById('textoExcusaDiaria').dataset.loaded = "true";
  }

  const imgPrefrontal = document.getElementById('imgBrainPrefrontal');
  const imgLimbico = document.getElementById('imgBrainLimbico');
  const opacityPrefrontal = (pctTotal / 100).toFixed(2);
  const opacityLimbico = (pctLimbico / 100).toFixed(2);

  imgPrefrontal.style.setProperty('--target-opacity', opacityPrefrontal);
  imgLimbico.style.setProperty('--target-opacity', opacityLimbico);

  if (!imgPrefrontal.classList.contains('flash-prefrontal')) imgPrefrontal.style.opacity = opacityPrefrontal;
  if (!imgLimbico.classList.contains('flash-limbico')) imgLimbico.style.opacity = opacityLimbico;

  const rangoActual = RANGOS_GOGGINS.find(r => r.nivel === estadoGoggins.nivel) || RANGOS_GOGGINS[0];
  
  document.getElementById('mentorImg').src = rangoActual.img;
  document.getElementById('mentorName').innerText = `${rangoActual.nombre} (${rangoActual.desc})`;

  renderizarSidebarRangos();
  guardarDiaActual();
  renderizarHeatmapMini();
  actualizarGraficoMini(pctTotal, pctLimbico);
}

function toggleTemaVisual() {
  const htmlTag = document.documentElement;
  const temaActual = htmlTag.getAttribute('data-theme');
  const nuevoTema = temaActual === 'inferno' ? 'cyberpunk' : 'inferno';
  htmlTag.setAttribute('data-theme', nuevoTema);
  localStorage.setItem('NEURO_THEME', nuevoTema);
  try { renderizarTabla(); } catch (e) {}
}

const temaGuardado = localStorage.getItem('NEURO_THEME');
if (temaGuardado) {
  document.documentElement.setAttribute('data-theme', temaGuardado);
}

function siguienteExcusa() {
  const idx = Math.floor(Math.random() * LISTA_EXCUSAS_GOGGINS.length);
  document.getElementById('textoExcusaDiaria').innerText = LISTA_EXCUSAS_GOGGINS[idx];
}

function siguienteFraseFilosofia() {
  const idx = Math.floor(Math.random() * LISTA_FILOSOFIA.length);
  document.getElementById('textoFilosofiaDiaria').innerText = LISTA_FILOSOFIA[idx];
}

function renderizarSidebarRangos() {
  const container = document.getElementById('sidebarRangosListaContainer');
  container.innerHTML = '';
  RANGOS_GOGGINS.forEach(r => {
    const activo = r.nivel === estadoGoggins.nivel;
    container.innerHTML += `
      <div class="sidebar-badge-item ${activo ? 'active-badge' : ''}">
        <img src="${r.img}" alt="Rango">
        <div>
          <strong style="color: ${activo ? 'var(--accent-cyan)' : '#fff'};">${r.nombre}</strong>
          <p style="color: #94a3b8; font-size: 10px;">${r.desc}</p>
        </div>
      </div>
    `;
  });
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebarMenu');
  sidebar.classList.toggle('active');
}

function calcularRachaYMostrar() {
  const diaHoyIdx = obtenerIndiceDiaActual();
  let racha = 0;

  if (habitos.length === 0) {
    document.getElementById('streakCount').innerText = `0 días`;
    return;
  }

  for (let d = diaHoyIdx; d >= 0; d--) {
    let diaPerfecto = true;
    habitos.forEach(h => {
      if (h.checks[d] !== 'YES') diaPerfecto = false;
    });
    if (diaPerfecto && habitos.length > 0) {
      racha++;
    } else {
      break;
    }
  }

  document.getElementById('streakCount').innerText = `${racha} ${racha === 1 ? 'día' : 'días'}`;
}

// ---------- HISTORIAL DIARIO (se guarda para siempre en NEURO_HISTORIAL_DIARIO) ----------
function obtenerFechaActual() {
  const f = new Date();
  if (f.getHours() < 4) f.setDate(f.getDate() - 1);
  return f;
}

function calcularDia(idxDia, lista) {
  const total = lista.length;
  let hechos = 0, fallos = 0;
  lista.forEach(h => {
    if (h.checks[idxDia] === 'YES') hechos++;
    if (h.checks[idxDia] === 'NO') fallos++;
  });
  return {
    hechos: hechos,
    fallos: fallos,
    total: total,
    pre: total > 0 ? Math.round((hechos / total) * 100) : 0,
    lim: total > 0 ? Math.round((fallos / total) * 100) : 0
  };
}

function guardarHistorialDiario() {
  localStorage.setItem('NEURO_HISTORIAL_DIARIO', JSON.stringify(historialDiario));
}

function guardarDiaActual() {
  if (habitos.length === 0) return;
  historialDiario[claveFecha(obtenerFechaActual())] = calcularDia(obtenerIndiceDiaActual(), habitos);
  guardarHistorialDiario();
}

// Al cerrar una semana, completa los días que no tengan registro con lo que quedó en la planilla
function volcarSemanaAlHistorial(claveLunes, lista) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(claveLunes || '');
  if (!m || lista.length === 0) return;
  const lunes = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  for (let i = 0; i < 7; i++) {
    const f = new Date(lunes);
    f.setDate(lunes.getDate() + i);
    const clave = claveFecha(f);
    const dia = calcularDia(i, lista);
    if (historialDiario[clave] || dia.hechos + dia.fallos === 0) continue;
    historialDiario[clave] = dia;
  }
  guardarHistorialDiario();
}

// Promedio de los últimos "dias" días que terminan en "fin". Solo cuentan días con alguna marca.
function promedioVentana(fin, dias) {
  let suma = 0, cant = 0;
  for (let i = 0; i < dias; i++) {
    const f = new Date(fin);
    f.setDate(f.getDate() - i);
    const reg = historialDiario[claveFecha(f)];
    if (reg && reg.hechos + reg.fallos > 0) { suma += reg.pre; cant++; }
  }
  return cant > 0 ? Math.round(suma / cant) : null;
}

function renderizarHeatmapMini() {
  const grid = document.getElementById('heatmapGridMini');
  grid.innerHTML = '';

  const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const hoy = obtenerFechaActual();
  const claveHoy = claveFecha(hoy);
  const anio = hoy.getFullYear();
  const mes = hoy.getMonth();
  const diasMes = new Date(anio, mes + 1, 0).getDate();
  const offset = (new Date(anio, mes, 1).getDay() + 6) % 7; // columna del día 1 (lunes = 0)

  const etiqueta = document.getElementById('mesActualLabel');
  if (etiqueta) etiqueta.innerText = `${MESES[mes]} ${anio}`;

  ['L', 'M', 'X', 'J', 'V', 'S', 'D'].forEach(letra => {
    const cab = document.createElement('div');
    cab.className = 'heatmap-weekday';
    cab.innerText = letra;
    grid.appendChild(cab);
  });

  let sumaMes = 0, cantMes = 0;

  for (let d = 1; d <= diasMes; d++) {
    const clave = claveFecha(new Date(anio, mes, d));
    const reg = historialDiario[clave];
    const esHoy = clave === claveHoy;
    const conMarcas = reg && (reg.hechos + reg.fallos) > 0;

    const box = document.createElement('div');
    let clase = 'block-day-mini';
    let textoDiaExtra = '';

    if (d === 1 && offset > 0) box.style.gridColumnStart = String(offset + 1);

    if (reg && (conMarcas || esHoy)) {
      textoDiaExtra = `<span>${reg.pre}%</span>`;
      box.title = `Corteza prefrontal ${reg.pre}% · Sistema límbico ${reg.lim}%`;
    }
    if (conMarcas) {
      clase += reg.pre >= 50 ? ' cumplido' : ' fallado';
      sumaMes += reg.pre;
      cantMes++;
    }
    if (esHoy) clase += ' hoy';

    box.className = clase;
    box.innerHTML = `${d}${textoDiaExtra}`;
    grid.appendChild(box);
  }

  const resumen = document.getElementById('resumenMes');
  if (resumen) {
    let html = cantMes > 0
      ? `Promedio del mes: <strong>${Math.round(sumaMes / cantMes)}%</strong>`
      : 'Todavía no hay días registrados este mes.';

    const prom7 = promedioVentana(hoy, 7);
    if (prom7 !== null) {
      html += `<br>Últimos 7 días: <strong>${prom7}%</strong>`;
      const finAnterior = new Date(hoy);
      finAnterior.setDate(finAnterior.getDate() - 7);
      const prom7Ant = promedioVentana(finAnterior, 7);
      if (prom7Ant !== null) {
        const dif = prom7 - prom7Ant;
        if (dif > 0) html += ` · <span style="color: var(--accent-cyan);">▲ +${dif} pts</span> vs. los 7 anteriores`;
        else if (dif < 0) html += ` · <span style="color: var(--accent-red);">▼ ${dif} pts</span> vs. los 7 anteriores`;
        else html += ' · igual que los 7 anteriores';
      }
    }
    resumen.innerHTML = html;
  }
}

function agregarNuevoHabito() {
  document.getElementById('inputNombreHabito').value = '';
  document.getElementById('modalNuevoHabito').style.display = 'flex';
  setTimeout(() => {
    document.getElementById('inputNombreHabito').focus();
  }, 100);
}

function cerrarModalHabito() {
  document.getElementById('modalNuevoHabito').style.display = 'none';
}

function guardarNuevoHabito() {
  const input = document.getElementById('inputNombreHabito');
  let nombre = input.value.trim();

  if (nombre !== '') {
    if (nombre.length > 30) {
      nombre = nombre.substring(0, 30) + '...';
    }
    habitos.push({
      id: Date.now(),
      nombre: nombre,
      checks: [null, null, null, null, null, null, null]
    });
    localStorage.setItem('NEURO_HABITS_V17', JSON.stringify(habitos));
    renderizarTabla();
    cerrarModalHabito();
  }
}

function eliminarHabito(idx) {
  const nombreHabito = habitos[idx].nombre;
  if (confirm(`¿Estás seguro que querés borrar "${nombreHabito}"?`)) {
    habitos.splice(idx, 1);
    localStorage.setItem('NEURO_HABITS_V17', JSON.stringify(habitos));
    renderizarTabla();
  }
}

// ---------- SEMANA (lunes a domingo) Y RANGOS ----------
function claveFecha(f) {
  return `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, '0')}-${String(f.getDate()).padStart(2, '0')}`;
}

// Devuelve el lunes de la semana actual. Mismo criterio que obtenerIndiceDiaActual:
// antes de las 4 AM todavía cuenta como el día anterior.
function obtenerLunesActual() {
  const f = new Date();
  if (f.getHours() < 4) f.setDate(f.getDate() - 1);
  f.setDate(f.getDate() - ((f.getDay() + 6) % 7));
  return f;
}

function formatearSemana(clave) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(clave || '');
  return m ? `${m[3]}/${m[2]}` : `#${clave}`;
}

function calcularPorcentajeSemana(lista) {
  const total = lista.length * 7;
  if (total === 0) return 0;
  const hechos = lista.reduce((acc, h) => acc + h.checks.filter(c => c === 'YES').length, 0);
  return Math.round((hechos / total) * 100);
}

function evaluarSubidaDeNivel(pct) {
  const maxNivel = RANGOS_GOGGINS[RANGOS_GOGGINS.length - 1].nivel;
  const rangoAnterior = RANGOS_GOGGINS.find(r => r.nivel === estadoGoggins.nivel) || RANGOS_GOGGINS[0];
  let subio = false;

  if (pct >= rangoAnterior.meta && rangoAnterior.nivel < maxNivel) {
    estadoGoggins.nivel = rangoAnterior.nivel + 1;
    subio = true;
  }

  const rangoNuevo = RANGOS_GOGGINS.find(r => r.nivel === estadoGoggins.nivel) || rangoAnterior;
  estadoGoggins.metaRequerida = rangoNuevo.meta;
  localStorage.setItem('NEURO_GOGGINS_STATE', JSON.stringify(estadoGoggins));

  return { subio, rangoAnterior, rangoNuevo };
}

function verificarReseteoSemanal() {
  const lunesActual = obtenerLunesActual();
  const semanaActual = claveFecha(lunesActual);
  let semanaGuardada = localStorage.getItem('NEURO_LAST_WEEK_RESET');

  // Migración: la versión vieja guardaba "semana del mes" (1 a 5).
  // Se toma como si los datos fueran de la semana pasada, así se cierra esa semana una vez.
  if (semanaGuardada && !/^\d{4}-\d{2}-\d{2}$/.test(semanaGuardada)) {
    const anterior = new Date(lunesActual);
    anterior.setDate(anterior.getDate() - 7);
    semanaGuardada = claveFecha(anterior);
  }

  if (semanaGuardada && semanaGuardada !== semanaActual) {
    const pct = calcularPorcentajeSemana(habitos);
    const resultado = habitos.length > 0 ? evaluarSubidaDeNivel(pct) : null;

    volcarSemanaAlHistorial(semanaGuardada, habitos);

    // Solo se guarda como "semana pasada" si hubo alguna marca (así una planilla vacía no pisa datos reales)
    const huboActividad = habitos.some(h => h.checks.some(c => c !== null));
    if (huboActividad) {
      localStorage.setItem('NEURO_SEMANA_ANTERIOR', JSON.stringify({
        semana: semanaGuardada,
        pct: pct,
        subioNivel: resultado ? resultado.subio : false,
        habitosSnapshot: JSON.parse(JSON.stringify(habitos))
      }));
    }

    habitos.forEach(h => {
      h.checks = [null, null, null, null, null, null, null];
    });
    localStorage.setItem('NEURO_HABITS_V17', JSON.stringify(habitos));

    let mensaje = `🔄 ¡Nueva semana! Cerraste la semana del ${formatearSemana(semanaGuardada)} con ${pct}% de dominio prefrontal.\n\n`;
    if (!resultado) {
      mensaje += 'No tenías hábitos cargados, así que no hubo cambio de rango.';
    } else if (resultado.subio) {
      mensaje += `🏆 ¡SUBISTE DE RANGO!\n${resultado.rangoAnterior.nombre} ➔ ${resultado.rangoNuevo.nombre}\nNueva meta: ${resultado.rangoNuevo.meta}%`;
    } else if (pct >= resultado.rangoAnterior.meta) {
      mensaje += 'Ya estás en el rango máximo. ¡Stay Hard!';
    } else {
      mensaje += `No llegaste a la meta de ${resultado.rangoAnterior.meta}%, así que seguís en ${resultado.rangoAnterior.nombre}. ¡Esta semana se puede!`;
    }
    alert(mensaje);
  }

  localStorage.setItem('NEURO_LAST_WEEK_RESET', semanaActual);
}

function verHistorialSemanaAnterior() {
  const rawData = localStorage.getItem('NEURO_SEMANA_ANTERIOR');
  const contenedor = document.getElementById('contenidoSemanaPasada');
  const datos = rawData ? JSON.parse(rawData) : null;
  const hayDatos = datos && Array.isArray(datos.habitosSnapshot) &&
    datos.habitosSnapshot.some(h => h.checks.some(c => c !== null));

  if (!hayDatos) {
    contenedor.innerHTML = `<p style="text-align: center; color: #64748b;">Todavía no hay registros de semanas anteriores.</p>`;
  } else {
    const pctSemana = (typeof datos.pct === 'number') ? datos.pct : calcularPorcentajeSemana(datos.habitosSnapshot);
    let html = `<p style="margin-bottom: 8px; color: var(--accent-cyan);"><strong>Semana del ${formatearSemana(datos.semana)}</strong> — Dominio prefrontal: <strong>${pctSemana}%</strong>${datos.subioNivel ? ' 🏆 (subiste de rango)' : ''}</p><ul>`;
    datos.habitosSnapshot.forEach(h => {
      const hechos = h.checks.filter(c => c === 'YES').length;
      html += `<li style="margin-bottom: 4px;">${h.nombre}: <strong>${hechos}/7 días cumplidos</strong></li>`;
    });
    html += `</ul>`;
    contenedor.innerHTML = html;
  }
  document.getElementById('modalSemanaPasada').style.display = 'flex';
}

function cerrarModalSemanaPasada() {
  document.getElementById('modalSemanaPasada').style.display = 'none';
}

function abrirModalExplicacion() { document.getElementById('modalExplicacion').style.display = 'flex'; }
function cerrarModalExplicacion() { document.getElementById('modalExplicacion').style.display = 'none'; }

let chartMiniInst = null;
function actualizarGraficoMini(pctPre, pctLim) {
  if (typeof Chart === 'undefined') return; // sin internet no carga Chart.js; que no rompa el resto
  const ctx = document.getElementById('chartMesHabitos').getContext('2d');
  const estilos = getComputedStyle(document.documentElement);
  const colorPre = estilos.getPropertyValue('--accent-cyan').trim() || '#00e5ff';
  const colorLim = estilos.getPropertyValue('--accent-red').trim() || '#ff1744';
  if (chartMiniInst) chartMiniInst.destroy();
  chartMiniInst = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Prefrontal', 'Límbico'],
      datasets: [{ data: [pctPre, Math.max(0, 100 - pctPre)], backgroundColor: [colorPre, colorLim], borderWidth: 0 }]
    },
    options: {
      plugins: { 
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    }
  });
}


verificarReseteoSemanal();
renderizarTabla();

// Si la app queda abierta y pasa la medianoche (4 AM), actualiza sola
let ultimoDiaRenderizado = claveFecha(obtenerFechaActual());
setInterval(() => {
  const semanaCambio = claveFecha(obtenerLunesActual()) !== localStorage.getItem('NEURO_LAST_WEEK_RESET');
  const diaCambio = claveFecha(obtenerFechaActual()) !== ultimoDiaRenderizado;
  if (semanaCambio) verificarReseteoSemanal();
  if (semanaCambio || diaCambio) {
    ultimoDiaRenderizado = claveFecha(obtenerFechaActual());
    renderizarTabla();
  }
}, 60000);