// === Función mejorada: getTextOneTicketMod ===
function getTextOneTicketMod() {
  // Buscar el contenedor principal
  const datax = $x("//div[@id='ibo-center-container']")[0];
  if (!datax) {
    console.error("No se encontró el contenedor #ibo-center-container");
    return;
  }

  // === Funciones auxiliares ===

  // Limpia y normaliza saltos de línea
  const cleanLineBreaks = (text) => {
    return text
      .replace(/\r\n|\r/g, '\n')           // Normalizar saltos
      .replace(/\u00A0/g, ' ')             // Reemplazar NBSP (0xA0) por espacio normal
      .replace(/[ \t]+$/gm, '')            // Espacios al final
      .replace(/^\s*\n/gm, '')           // Líneas vacías con espacios
      .replace(/\n{3,}/g, '\n\n')          // Máximo 2 saltos seguidos
      .trim();
  };

  // Extrae texto respetando saltos visuales (mejor que textContent)
  const getInnerText = (xpath) => {
    const el = $x(xpath, datax)[0];
    const text = el?.innerText || 'No disponible';
    return cleanLineBreaks(text);
  };

  // Extrae atributo seguro
  const getAttr = (xpath, attr) => {
    const el = $x(xpath, datax)[0];
    return el ? el.getAttribute(attr)?.trim() : 'No disponible';
  };
  

  // Función auxiliar para extraer texto limpio
  const getText = (xpath) => {
    const el = $x(xpath, datax)[0];
    return el ? el.textContent.trim().replace(/\s+/g, ' ') : 'No disponible';
  };

  // Función auxiliar parra extraer campos personalizados
  const getCustomFields = (xpath, context = datax) => {
    const container = $x(xpath, context)[0];
    if (!container) return 'No disponible';

    const fields = container.querySelectorAll('.ibo-field');
    const details = [];

    fields.forEach(field => {
      const labelEl = field.querySelector('.ibo-field--label');
      const valueEl = field.querySelector('.ibo-field--value');

      if (labelEl && valueEl) {
        const label = labelEl.textContent.trim().replace(/:+\s*$/, '');
        const value = valueEl.textContent.trim();
        if (label) {
          details.push(`${label}: ${value}`);
        }
      }
    });

    return details.length > 0 ? details.join('\n') : 'No hay detalles adicionales';
  };

  // === Extracción de datos ===
  const id_tick = getAttr(".//div[contains(@id, 'ibo-object-details')]", "data-object-id");
  const nro_tick = getText(".//div[@class='ibo-panel--title']");
  const url_tick_2 = datax.baseURI;

  const inc_req = nro_tick.startsWith("R") ? "UserRequest" : "Incident";
  const url_tick = `https://mesadeservicioti.mef.gob.pe/web/pages/UI.php?operation=details&class=${inc_req}&id=${id_tick}`;

  const mef = getText(".//div[@data-attribute-code='org_id']//a[contains(@class, 'object-ref-link')]");
  const reportado = getText(".//div[@data-attribute-code='caller_id']//a[contains(@class, 'object-ref-link')]");

  const id_persona = getAttr(".//div[@data-attribute-code='caller_id']", "data-value-raw");
  const url_persona_2 = $x(
    ".//div[@data-attribute-code='caller_id']//a[contains(@class, 'object-ref-link')]",
    datax
  )[0]?.href?.trim() || 'No disponible';

  const url_persona = `https://mesadeservicioti.mef.gob.pe/web/pages/UI.php?operation=details&class=Person&id=${id_persona}`;

  const asunto = getInnerText(".//div[@data-attribute-code='title']//div[@class='ibo-field--value']");
  const descripcion = getInnerText(".//div[@data-attribute-code='description']//div[@class='ibo-field--value']");
  const servicio = getText(".//div[@data-attribute-code='service_id']//a[contains(@class, 'object-ref-link')]");
  const subservicio = getText(".//div[@data-attribute-code='servicesubcategory_id']//a[contains(@class, 'object-ref-link')]");
  
  const mas_info = getCustomFields(".//div[@data-attribute-code='service_details']//div[@class='ibo-field--value']");

  const fecha_ini = getText(".//div[@data-attribute-code='start_date']//div[@class='ibo-field--value']");
  const fecha_asig = getText(".//div[@data-attribute-code='assignment_date']//div[@class='ibo-field--value']");


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
Buen día estimad@ ${reportado}, le saluda Aron de SOPORTE OGTI - MEF. Nos comunicamos por el caso [${nro_tick}] para proceder con la atención solicitada.

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
  document.execCommand("copy");
  document.body.removeChild(txtTemp);

  console.log(">>> Texto copiado al portapapeles:", nro_tick);
}

