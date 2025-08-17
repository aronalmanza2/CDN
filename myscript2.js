// getTextUserBML
function getTextUserBML() {
  // === Notificación simple en la parte superior (centrada) ===
  function showToast(message, type = "info", duration = 5000) {
    const toast = document.getElementById("toast-notification");
    if (toast) toast.remove(); // Elimina notificación previa

    const el = document.createElement("div");
    el.id = "toast-notification";
    el.textContent = message;
    Object.assign(el.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background:
        type === "error"
          ? "#dc3545"
          : type === "success"
          ? "#28a745"
          : "#007bff",
      color: "white",
      padding: "10px 20px",
      borderRadius: "6px",
      fontSize: "14px",
      zIndex: "999999",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      maxWidth: "90%",
      textAlign: "center",
    });
    document.body.appendChild(el);

    // Eliminar después de 'duration'
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.3s";
      setTimeout(() => el.remove(), 300);
    }, duration);
  }

  // === Extracción de datos ===
  const container = document.getElementById("ibo-center-container");
  if (!container) {
    console.error("❌ No se encontró #ibo-center-container");
    showToast("Error: Persona no encontrada", "error", 6000);
    return;
  }

  // === Definición local de $x() ===
  const $x = (query, ctx = container) => {
    try {
      const res = document.evaluate(
        query,
        ctx,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );
      const nodes = [];
      for (let i = 0; i < res.snapshotLength; i++) {
        nodes.push(res.snapshotItem(i));
      }
      return nodes;
    } catch (e) {
      console.warn("XPath falló:", query);
      return [];
    }
  };

  // Función auxiliar para extraer texto limpio
  const getText = (xpath) => {
    const el = $x(xpath)[0];
    return el ? el.textContent.trim().replace(/\s+/g, " ") : "No disponible";
  };

  // Extrae atributo seguro
  const getAttr = (xpath, attr) => {
    const el = $x(xpath)[0];
    return el
      ? el.getAttribute(attr)?.trim() || "No disponible"
      : "No disponible";
  };

  // === Extracción de datos ===
  const id_persona = getAttr(
    ".//div[contains(@id, 'ibo-object-details')]",
    "data-object-id"
  );
  const name = getText(
    ".//div[@data-attribute-code='name']//div[@class='ibo-field--value']"
  );
  const first_name = getText(
    ".//div[@data-attribute-code='first_name']//div[@class='ibo-field--value']"
  );
  const fullName = `${first_name} ${name}`.trim();

  const location = getText(
    ".//div[@data-attribute-code='location_id']//a[contains(@class, 'object-ref-link')]"
  );
  const function_emp = getText(
    ".//div[@data-attribute-code='function']//div[@class='ibo-field--value']"
  );
  const manager_id = getText(
    ".//div[@data-attribute-code='manager_id']//a[contains(@class, 'object-ref-link')]"
  );
  const employee_number = getText(
    ".//div[@data-attribute-code='employee_number']//div[@class='ibo-field--value']"
  );
  const email = getText(
    ".//div[@data-attribute-code='email']//a[contains(@class, 'mailto')]"
  );
  const phone = getText(
    ".//div[@data-attribute-code='phone']//a[contains(@class, 'tel')]"
  );
  const mobile_phone = getText(
    ".//div[@data-attribute-code='mobile_phone']//a[contains(@class, 'tel')]"
  );

  const url_persona_mod = `https://mesadeservicioti.mef.gob.pe/web/pages/UI.php?operation=details&class=Person&id=${id_persona}`;

  // === Formato del mensaje final ===
  const txt_final = `
--------------------------------------------------
> URL PERSONA: ${url_persona_mod}

${fullName}
> Localidad: ${location}
> Funcion: ${function_emp}
> Jefe: ${manager_id}
> Nro Empleado: ${employee_number}
> Correo: ${email}
> Telefono: ${phone}
> Movil: ${mobile_phone}
--------------------------------------------------

`;

  // === Copiar al portapapeles con feedback ===
  const temp = document.createElement("textarea");
  temp.value = txt_final;
  document.body.appendChild(temp);
  temp.select();

  try {
    document.execCommand("copy");
    console.log("✅ Copiado al portapapeles:", fullName);
    showToast(`✅ Copiado: ${fullName}`, "success", 4000);
  } catch (err) {
    console.error("❌ Error al copiar:", err);
    showToast("❌ Error al copiar", "error", 5000);
  } finally {
    document.body.removeChild(temp);
  }
}

