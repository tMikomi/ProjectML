// Fungsi untuk mengupdate hematokrit berdasarkan usia dan jenis kelamin
function updateHematokrit() {
    var jenisKelamin = document.getElementById('jenisKelamin').value;
    var usia = parseInt(document.getElementById('usia').value);
    var hematokritInput = document.getElementById('hematokrit');
    var hematokritRange = "";

    // Menentukan rentang hematokrit berdasarkan usia dan jenis kelamin
    if (jenisKelamin === "Laki-laki") {
        if (usia >= 0 && usia <= 28) {
            hematokritRange = "55–66%"; // Bayi baru lahir
        } else if (usia <= 7) {
            hematokritRange = "47–65%"; // Bayi usia 1 minggu
        } else if (usia <= 30) {
            hematokritRange = "37–49%"; // Bayi usia 1 bulan
        } else if (usia <= 36) {
            hematokritRange = "30–36%"; // Bayi usia 3 bulan
        } else if (usia <= 41) {
            hematokritRange = "29–41%"; // Anak usia 1 tahun
        } else if (usia <= 40) {
            hematokritRange = "36–40%"; // Anak usia 10 tahun
        } else if (usia <= 14) {
            hematokritRange = "37–49%"; // Remaja usia 11-14 tahun
        } else if (usia <= 17) {
            hematokritRange = "40–54%"; // Remaja usia 15-17 tahun
        } else {
            hematokritRange = "42–54%"; // Dewasa laki-laki
        }
    } else if (jenisKelamin === "Perempuan") {
        if (usia >= 0 && usia <= 28) {
            hematokritRange = "55–66%"; // Bayi baru lahir
        } else if (usia <= 7) {
            hematokritRange = "47–65%"; // Bayi usia 1 minggu
        } else if (usia <= 30) {
            hematokritRange = "37–49%"; // Bayi usia 1 bulan
        } else if (usia <= 36) {
            hematokritRange = "30–36%"; // Bayi usia 3 bulan
        } else if (usia <= 41) {
            hematokritRange = "29–41%"; // Anak usia 1 tahun
        } else if (usia <= 40) {
            hematokritRange = "36–40%"; // Anak usia 10 tahun
        } else if (usia <= 14) {
            hematokritRange = "36–46%"; // Remaja usia 11-14 tahun
        } else if (usia <= 17) {
            hematokritRange = "38–48%"; // Remaja usia 15-17 tahun
        } else {
            hematokritRange = "38–46%"; // Dewasa perempuan
        }
    }

    hematokritInput.value = hematokritRange;
}

// Fungsi untuk klasifikasi DBD
function klasifikasiDBD() {
    // Mengambil nilai dari form
    var jenisKelamin = document.getElementById('jenisKelamin').value;
    var usia = parseInt(document.getElementById('usia').value);
    var gejalaChecked = document.querySelectorAll('.gejala:checked');
    var gejala = [];
    gejalaChecked.forEach(function(checkbox) {
        gejala.push(checkbox.value);
    });
    var trombosit = parseInt(document.getElementById('trombosit').value);
    var hematokrit = document.getElementById('hematokrit').value;
    var ujiNS1 = document.getElementById('ujiNS1').value;

    // Logika klasifikasi berdasarkan kondisi
    var hasil = "Pasien tidak terindikasi DBD berdasarkan hasil pemeriksaan.";
    var detailKondisi = []; // Untuk menyimpan kondisi yang terdeteksi

    // Gejala relevan dengan DBD
    var gejalaDBD = ['Sakit Kepala Berat', 'Demam Tinggi', 'Mual dan Muntah', 'Ruam Kulit', 'Kelelahan Ekstrem', 'Nyeri Otot dan Sendi', 'Pendarahan Ringan'];
    var gejalaTerkait = gejala.filter(function(val) {
        return gejalaDBD.includes(val);
    });

    // Memeriksa apakah ada dua dari tiga kondisi yang menunjukkan DBD
    if (trombosit < 150000) detailKondisi.push("Trombosit rendah");
    if (parseInt(hematokrit.split("–")[0]) > 40) detailKondisi.push("Hematokrit tinggi");
    if (ujiNS1 === "Positif") detailKondisi.push("Uji NS1 positif");

    // Logika penentuan hasil berdasarkan gejala dan hasil laboratorium
    if (detailKondisi.length >= 2 || gejalaTerkait.length >= 2) {
        hasil = "Pasien kemungkinan menderita DBD. " + detailKondisi.join(", ") + ".";
        if (gejalaTerkait.length > 0) {
            hasil += "\nGejala yang mendukung diagnosis: " + gejalaTerkait.join(", ") + ".";
        }
    } else {
        if (gejalaTerkait.length > 0) {
            hasil += "\nGejala yang dialami: " + gejalaTerkait.join(", ") + ".";
        }
    }

    // Menampilkan hasil
    document.getElementById('result').innerText = hasil;
}

// Menambahkan event listener untuk memperbarui hematokrit ketika usia atau jenis kelamin berubah
document.getElementById('jenisKelamin').addEventListener('change', updateHematokrit);
document.getElementById('usia').addEventListener('input', updateHematokrit);

