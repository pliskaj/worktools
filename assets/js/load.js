
    function spocitejOdchod() {
    const casPrijezd = document.getElementById('casPrijezd').value;
    const delkaPraceMin = parseInt(document.getElementById('delkaPrace').value);
    const delkaPrace = delkaPraceMin * 60;
    const delkaPrestavky = parseInt(document.getElementById('delkaPrestavky').value);

    const [prijezdHodiny, prijezdMinuty] = casPrijezd.split(':');

    const prijezdCas = new Date();
    prijezdCas.setHours(parseInt(prijezdHodiny), parseInt(prijezdMinuty));

    // Přičítání délky práce a délky přestávky
    prijezdCas.setMinutes(prijezdCas.getMinutes() + delkaPrace + delkaPrestavky);

    const odchodHodiny = prijezdCas.getHours();
    const odchodMinuty = prijezdCas.getMinutes();

    const casOdchod = `${odchodHodiny.toString().padStart(2, '0')}:${odchodMinuty.toString().padStart(2, '0')}`;

    document.getElementById('casOdchod').textContent = casOdchod;
}