// Ejecutar la función
getTextUserBML();

// Mimificado BookMarkLet
javascript: (function () {
  function s(m, t = "info", d = 5000) {
    const n = document.getElementById("toast-notification");
    n && n.remove();
    const e = document.createElement("div");
    (e.id = "toast-notification"), (e.textContent = m);
    Object.assign(e.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background:
        t === "error" ? "#dc3545" : t === "success" ? "#28a745" : "#007bff",
      color: "white",
      padding: "10px 20px",
      borderRadius: "6px",
      fontSize: "14px",
      zIndex: 999999,
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      maxWidth: "90%",
      textAlign: "center",
    });
    document.body.appendChild(e);
    setTimeout(() => {
      (e.style.opacity = 0), (e.style.transition = "opacity 0.3s");
      setTimeout(() => e.remove(), 300);
    }, d);
  }
  const c = document.getElementById("ibo-center-container");
  if (!c)
    return (
      console.error("❌ No se encontró #ibo-center-container"),
      s("Error: Persona no encontrada", "error", 6000),
      void 0
    );
  const x = (q, o = c) => {
      try {
        const r = document.evaluate(
          q,
          o,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        );
        let n = [];
        for (let i = 0; i < r.snapshotLength; i++) n.push(r.snapshotItem(i));
        return n;
      } catch (e) {
        return console.warn("XPath falló:", q), [];
      }
    },
    g = (q) => {
      const e = x(q)[0];
      return e ? e.textContent.trim().replace(/\\s+/g, " ") : "No disponible";
    },
    a = (q, p) => {
      const e = x(q)[0];
      return e ? e.getAttribute(p)?.trim() || "No disponible" : "No disponible";
    },
    i = a(".//div[contains(@id,'ibo-object-details')]", "data-object-id"),
    f = g(
      ".//div[@data-attribute-code='first_name']//div[@class='ibo-field--value']"
    ),
    l = g(
      ".//div[@data-attribute-code='name']//div[@class='ibo-field--value']"
    ),
    N = `${f} ${l}`.trim(),
    L = g(
      ".//div[@data-attribute-code='location_id']//a[contains(@class,'object-ref-link')]"
    ),
    F = g(
      ".//div[@data-attribute-code='function']//div[@class='ibo-field--value']"
    ),
    M = g(
      ".//div[@data-attribute-code='manager_id']//a[contains(@class,'object-ref-link')]"
    ),
    E = g(
      ".//div[@data-attribute-code='employee_number']//div[@class='ibo-field--value']"
    ),
    em = g(
      ".//div[@data-attribute-code='email']//a[contains(@class,'mailto')]"
    ),
    P = g(".//div[@data-attribute-code='phone']//a[contains(@class,'tel')]"),
    Mo = g(
      ".//div[@data-attribute-code='mobile_phone']//a[contains(@class,'tel')]"
    ),
    u = `https://mesadeservicioti.mef.gob.pe/web/pages/UI.php?operation=details&class=Person&id=${i}`,
    o = `\n--------------------------------------------------\n> URL PERSONA: ${u}\n\n${N}\n> Localidad: ${L}\n> Funcion: ${F}\n> Jefe: ${M}\n> Nro Empleado: ${E}\n> Correo: ${em}\n> Telefono: ${P}\n> Movil: ${Mo}\n--------------------------------------------------\n`;
  const t = document.createElement("textarea");
  (t.value = o), document.body.appendChild(t), t.select();
  try {
    document.execCommand("copy"),
      console.log("✅ Copiado:", N),
      s(`✅ Copiado: ${N}`, "success", 4000);
  } catch (e) {
    console.error("❌ Error al copiar:", e),
      s("❌ Error al copiar", "error", 5000);
  } finally {
    document.body.removeChild(t);
  }
})();

