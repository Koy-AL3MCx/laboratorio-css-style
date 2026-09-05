function actualizarCSS() {
    const tipoElemento = document.getElementById("tipoElemento").value;
    const textoPersonalizado = document.getElementById("textoPersonalizado").value;
    const colorFondo = document.getElementById("colorFondo").value;
    const fuente = document.getElementById("tipoFuente").value;
    const colorTitulo = document.getElementById("colorTitulo").value;
    const colorSubtitulo = document.getElementById("colorSubtitulo").value;
    
    const padding = document.getElementById("rangePadding").value;
    const margin = document.getElementById("rangeMargin").value;
    const radio = document.getElementById("rangeRadio").value;
    const estiloBorde = document.getElementById("estiloBorde").value;
    const grosorBorde = document.getElementById("rangeGrosorBorde").value;
    const colorBorde = document.getElementById("colorBorde").value;

    const display = document.getElementById("selectDisplay").value;
    const justify = document.getElementById("selectJustify").value;
    const align = document.getElementById("selectAlign").value;

    const sombraVal = document.getElementById("rangeSombra").value;
    const opacidad = document.getElementById("rangeOpacidad").value;
    const blur = document.getElementById("rangeBlur").value;
    const escala = document.getElementById("rangeEscala").value;
    const rotacion = document.getElementById("rangeRotacion").value;

    document.getElementById("valPadding").innerText = padding;
    document.getElementById("valMargin").innerText = margin;
    document.getElementById("valRadio").innerText = radio;
    document.getElementById("valGrosorBorde").innerText = grosorBorde;
    document.getElementById("valSombra").innerText = sombraVal;
    document.getElementById("valOpacidad").innerText = opacidad;
    document.getElementById("valBlur").innerText = blur;
    document.getElementById("valEscala").innerText = escala;
    document.getElementById("valRotacion").innerText = rotacion;

    const elemento = document.getElementById("elementoDinamico");

    renderizarContenidoElemento(tipoElemento, elemento, textoPersonalizado, colorTitulo, colorSubtitulo, fuente);

    elemento.style.backgroundColor = colorFondo;
    elemento.style.fontFamily = fuente;
    elemento.style.padding = padding + "px";
    elemento.style.margin = margin + "px";
    elemento.style.borderRadius = radio + "px";
    elemento.style.border = `${grosorBorde}px ${estiloBorde} ${colorBorde}`;
    elemento.style.display = display;
    
    if (display === "flex") {
        elemento.style.justifyContent = justify;
        elemento.style.alignItems = align;
    } else {
        elemento.style.justifyContent = "";
        elemento.style.alignItems = "";
    }

    elemento.style.boxShadow = `0px ${sombraVal}px ${sombraVal * 2}px rgba(0, 0, 0, 0.2)`;
    elemento.style.opacity = opacidad;
    elemento.style.filter = `blur(${blur}px)`;
    elemento.style.transform = `scale(${escala}) rotate(${rotacion}deg)`;

    let flexCSS = display === "flex" ? `\n    justify-content: ${justify};\n    align-items: ${align};` : "";
    let borderCSS = estiloBorde !== "none" ? `\n    border: ${grosorBorde}px ${estiloBorde} ${colorBorde};` : "\n    border: none;";

    const codigoFormateado = `.elemento-dinamico {
    background-color: ${colorFondo};
    font-family: ${fuente};
    padding: ${padding}px;
    margin: ${margin}px;
    border-radius: ${radio}px;${borderCSS}
    display: ${display};${flexCSS}
    box-shadow: 0px ${sombraVal}px ${sombraVal * 2}px rgba(0, 0, 0, 0.2);
    opacity: ${opacidad};
    filter: blur(${blur}px);
    transform: scale(${escala}) rotate(${rotacion}deg);
}`;

    document.getElementById("bloqueCodigo").textContent = codigoFormateado;
}

