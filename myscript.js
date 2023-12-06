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
    let asunto = datax[0].children[0].children[1].children[2].children[0].children[1].children[0].children[1].children[0].children[0].children[0].children[5].children[1].innerText.replaceAll(" \n\n", "\n").replaceAll("\n\n", "\n");
    let descripcion = datax[0].children[0].children[1].children[2].children[0].children[1].children[0].children[1].children[0].children[0].children[0].children[6].children[1].innerText.replaceAll(" \n\n", "\n").replaceAll("\n\n", "\n");
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
        let req = element.children[0].innerText;
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
        txt_final += "====================================================================================================" + "\n" + "== xxxxxxxx_fecha_hoy" + " --- " + fecha + "\n" + "======================================================================" + "\n" + "------------------------------" + req + "\n" + "\n" + "> Asunto:" + "\n" + asunto + "\n" + "\n" + "> Detalles del Servicio:" + "\n" + detalles + "\n" + "\n" + "> Descripcion:" + "\n" + descripcion + "\n" + "\n" + "--------------------" + "\n" + "\n" + url_person + "\n" + "\n" + "adb shell am start -a android.intent.action.CALL -d tel:" + "\n" + "\n" + "https://api.whatsapp.com/send?phone=51" + "\n" + "Buen día estimad@ " + reportado + " , Le saluda Aron de SOPORTE OGTI - MEF, Nos estamos comunicando por este medio por el caso que tiene generado [" + req + "], para proceder con la atención solicitada." + "\n" + "\n" + "Motivo Pendiente:" + "\n" + motivo_pendiente + "\n" + "\n" + "-------------------------------------------------------------------WHATSAPP" + "\n" + req + " | " + reportado + " | xxx - xxx - xxx" + "\n" + "-------------------------------------------------------------------END" + "\n" + "---" + "\n" + "\n";
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
    let dni = data_p[0].children[0].children[8].children[1]?.innerText;
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