// getTextOneTicketBML
function getTextOneTicketBML() {
  // === Notificación simple en la parte superior (centrada) ===
  function showToast(message, type = "info", duration = 5000) {
    const toast = document.getElementById("toast-notification");
    if (toast) toast.remove(); // Elimina notificación previa

    const el = document.createElement("div");
    el.id = "toast-notification";
    el.textContent = message;
    Object.assign(el.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background:
        type === "error"
          ? "#dc3545"
          : type === "success"
          ? "#28a745"
          : "#007bff",
      color: "white",
      padding: "12px 20px",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "bold",
      zIndex: "999999",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      maxWidth: "90%",
      textAlign: "center",
    });
    document.body.appendChild(el);

    // Desvanecer y eliminar
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.3s";
      setTimeout(() => el.remove(), 300);
    }, duration);
  }

  // === Extracción de datos ===
  const datax = document.getElementById("ibo-center-container");
  if (!datax) {
    console.error("No se encontró el contenedor #ibo-center-container");
    showToast("❌ Error: Ticket no encontrado", "error", 6000);
    return;
  }

  const cleanLineBreaks = (text) => {
    return (
      text
        // .replace(/[\u00A0\u200B\u000C]+/g, ' ') // Reemplaza varios "espacios raros"
        .replace(/\r\n|\r/g, "\n") // Normalizar saltos
        .replace(/\u00A0/g, " ") // Reemplazar NBSP (0xA0) por espacio normal
        .replace(/[ \t]+$/gm, "") // Espacios al final
        .replace(/^\s*\n/gm, "") // Líneas vacías con espacios
        .replace(/\n{3,}/g, "\n\n") // Máximo 2 saltos seguidos
        .trim()
    );
  };

  const xpath = (path, context = document) => {
    try {
      const result = document.evaluate(path, context, null, 7, null);
      const nodes = [];
      for (let i = 0; i < result.snapshotLength; i++) {
        nodes.push(result.snapshotItem(i));
      }
      return nodes;
    } catch (e) {
      console.warn("XPath falló:", path);
      return [];
    }
  };

  const getText = (xpathStr) => {
    const el = xpath(xpathStr, datax)[0];
    return el ? el.textContent.trim().replace(/\s+/g, " ") : "No disponible";
  };

  const getInnerText = (xpathStr) => {
    const el = xpath(xpathStr, datax)[0];
    const text = el?.innerText || "No disponible";
    return cleanLineBreaks(text);
  };

  const getAttr = (xpathStr, attr) => {
    const el = xpath(xpathStr, datax)[0];
    return el
      ? el.getAttribute(attr)?.trim() || "No disponible"
      : "No disponible";
  };

  const getCustomFields = (xpathStr, context = datax) => {
    const container = xpath(xpathStr, context)[0];
    if (!container) return "No disponible";

    const fields = container.querySelectorAll(".ibo-field");
    const details = [];

    fields.forEach((field) => {
      const labelEl = field.querySelector(".ibo-field--label");
      const valueEl = field.querySelector(".ibo-field--value");
      if (labelEl && valueEl) {
        const label = labelEl.textContent.trim().replace(/:+\s*$/, "");
        const value = valueEl.textContent.trim();
        if (label) details.push(`${label}: ${value}`);
      }
    });

    return details.length > 0
      ? details.join("\n")
      : "No hay detalles adicionales";
  };

  // === Datos del ticket ===
  const id_tick = getAttr(
    ".//div[contains(@id, 'ibo-object-details')]",
    "data-object-id"
  );
  const nro_tick = getText(".//div[@class='ibo-panel--title']");
  const url_tick_2 = datax.baseURI;

  const inc_req = nro_tick.startsWith("R") ? "UserRequest" : "Incident";
  const url_tick = `https://mesadeservicioti.mef.gob.pe/web/pages/UI.php?operation=details&class=${inc_req}&id=${id_tick}`;

  const mef = getText(
    ".//div[@data-attribute-code='org_id']//a[contains(@class, 'object-ref-link')]"
  );
  const reportado = getText(
    ".//div[@data-attribute-code='caller_id']//a[contains(@class, 'object-ref-link')]"
  );

  const id_persona = getAttr(
    ".//div[@data-attribute-code='caller_id']",
    "data-value-raw"
  );
  const url_persona_2 =
    xpath(
      ".//div[@data-attribute-code='caller_id']//a[contains(@class, 'object-ref-link')]",
      datax
    )[0]?.href?.trim() || "No disponible";

  const url_persona =
    id_persona !== "No disponible"
      ? `https://mesadeservicioti.mef.gob.pe/web/pages/UI.php?operation=details&class=Person&id=${id_persona}`
      : "No disponible";

  const asunto = getInnerText(
    ".//div[@data-attribute-code='title']//div[@class='ibo-field--value']"
  );
  const descripcion = getInnerText(
    ".//div[@data-attribute-code='description']//div[@class='ibo-field--value']"
  );
  const servicio = getText(
    ".//div[@data-attribute-code='service_id']//a[contains(@class, 'object-ref-link')]"
  );
  const subservicio = getText(
    ".//div[@data-attribute-code='servicesubcategory_id']//a[contains(@class, 'object-ref-link')]"
  );

  const mas_info = getCustomFields(
    ".//div[@data-attribute-code='service_details']//div[@class='ibo-field--value']"
  );

  const fecha_ini = getText(
    ".//div[@data-attribute-code='start_date']//div[@class='ibo-field--value']"
  );
  const fecha_asig = getText(
    ".//div[@data-attribute-code='assignment_date']//div[@class='ibo-field--value']"
  );

  // === Formato del mensaje final ===
  const txt_final = `
====================================================================================================
== ${fecha_ini} --- ${fecha_asig}
====================================================================================================

------------------------------ ${nro_tick}
> URL del Ticket (real):
${url_tick_2}

> Servicio: ${servicio}
> Subservicio: ${subservicio}

> Asunto:
${asunto}

> Descripción:
${descripcion}

> Detalles del Servicio:
${mas_info}

--------------------------------------------------------------------------------
> Reportado por: ${reportado}
> Organización: ${mef}
> ID Persona: ${id_persona}

> Perfil de la Persona (real):
${url_persona_2}

> Llamar:
adb shell am start -a android.intent.action.CALL -d tel:

> WhatsApp:
https://api.whatsapp.com/send?phone=51
Buen día, estimad@ ${reportado},
Le saluda Aron del equipo de Soporte OGTI - MEF.
Nos ponemos en contacto respecto al caso [${nro_tick}], para coordinar y dar inicio a la atención de su solicitud.
Quedo atento a su respuesta para brindarle el soporte necesario.
Saludos cordiales.


> Anotaciones:::



-------------------------------------------------------------------WHATSAPP
${nro_tick} | ${reportado} | xxx - xxx - xxx
-------------------------------------------------------------------END

---

`;

  // === Copiar al portapapeles ===
  const txtTemp = document.createElement("textarea");
  txtTemp.value = txt_final;
  document.body.appendChild(txtTemp);
  txtTemp.select();

  try {
    document.execCommand("copy");
    console.log(">>> Texto copiado al portapapeles:", nro_tick);
    showToast(`✅ Copiado: ${nro_tick}`, "success", 4000);
  } catch (err) {
    console.error("❌ Error al copiar:", err);
    showToast("❌ Error al copiar al portapapeles", "error", 6000);
  } finally {
    document.body.removeChild(txtTemp);
  }
}