//One Ticket
function getTextOneTicket() {
    let datax = $x("//div[@id='ibo-center-container']");
    let id_tick = datax[0].children[0].children[1].attributes["data-object-id"].value;
    let nro_tick = datax[0].children[0].children[1].children[1].children[0].children[1].children[0].innerText;
    let url_tick_ = datax[0].attributes["id"].baseURI;
    let inc_req = nro_tick.substring(0, 1) == "R" ? "UserRequest" : "Incident";
    let url_tick = "https://mesadeservicioti.mef.gob.pe/web/pages/UI.php?operation=details&class=" + inc_req + "&id=" + id_tick;
    let reportado = datax[0].children[0].children[1].children[2].children[0].children[1].children[0].children[1].children[0].children[0].children[0].children[2].children[1].children[0].children[0].innerText;
    let id_persona = datax[0].children[0].children[1].children[2].children[0].children[1].children[0].children[1].children[0].children[0].children[0].children[2].children[1].children[0].attributes["title"].value.substring(9);
    let url_persona_ = datax[0].children[0].children[1].children[2].children[0].children[1].children[0].children[1].children[0].children[0].children[0].children[2].children[1].children[0].children[0].href;
    let url_persona = "https://mesadeservicioti.mef.gob.pe/web/pages/UI.php?operation=details&class=Person&id=" + id_persona;
    let asunto = datax[0].children[0].children[1].children[2].children[0].children[1].children[0].children[1].children[0].children[0].children[0].children[6].children[1].innerText.replaceAll(" \n\n", "\n").replaceAll("\n\n", "\n");
    let descripcion = datax[0].children[0].children[1].children[2].children[0].children[1].children[0].children[1].children[0].children[0].children[0].children[7].children[1].innerText.replaceAll(" \n\n", "\n").replaceAll("\n\n", "\n");
    let mas_info = datax[0].children[0].children[1].children[2].children[0].children[1].children[0].children[1].children[0].children[0].children[1].innerText.replaceAll("\t\n", " : ");
    let fecha_ini = datax[0].children[0].children[1].children[2].children[0].children[1].children[0].children[1].children[0].children[1].children[2].children[1].children[1].innerText;
    let fecha_asig = datax[0].children[0].children[1].children[2].children[0].children[1].children[0].children[1].children[0].children[1].children[2].children[3].children[1].innerText;
    let txt_final = "====================================================================================================" + "\n" + "== " + fecha_ini + " --- " + fecha_asig + "\n" + "======================================================================" + "\n" + "------------------------------" + nro_tick + "\n" + "\n" + "> baseURI:" + "\n" + url_tick + "\n" + "\n" + "> Asunto:" + "\n" + asunto + "\n" + "\n" + "> Detalles del Servicio:" + "\n" + mas_info + "\n" + "\n" + "> Descripcion:" + "\n" + descripcion + "\n" + "\n" + "--------------------" + "\n" + "\n" + url_persona + "\n" + "\n" + "adb shell am start -a android.intent.action.CALL -d tel:" + "\n" + "\n" + "https://api.whatsapp.com/send?phone=51" + "\n" + "Buen día estimad@ " + reportado + " , Le saluda Aron de SOPORTE OGTI - MEF, Nos estamos comunicando por este medio por el caso que tiene generado [" + nro_tick + "], para proceder con la atención solicitada." + "\n" + "\n" + "-------------------------------------------------------------------WHATSAPP" + "\n" + nro_tick + " | " + reportado + " | xxx - xxx - xxx" + "\n" + "-------------------------------------------------------------------END" + "\n" + "---" + "\n" + "\n";
    var txtTemp = document.createElement("textarea");
    document.body.appendChild(txtTemp);
    txtTemp.value = txt_final;
    txtTemp.select();
    document.execCommand("copy");
    document.body.removeChild(txtTemp); //console.log(txt_final);
}


