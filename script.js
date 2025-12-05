document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('kapcsolatForm');
    const valasz = document.getElementById('uzenetValasz');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let hibak = [];
            let siker = true;

            const nev = document.getElementById('nev').value.trim();
            const email = document.getElementById('email').value.trim();
            const tel = document.getElementById('tel').value.trim();
            const eletkor = document.getElementById('eletkor').value;
            const nem = document.getElementById('nem').value;
            const tema = document.getElementById('tema').value.trim();
            const uzenet = document.getElementById('uzenet').value.trim();

            // Validáció
            if (nev.length < 3) {
                hibak.push("A név túl rövid (minimum 3 karakter)!");
                siker = false;
            }
            
            const emailMinta = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailMinta.test(email)) {
                hibak.push("Az e-mail cím érvénytelen!");
                siker = false;
            }
            
            if (tel.length < 6) {
                hibak.push("A telefonszám túl rövid!");
                siker = false;
            }
            
            if (eletkor < 10 || eletkor > 120) {
                hibak.push("Az életkornak 10 és 120 között kell lennie!");
                siker = false;
            }
            
            if (nem === "") {
                hibak.push("Kérlek válassz nemet!");
                siker = false;
            }
            
            if (tema.length < 3) {
                hibak.push("A téma túl rövid!");
                siker = false;
            }
            
            if (uzenet.length < 10) {
                hibak.push("Az üzenet túl rövid (minimum 10 karakter)!");
                siker = false;
            }

            if (!siker) {
                valasz.innerHTML = '<h4>Hiba történt:</h4><ul>' + 
                    hibak.map(h => `<li>${h}</li>`).join('') + '</ul>';
                valasz.style.color = "#d32f2f";
                valasz.style.background = "#ffebee";
                valasz.style.border = "2px solid #ffcdd2";
            } else {
                valasz.innerHTML = '<h4>Sikeres küldés!</h4>' +
                    '<p>Köszönjük, hogy írtál nekünk. Hamarosan válaszolunk.</p>' +
                    '<p><strong>Összefoglaló:</strong></p>' +
                    `<p>Név: ${nev}</p>` +
                    `<p>Téma: ${tema}</p>`;
                valasz.style.color = "#2e7d32";
                valasz.style.background = "#e8f5e9";
                valasz.style.border = "2px solid #c8e6c9";
                
                // Form ürítése
                form.reset();
                
                // Adatok logolása
                console.log('Kapcsolat űrlap adatok:', {
                    nev, email, tel, eletkor, nem, tema, 
                    uzenet: uzenet.substring(0, 50) + '...',
                    idopont: new Date().toISOString()
                });
            }
        });
    }
});