// Ejecutar la función
getTextOneTicketBML();

// Mimificado BookMarkLet
javascript: (function () {
  function s(m, t = "info", d = 5000) {
    const n = document.getElementById("toast-notification");
    n && n.remove();
    const e = document.createElement("div");
    e.id = "toast-notification";
    e.textContent = m;
    Object.assign(e.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background:
        t === "error" ? "#dc3545" : t === "success" ? "#28a745" : "#007bff",
      color: "white",
      padding: "12px 20px",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "bold",
      zIndex: "999999",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      maxWidth: "90%",
      textAlign: "center",
    });
    document.body.appendChild(e);
    setTimeout(() => {
      e.style.opacity = "0";
      e.style.transition = "opacity 0.3s";
      setTimeout(() => e.remove(), 300);
    }, d);
  }
  const x = document.getElementById("ibo-center-container");
  if (!x) {
    console.error("No #ibo-center-container");
    s("❌ Ticket no encontrado", "error", 6000);
    return;
  }
  const c = (t) =>
      t
        .replace(/\r\n|\r/g, "\n")
        .replace(/\u00A0/g, " ")
        .replace(/[ \t]+$/gm, "")
        .replace(/^\s*\n/gm, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim(),
    X = (p, o = document) => {
      try {
        const r = document.evaluate(p, o, null, 7, null);
        const n = [];
        for (let i = 0; i < r.snapshotLength; i++) n.push(r.snapshotItem(i));
        return n;
      } catch (e) {
        console.warn("XPath falló:", p);
        return [];
      }
    },
    g = (p) => {
      const e = X(p, x)[0];
      return e ? e.textContent.trim().replace(/\\s+/g, " ") : "No disponible";
    },
    i = (p) => {
      const e = X(p, x)[0];
      return e ? c(e.innerText) : "No disponible";
    },
    A = (p, a) => {
      const e = X(p, x)[0];
      return e ? e.getAttribute(a)?.trim() || "No disponible" : "No disponible";
    },
    C = (p, c = x) => {
      const n = X(p, c)[0];
      if (!n) return "No disponible";
      const f = n.querySelectorAll(".ibo-field"),
        d = [];
      f.forEach((f) => {
        const l = f.querySelector(".ibo-field--label"),
          v = f.querySelector(".ibo-field--value");
        if (l && v) {
          const L = l.textContent.trim().replace(/:+\\s*$/, ""),
            V = v.textContent.trim();
          L && d.push(L + ": " + V);
        }
      });
      return d.length
        ? d.join(String.fromCharCode(10))
        : "No hay detalles adicionales";
    };
  const I = A(".//div[contains(@id,'ibo-object-details')]", "data-object-id"),
    N = g(".//div[@class='ibo-panel--title']"),
    U = x.baseURI,
    E = N.startsWith("R") ? "UserRequest" : "Incident",
    T = `https://mesadeservicioti.mef.gob.pe/web/pages/UI.php?operation=details&class=${E}&id=${I}`,
    M = g(
      ".//div[@data-attribute-code='org_id']//a[contains(@class,'object-ref-link')]"
    ),
    R = g(
      ".//div[@data-attribute-code='caller_id']//a[contains(@class,'object-ref-link')]"
    ),
    P = A(".//div[@data-attribute-code='caller_id']", "data-value-raw"),
    UP =
      X(
        ".//div[@data-attribute-code='caller_id']//a[contains(@class,'object-ref-link')]",
        x
      )[0]?.href?.trim() || "No disponible",
    UP2 =
      P !== "No disponible"
        ? `    https://mesadeservicioti.mef.gob.pe/web/pages/UI.php?operation=details&class=Person&id=${P}`
        : "No disponible",
    S = i(
      ".//div[@data-attribute-code='title']//div[@class='ibo-field--value']"
    ),
    D = i(
      ".//div[@data-attribute-code='description']//div[@class='ibo-field--value']"
    ),
    SV = g(
      ".//div[@data-attribute-code='service_id']//a[contains(@class,'object-ref-link')]"
    ),
    SS = g(
      ".//div[@data-attribute-code='servicesubcategory_id']//a[contains(@class,'object-ref-link')]"
    ),
    MI = C(
      ".//div[@data-attribute-code='service_details']//div[@class='ibo-field--value']"
    ),
    FI = g(
      ".//div[@data-attribute-code='start_date']//div[@class='ibo-field--value']"
    ),
    FA = g(
      ".//div[@data-attribute-code='assignment_date']//div[@class='ibo-field--value']"
    );
  let F =
    "\n" +
    "====================================================================================================" +
    String.fromCharCode(10) +
    "== " +
    FI +
    " --- " +
    FA +
    String.fromCharCode(10) +
    "====================================================================================================" +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    "------------------------------ " +
    N +
    String.fromCharCode(10) +
    "> URL del Ticket (real):" +
    String.fromCharCode(10) +
    U +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    "> Servicio: " +
    SV +
    String.fromCharCode(10) +
    "> Subservicio: " +
    SS +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    "> Asunto:" +
    String.fromCharCode(10) +
    S +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    "> Descripción:" +
    String.fromCharCode(10) +
    D +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    "> Detalles del Servicio:" +
    String.fromCharCode(10) +
    MI +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    "--------------------------------------------------------------------------------" +
    String.fromCharCode(10) +
    "> Reportado por: " +
    R +
    String.fromCharCode(10) +
    "> Organización: " +
    M +
    String.fromCharCode(10) +
    "> ID Persona: " +
    P +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    "> Perfil de la Persona (real):" +
    String.fromCharCode(10) +
    UP +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    "> Llamar:" +
    String.fromCharCode(10) +
    "adb shell am start -a android.intent.action.CALL -d tel:" +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    "> WhatsApp:" +
    String.fromCharCode(10) +
    "https://api.whatsapp.com/send?phone=51" +
    String.fromCharCode(10) +
    "Buen día, estimad@ " +
    R +
    ", " +
    String.fromCharCode(10) +
    "Le saluda Aron del equipo de Soporte OGTI - MEF." +
    String.fromCharCode(10) +
    "Nos ponemos en contacto respecto al caso [" +
    N +
    "], para coordinar y dar inicio a la atención de su solicitud." +
    String.fromCharCode(10) +
    "Quedo atento a su respuesta para brindarle el soporte necesario." +
    String.fromCharCode(10) +
    "Saludos cordiales." +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    "> Anotaciones:::" +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    "-------------------------------------------------------------------WHATSAPP" +
    String.fromCharCode(10) +
    N +
    " | " +
    R +
    " | xxx - xxx - xxx" +
    String.fromCharCode(10) +
    "-------------------------------------------------------------------END" +
    String.fromCharCode(10) +
    String.fromCharCode(10) +
    "---" +
    String.fromCharCode(10);
  const t = document.createElement("textarea");
  t.value = F;
  document.body.appendChild(t);
  t.select();
  try {
    document.execCommand("copy");
    console.log(">>> Copiado:", N);
    s("✅ Copiado: " + N, "success", 4000);
  } catch (e) {
    console.error("❌ Error:", e);
    s("❌ Error al copiar", "error", 6000);
  } finally {
    document.body.removeChild(t);
  }
})();