//Ticket
function getTextTicket() {
    let datax = $x("//tbody/tr[contains(@class,'odd') or contains(@class,'even')]");
    let txt_final = "";
    datax.forEach((element) => {
        let nro_tick = element.children[0].innerText;
        let id_tick = element.children[0].attributes["data-value-raw"].value;
        let inc_req = nro_tick.substring(0, 1) == "R" ? "UserRequest" : "Incident";
        let url_tick = "https://mesadeservicioti.mef.gob.pe/web/pages/UI.php?operation=details&class=" + inc_req + "&id=" + id_tick;
        let asunto = element.children[1].innerText;
        let reportado = element.children[2].innerText;
        let fecha = element.children[3].innerText;
        let detalles = element.children[6].innerText.replaceAll(" ", " ").replaceAll("	", " ");
        detalles = detalles.replaceAll("\n\n \n\n", "\n").replaceAll("\n\n ", "").replaceAll("Necesario \n", "").replaceAll(": \n", " ");
        let descripcion = element.children[7].innerText.replaceAll(" ", " ").replaceAll("	", " ");
        descripcion = descripcion.replaceAll("\n\n \n\n", "\n").replaceAll("\n\n ", "");
        let motivo_pendiente = element.children[8].innerText;
        let idperson = element.children[2].dataset.valueRaw;
        let url_person = "https://mesadeservicioti.mef.gob.pe/web/pages/UI.php?operation=details&class=Person&id=" + idperson;
        txt_final += "====================================================================================================" + "\n" + "== xxxxxxxx_fecha_hoy" + " --- " + fecha + "\n" + "======================================================================" + "\n" + "------------------------------" + nro_tick + "\n" + "\n" + "> baseURI:" + "\n" + url_tick + "\n" + "\n" + "> Asunto:" + "\n" + asunto + "\n" + "\n" + "> Detalles del Servicio:" + "\n" + detalles + "\n" + "\n" + "> Descripcion:" + "\n" + descripcion + "\n" + "\n" + "--------------------" + "\n" + "\n" + url_person + "\n" + "\n" + "adb shell am start -a android.intent.action.CALL -d tel:" + "\n" + "\n" + "https://api.whatsapp.com/send?phone=51" + "\n" + "Buen día estimad@ " + reportado + " , Le saluda Aron de SOPORTE OGTI - MEF, Nos estamos comunicando por este medio por el caso que tiene generado [" + nro_tick + "], para proceder con la atención solicitada." + "\n" + "\n" + "Motivo Pendiente:" + "\n" + motivo_pendiente + "\n" + "\n" + "-------------------------------------------------------------------WHATSAPP" + "\n" + nro_tick + " | " + reportado + " | xxx - xxx - xxx" + "\n" + "-------------------------------------------------------------------END" + "\n" + "---" + "\n" + "\n";
    });
    var txtTemp = document.createElement("textarea");
    document.body.appendChild(txtTemp);
    txtTemp.value = txt_final;
    txtTemp.select();
    document.execCommand("copy");
    document.body.removeChild(txtTemp); //console.log(txt_final);
}

//Ip Report
function getTextIp() {
    let data_v = $x('//table/tbody[@class="yui-dt-data"]/tr');
    let txt_final = "";
    data_v.forEach((element) => {
        let sn = element.children[0].innerText;
        let model = element.children[1].innerText;
        let ram = element.children[2].innerText;
        let cpu = element.children[3].innerText;
        let hostname = element.children[4].innerText;
        let username = element.children[5].innerText;
        let ip = element.children[6].innerText.replaceAll("\n1", " - 1").replaceAll("\n", "");
        let time = element.children[7].innerText;
        txt_final += "\n" + "===== Datos del Equipo =====" + "\n" + "------------------------------" + "\n" + "Serial Number: " + sn + "\n" + "Model: " + model + "\n" + "RAM: " + ram + "\n" + "CPU: " + cpu + "\n" + "Computer Name: " + hostname + "\n" + "User Name: " + username + "\n" + "IP Address: " + ip + "\n" + "Last Report Time: " + time + "\n" + "------------------------------" + "\n";
    });
    var txtTemp = document.createElement("textarea");
    document.body.appendChild(txtTemp);
    txtTemp.value = txt_final;
    txtTemp.select();
    document.execCommand("copy");
    document.body.removeChild(txtTemp); //console.log(txt_final);
}

// Username
function getTextUsername() {
    let data_p = $x('//div[@id="UI:PropertiesTab"]/div/div[1]');
    let apellido = data_p[0].children[0].children[1].children[1]?.innerText;
    let nombre = data_p[0].children[0].children[2].children[1]?.innerText;
    let username = nombre + " " + apellido;
    let dni = data_p[0].children[0].children[9].children[1]?.innerText;
    let txt_final = "";
    let data_pp = $x('//div[@id="UI:PropertiesTab"]/div/div[2]');
    data_pp.forEach((element) => {
        let email = element.children[1].children[1].children[1].children[0]?.innerText;
        let telefono = element.children[1].children[3].children[1].children[0]?.innerText;
        let movil = element.children[1].children[4].children[1].children[0]?.innerText;
        txt_final += "\n" + username + "\nNúmero de Empleado: " + dni + "\nCorreo Electrónico: " + email + "\nTeléfono: " + telefono + "\nMóvil: " + movil + "\n";
    });
    var txtTemp = document.createElement("textarea");
    document.body.appendChild(txtTemp);
    txtTemp.value = txt_final;
    txtTemp.select();
    document.execCommand("copy");
    document.body.removeChild(txtTemp); //console.log(txt_final);
}
