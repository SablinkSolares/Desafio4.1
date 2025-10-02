// Datos del problema
const A = [
  [0.52, 0.20, 0.25],  // Arena
  [0.30, 0.50, 0.20],  // Grano fino
  [0.18, 0.30, 0.55]   // Grano grueso
];

const b = [4800, 5810, 5690];

// Función para resolver sistema lineal (Gauss-Jordan)
function solveSystem(A, b) {
  let n = b.length;
  let M = A.map((row, i) => [...row, b[i]]);

  for (let i = 0; i < n; i++) {
    // Normalizar fila
    let factor = M[i][i];
    for (let j = 0; j <= n; j++) M[i][j] /= factor;

    // Eliminar otras filas
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        let factor2 = M[k][i];
        for (let j = 0; j <= n; j++) {
          M[k][j] -= factor2 * M[i][j];
        }
      }
    }
  }
  return M.map(row => row[n]);
}

// Dibujar gráfico 3D con Plotly
function dibujarGrafico(sol) {
  const trace = {
    x: [sol[0]],
    y: [sol[1]],
    z: [sol[2]],
    mode: "markers+text",
    type: "scatter3d",
    marker: { size: 8, color: "#0d6efd" }, // Color consistente con Bootstrap
    text: ["Solución"],
    textposition: "top center"
  };

  const layout = {
    title: {
      text: "Solución 3D (m³ de cada cantera)",
      font: { size: 18 }
    },
    scene: {
      xaxis: { title: "Cantera 1 (x₁)" },
      yaxis: { title: "Cantera 2 (x₂)" },
      zaxis: { title: "Cantera 3 (x₃)" }
    },
    margin: { l: 0, r: 0, t: 50, b: 0 }
  };

  Plotly.newPlot("grafico3D", [trace], layout);
}

// Evento al presionar "Resolver"
document.getElementById("resolverBtn").addEventListener("click", () => {
  document.getElementById("resultado").innerHTML = '<p class="text-muted"><i class="bi bi-hourglass-split me-2"></i>Calculando...</p>';
  
  setTimeout(() => {
    const sol = solveSystem(A, b);
    let html = `
      <h5 class="text-success"><i class="bi bi-check-circle-fill me-2"></i>Solución encontrada:</h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><b>Cantera 1:</b> ${sol[0].toFixed(2)} m³</li>
        <li class="list-group-item"><b>Cantera 2:</b> ${sol[1].toFixed(2)} m³</li>
        <li class="list-group-item"><b>Cantera 3:</b> ${sol[2].toFixed(2)} m³</li>
      </ul>
    `;
    document.getElementById("resultado").innerHTML = html;
    dibujarGrafico(sol);
  }, 500); // Simula un pequeño retraso para la carga
});