//getTicketReportBML
function getTicketReportBML() {
  // === Notificación simple en la parte superior (centrada) ===
  function showToast(message, type = "info", duration = 5000) {
    const toast = document.getElementById("toast-notification");
    if (toast) toast.remove(); // Elimina notificación previa

    const el = document.createElement("div");
    el.id = "toast-notification";
    el.textContent = message;
    Object.assign(el.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background:
        type === "error"
          ? "#dc3545"
          : type === "success"
          ? "#28a745"
          : "#007bff",
      color: "white",
      padding: "10px 20px",
      borderRadius: "6px",
      fontSize: "14px",
      zIndex: "999999",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      maxWidth: "90%",
      textAlign: "center",
    });
    document.body.appendChild(el);

    // Eliminar después de 'duration'
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.3s";
      setTimeout(() => el.remove(), 300);
    }, duration);
  }

  // === Extracción de datos ===
  const container = document.getElementById("ibo-center-container");
  if (!container) {
    console.error("❌ No se encontró #ibo-center-container");
    showToast("Error: Ticket no encontrado", "error", 6000);
    return;
  }

  const $x = (query, ctx = container) => {
    try {
      const res = document.evaluate(query, ctx, null, 7, null);
      const nodes = [];
      for (let i = 0; i < res.snapshotLength; i++)
        nodes.push(res.snapshotItem(i));
      return nodes;
    } catch (e) {
      console.warn("XPath falló:", query);
      return [];
    }
  };

  const getText = (query) => {
    const el = $x(query)[0];
    return el ? el.textContent.trim().replace(/\s+/g, " ") : "No disponible";
  };

  const nro_tick = getText(".//div[@class='ibo-panel--title']");
  const reportado = getText(
    ".//div[@data-attribute-code='caller_id']//a[contains(@class,'object-ref-link')]"
  );

  const txt_final = `${nro_tick} | ${reportado} | A - P - M`;

  // Copiar al portapapeles
  const temp = document.createElement("textarea");
  temp.value = txt_final;
  document.body.appendChild(temp);
  temp.select();
  try {
    document.execCommand("copy");
    console.log("✅ Copiado:", txt_final);
    showToast(`✅ Copiado: ${txt_final}`, "success", 4000);
  } catch (err) {
    console.error("❌ Error al copiar:", err);
    showToast("❌ Error al copiar", "error", 5000);
  } finally {
    document.body.removeChild(temp);
  }
}

