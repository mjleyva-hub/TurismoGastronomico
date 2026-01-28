// ============================================================
//  MAIN.JS - FUNCIONES BÁSICAS: MENÚ, AÑO Y MAPA LEAFLET
// ============================================================

// ESPERA A QUE TODO EL CONTENIDO DEL DOCUMENTO (HTML) ESTÉ CARGADO
document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // ACTUALIZAR AUTOMÁTICAMENTE EL AÑO EN EL FOOTER
  // ============================================================

  const yearEl = document.getElementById('year');  // BUSCA EL ELEMENTO CON ID "year"
  if (yearEl)                                      // SI EXISTE ESE ELEMENTO...
    yearEl.textContent = new Date().getFullYear(); // LE ASIGNA EL AÑO ACTUAL (EJ. 2026)

  // ============================================================
  // MENÚ MÓVIL (MOSTRAR / OCULTAR)
  // ============================================================

  const btn = document.getElementById('btn-menu'); // BOTÓN DEL MENÚ (☰)
  const nav = document.getElementById('main-nav'); // NAVEGACIÓN PRINCIPAL

  // DETECTA CUANDO SE HACE CLIC EN EL BOTÓN DEL MENÚ
  btn?.addEventListener('click', function () {
    // OBTIENE SI EL MENÚ ESTÁ ABIERTO O CERRADO (TRUE / FALSE)
    const expanded = this.getAttribute('aria-expanded') === 'true';

    // CAMBIA EL ESTADO ARIA (ACCESIBILIDAD)
    this.setAttribute('aria-expanded', String(!expanded));

    // AGREGA O QUITA LA CLASE "open" AL MENÚ (PARA MOSTRAR / OCULTAR)
    nav.classList.toggle('open');
  });

  // ============================================================
  // MAPA INTERACTIVO CON LEAFLET (CENTRADO EN CIUDAD DE MÉXICO)
  // ============================================================

  // CREA EL MAPA EN EL ELEMENTO CON ID "map" Y LO CENTRA EN LAS COORDENADAS DE CDMX
  const map = L.map('map').setView([19.4326, -99.1332], 13);

  // AÑADE LOS MOSAICOS DE MAPA DESDE OPENSTREETMAP
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,                 // NIVEL MÁXIMO DE ACERCAMIENTO
    attribution: '© OpenStreetMap' // CRÉDITO OBLIGATORIO
  }).addTo(map);                 // AGREGA LA CAPA AL MAPA

  // VARIABLE PARA GUARDAR EL MARCADOR ACTUAL (PUNTO SELECCIONADO)
  let marker;

  // DETECTA CUANDO EL USUARIO HACE CLIC EN EL MAPA
  map.on('click', function(e) {
    // OBTIENE LATITUD Y LONGITUD DEL PUNTO CLICKEADO
    const lat = e.latlng.lat.toFixed(6);  // LATITUD CON 6 DECIMALES
    const lon = e.latlng.lng.toFixed(6);  // LONGITUD CON 6 DECIMALES

    // MUESTRA LAS COORDENADAS EN EL CAMPO DE TEXTO DEL FORMULARIO
    document.getElementById('loc-coords').value = `${lat}, ${lon}`;

    // SI YA EXISTE UN MARCADOR, LO ELIMINA
    if (marker) marker.remove();

    // CREA UN NUEVO MARCADOR EN LA UBICACIÓN CLICKEADA
    marker = L.marker([lat, lon]).addTo(map);
  });

  // ============================================================
  // FORMULARIO DE UBICACIÓN (AGREGAR LUGAR)
  // ============================================================

  const form = document.getElementById('location-form'); // FORMULARIO COMPLETO
  const msg = document.getElementById('loc-message');    // PÁRRAFO PARA MENSAJES

  // CUANDO EL USUARIO ENVÍA EL FORMULARIO
  form?.addEventListener('submit', function (e) {
    e.preventDefault(); // EVITA QUE LA PÁGINA SE RECARGUE

    // OBTIENE LOS DATOS DE LOS CAMPOS DEL FORMULARIO
    const name = document.getElementById('loc-name').value;      // NOMBRE DEL LUGAR
    const address = document.getElementById('loc-address').value;// DIRECCIÓN
    const coords = document.getElementById('loc-coords').value;  // COORDENADAS

    // MUESTRA UN MENSAJE CON LOS DATOS CAPTURADOS
    msg.textContent = `Ubicación agregada: ${name} - ${address} (${coords})`;

    // LIMPIA LOS CAMPOS DEL FORMULARIO TRAS ENVIAR
    form.reset();
  });

}); 