function renderizarContenidoElemento(tipo, contenedor, texto, colorT, colorS, fuente) {
    if (tipo === "caja") {
        contenedor.innerHTML = `<h3 id="tituloCaja" style="color: ${colorT}; font-family: ${fuente};">Caja de Prueba</h3><p id="parrafoCaja" style="color: ${colorS}; font-family: ${fuente};">${texto}</p>`;
    } else if (tipo === "boton") {
        contenedor.innerHTML = `<button style="background: transparent; border: none; color: ${colorT}; font-family: ${fuente}; font-weight: bold; cursor: pointer; font-size: 1rem;">${texto}</button>`;
    } else if (tipo === "card") {
        contenedor.innerHTML = `<div style="text-align: left;"><h4 style="color: ${colorT}; font-family: ${fuente}; margin-bottom: 4px;">Card Title</h4><p style="color: ${colorS}; font-family: ${fuente}; font-size: 0.85rem;">${texto}</p></div>`;
    } else if (tipo === "input") {
        contenedor.innerHTML = `<input type="text" value="${texto}" style="padding: 6px; border-radius: 4px; border: 1px solid #ccc; color: ${colorT}; font-family: ${fuente}; width: 100%;" disabled>`;
    } else if (tipo === "imagen") {
        contenedor.innerHTML = `<div style="background: #e2e8f0; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; margin-bottom: 5px;">🖼️</div><span style="color: ${colorS}; font-family: ${fuente}; font-size: 0.8rem;">${texto}</span>`;
    }
}

function alternarFlexOptions() {
    const display = document.getElementById("selectDisplay").value;
    const flexOpts = document.getElementById("flexOptionsContainer");
    flexOpts.style.display = display === "flex" ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Configurar evento de Modo Oscuro
    const btnTema = document.getElementById("btnTema");
    btnTema.addEventListener("click", () => {
        const cuerpo = document.body;
        if (cuerpo.getAttribute("data-tema") === "oscuro") {
            cuerpo.setAttribute("data-tema", "claro");
            btnTema.textContent = "🌙 Modo Oscuro";
        } else {
            cuerpo.setAttribute("data-tema", "oscuro");
            btnTema.textContent = "☀️ Modo Claro";
        }
    });

    // 2. Configurar botón de copiar
    const btnCopiar = document.getElementById("btnCopiar");
    btnCopiar.addEventListener("click", () => {
        const codigo = document.getElementById("bloqueCodigo").textContent;
        navigator.clipboard.writeText(codigo).then(() => {
            btnCopiar.textContent = "¡Copiado! ✅";
            setTimeout(() => {
                btnCopiar.textContent = "📋 Copiar CSS";
            }, 2000);
        });
    });

    // 3. Configurar botón de reiniciar
    const btnReset = document.getElementById("btnReset");
    btnReset.addEventListener("click", () => {
        document.getElementById("tipoElemento").value = "caja";
        document.getElementById("textoPersonalizado").value = "Este texto cambia de estilo.";
        document.getElementById("colorFondo").value = "#ffffff";
        document.getElementById("tipoFuente").value = "Arial, sans-serif";
        document.getElementById("colorTitulo").value = "#333333";
        document.getElementById("colorSubtitulo").value = "#666666";
        document.getElementById("rangePadding").value = 15;
        document.getElementById("rangeMargin").value = 10;
        document.getElementById("rangeRadio").value = 8;
        document.getElementById("estiloBorde").value = "solid";
        document.getElementById("rangeGrosorBorde").value = 2;
        document.getElementById("colorBorde").value = "#dddddd";
        document.getElementById("selectDisplay").value = "flex";
        document.getElementById("selectJustify").value = "center";
        document.getElementById("selectAlign").value = "center";
        document.getElementById("rangeSombra").value = 8;
        document.getElementById("rangeOpacidad").value = 1;
        document.getElementById("rangeBlur").value = 0;
        document.getElementById("rangeEscala").value = 1;
        document.getElementById("rangeRotacion").value = 0;
        
        alternarFlexOptions();
        actualizarCSS();
    });

    // 4. Conectar todos los inputs y selects de controles automáticamente al evento actualizarCSS
    const inputsYSelects = document.querySelectorAll(".controles input, .controles select");
    inputsYSelects.forEach(elementoControl => {
        elementoControl.addEventListener("input", () => {
            if (elementoControl.id === "selectDisplay") {
                alternarFlexOptions();
            }
            actualizarCSS();
        });
        elementoControl.addEventListener("change", () => {
            if (elementoControl.id === "selectDisplay") {
                alternarFlexOptions();
            }
            actualizarCSS();
        });
    });

    // Inicializar valores al cargar la página
    alternarFlexOptions();
    actualizarCSS();
});