// Ejecutar la función
getTicketReportBML();

// Mimificado BookMarkLet
javascript: (function () {
  function s(m, t = "info", d = 5000) {
    const n = document.getElementById("toast-notification");
    n && n.remove();
    const e = document.createElement("div");
    e.id = "toast-notification";
    e.textContent = m;
    Object.assign(e.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background:
        t === "error" ? "#dc3545" : t === "success" ? "#28a745" : "#007bff",
      color: "white",
      padding: "10px 20px",
      borderRadius: "6px",
      fontSize: "14px",
      zIndex: "999999",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      maxWidth: "90%",
      textAlign: "center",
    });
    document.body.appendChild(e);
    setTimeout(() => {
      e.style.opacity = "0";
      e.style.transition = "opacity 0.3s";
      setTimeout(() => e.remove(), 300);
    }, d);
  }
  const c = document.getElementById("ibo-center-container");
  if (!c) {
    console.error("❌ No #ibo-center-container");
    s("Error: Ticket no encontrado", "error", 6000);
    return;
  }
  const x = (q, o = c) => {
    try {
      const r = document.evaluate(q, o, null, 7, null);
      const n = [];
      for (let i = 0; i < r.snapshotLength; i++) n.push(r.snapshotItem(i));
      return n;
    } catch (e) {
      console.warn("XPath falló:", q);
      return [];
    }
  };
  const g = (q) => {
    const e = x(q)[0];
    return e ? e.textContent.trim().replace(/\\s+/g, " ") : "No disponible";
  };
  const n = g(".//div[@class='ibo-panel--title']"),
    r = g(
      ".//div[@data-attribute-code='caller_id']//a[contains(@class,'object-ref-link')]"
    ),
    f = n + " | " + r + " | A - P - M";
  const t = document.createElement("textarea");
  t.value = f;
  document.body.appendChild(t);
  t.select();
  try {
    document.execCommand("copy");
    console.log("✅ Copiado:", f);
    s("✅ Copiado: " + f, "success", 4000);
  } catch (e) {
    console.error("❌ Error al copiar:", e);
    s("❌ Error al copiar", "error", 5000);
  } finally {
    document.body.removeChild(t);
  }
})();



