let no = 1;

const btnTambah = document.getElementById('btn-tambah');
const btnReset = document.getElementById('btn-reset');
const btnHapus = document.getElementById('btn-hapus');
const btnProses = document.getElementById('btn-proses');
const table = document.getElementsByTagName('table')[0];

btnTambah.addEventListener('click', () => {
   const tbody = document.getElementById('tbody');
   tbody.insertAdjacentHTML("beforeend", tableRow(++no));
});

btnHapus.addEventListener('click', () => {
   const rowNonHead = document.getElementsByClassName('non-head');
   if( rowNonHead.length > 1 ) {    // jika hanya ada 1 row non-head
      (rowNonHead[rowNonHead.length - 1]).remove(); // remove the last element
      no--;
   }
});

btnProses.addEventListener('click', () => {
   const batasBawah = document.querySelectorAll('.batas-bawah');
   const batasAtas = document.querySelectorAll('.batas-atas');
   const f = document.querySelectorAll('.f');

   // ambil value
   batasBawah.forEach(function(x) {
      Data.batas_bawah.push(parseInt(x.value));
   });
   batasAtas.forEach(function(x) {
      Data.batas_atas.push(parseInt(x.value));
   });
   f.forEach(function(x) {
      Data.f.push(parseInt(x.value));
   });

   // jika ada bagian yang tidak diisi
   if( Data.batas_bawah.includes(NaN) || Data.batas_atas.includes(NaN) || Data.f.includes(NaN) ) {
      alert('Ada bagian yang belum diisi !');
      Data.resetValues();
      return false;
   }

   Data.cari_xi()
   Data.cari_xifi();
   Data.cari_xi_fi2();
   Data.cari_fi_xi_fi2();
   tampilkanTabelBaru(table, Data.batas_atas, Data.batas_bawah, Data.f, Data.xi, Data.xifi, Data.xi_fi2, Data.fi_xi_fi2);

   // jika berhasil dan semua aman set tombol(hapus, tambah) jadi disabled
   btnHapus.setAttribute('disabled', '');
   btnTambah.setAttribute('disabled', '');

   // reset values
   Data.resetValues();
});

btnReset.addEventListener('click', () => {
   no = 1;
   table.innerHTML = tableHead();
   let eltbody = document.createElement('tbody');
   eltbody.setAttribute('id', 'tbody');
   eltbody.innerHTML = tableRow(no);
   table.append(eltbody);
   
   // remove attribut disabled dari tambol hapus dan tambah
   btnHapus.removeAttribute('disabled');
   btnTambah.removeAttribute('disabled');
});