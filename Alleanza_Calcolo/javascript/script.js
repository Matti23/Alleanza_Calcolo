// Definizione della matrice per salvare i dati
var datiSalvati = [];

// Funzione per calcolare la percentuale di riscatti e aggiornare i valori
function calcolaPercentuale(event) {
    // Ottieni il valore del bottone cliccato
    var valoreBottone = parseInt(event.target.value);

    // Recupera il valore attuale di riscatti e premiUnici
    var premiUnici = parseFloat(document.getElementById('premiUnici').value);
    var riscatti = parseFloat(document.getElementById('riscatti').value);

    // Calcola la percentuale
    var percentuale = (riscatti * valoreBottone) / 100;

    // Sottrai la percentuale da riscatti
    var nuovoRiscatti = riscatti - percentuale;

    // Aggiorna il campo riscatti
    document.getElementById('riscatti').value = nuovoRiscatti;

    // Non chiamare calcolaValore() qui, perché vogliamo che calcoli solo quando clicchiamo su "Calcola"
}

// Funzione per calcolare il valore finale e salvare i dati
function calcolaValore() {
    var premiUnici = parseFloat(document.getElementById('premiUnici').value);
    var riscatti = parseFloat(document.getElementById('riscatti').value);

    var risultato = 0;

    if (premiUnici !== 0) {
        risultato = (riscatti / premiUnici) * 100;
    }

    // Salvare i dati nella matrice
    var dati = {
        premiUnici: premiUnici,
        riscatti: riscatti,
        valoreFinale: risultato.toFixed(2) + '%'
    };
    datiSalvati.push(dati);

    // Visualizza il risultato nell'elemento con id 'valoreCalcolato'
    document.getElementById('valoreCalcolato').textContent = dati.valoreFinale;

    // Aggiorna la tabella dei risultati solo se esiste
    if (document.getElementById('tabellaRisultati')) {
        aggiornaTabellaRisultati();
    }

    // Aggiorna il textarea di output
    aggiornaTextareaOutput();
}

// Funzione per aggiornare la tabella dei risultati
function aggiornaTabellaRisultati() {
    var tableBody = document.getElementById('tabellaRisultati');
    
    // Verifica se l'elemento esiste prima di procedere
    if (!tableBody) {
        return;
    }

    // Pulizia della tabella
    tableBody.innerHTML = '';

    // Aggiungi righe per ogni dato salvato
    datiSalvati.forEach(function(dato, index) {
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.textContent = dato.premiUnici;
        cell2.textContent = dato.riscatti;
        cell3.textContent = dato.valoreFinale;
    });
}

// Funzione per aggiornare il textarea di output
function aggiornaTextareaOutput() {
    var outputTextArea = document.getElementById('outputTextArea');
    
    // Verifica se l'elemento esiste prima di procedere
    if (!outputTextArea) {
        return;
    }

    outputTextArea.value = '';

    // Costruisci la rappresentazione testuale dei dati
    datiSalvati.forEach(function(dato, index) {
        outputTextArea.value += 'Premi Unici: ' + dato.premiUnici + ', Riscatti: ' + dato.riscatti + ', Valore Finale: ' + dato.valoreFinale + '\n';
    });
}

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', function () {
    // Imposta i valori iniziali a 0 e calcola il valore
    document.getElementById('premiUnici').value = 0;
    document.getElementById('riscatti').value = 0;
    calcolaValore(); // Chiama la funzione per il calcolo iniziale e il salvataggio
});

// Aggiungi event listener a tutti i bottoni con la classe btn-warning
document.querySelectorAll('.btn-warning').forEach(button => {
    button.addEventListener('click', calcolaPercentuale);
});

// Aggiungi un evento click al pulsante "Calcola"
document.getElementById('calcola').addEventListener('click', function () {
    calcolaValore(); // Chiama la funzione per il calcolo al click
});

// Aggiungi un evento click al pulsante "Reset"
document.getElementById('reset').addEventListener('click', function () {
    // Resetta i valori di premiUnici, riscatti e calcola il valore
    document.getElementById('premiUnici').value = 0;
    document.getElementById('riscatti').value = 0;
    datiSalvati = []; // Resetta anche la matrice dei dati salvati
    calcolaValore(); // Chiama la funzione per ricalcolare il valore e aggiornare la tabella e il textarea
});


// Funzione per gestire il download della matrice come file di testo
function downloadMatrice() {
    var datiFormattati = '';

    // Costruisci la rappresentazione testuale dei dati
    datiSalvati.forEach(function(dato, index) {
        datiFormattati += 'Premi Unici: ' + dato.premiUnici + ', Riscatti: ' + dato.riscatti + ', Valore Finale: ' + dato.valoreFinale + '\n';
    });

    // Crea un oggetto Blob contenente i dati formattati
    var blob = new Blob([datiFormattati], { type: 'text/plain' });

    // Crea un URL per il Blob e crea un link di download
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'valori_calcolati.txt';
    document.body.appendChild(a); // Aggiungi il link al DOM
    a.click(); // Simula il click sul link per avviare il download
    document.body.removeChild(a); // Rimuovi il link dal DOM dopo il download
}

// Aggiungi un evento click al pulsante "Download"
document.getElementById('download').addEventListener('click', function () {
    downloadMatrice();
});

