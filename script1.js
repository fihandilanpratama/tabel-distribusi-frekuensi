const inputField = document.getElementById('input');
const tombolSubmit = document.getElementById('submit');

// responsive (height of textarea based on the content inside it)
inputField.addEventListener('keyup', function(e) {
   e.target.style.height = '5px';
   e.target.style.height = `${e.target.scrollHeight}px`;
});

function range(x) {
   let nilaiMax = x[x.length - 1];
   let nilaiMin = x[0];
   return nilaiMax - nilaiMin;
}
function banyakKelas(x) {
   return Math.round(1 + 3.3*Math.log10(x.length));
}
function panjangKelas(x) {
   return Math.ceil(range(x) / banyakKelas(x));
}

let rows = ``;
let rowsDK = ``;
let barisJumlah = ``;
tombolSubmit.addEventListener('click', () => {
   // ambil value, split, convert ke int, dan urutkan
   const inputValue = inputField.value; 
   const arrayValue = inputValue.split(" ");
   const x = arrayValue.map(x => parseInt(x));
   x.sort((a, b) => a - b);
   console.log(x);
   
   // tampilkan table
   const infoData = document.getElementsByClassName('col-info-data')[0];
   const tableContainer = document.getElementsByClassName('table-container')[0];
   const table = document.getElementsByTagName('table')[0];
   const tableDK = document.getElementById('data-kelompok');
   tableContainer.style.visibility = 'visible';
   table.style.display = 'table';
   tableDK.style.display = 'table';

   // jika tidak ada value di textarea atau bukan angka maka jangan tampilkan table
   if( inputValue == "" || !(Number.isInteger(x[0])) ) {
      tableContainer.style.visibility = 'hidden';
      table.style.display = 'none';
      tableDK.style.display = 'none';
      infoData.innerHTML = `<ul>
                           <li>Nilai Terkecil = </li>
                           <li>Nilai Terbesar = </li>
                           <li>Jumlah Data = </li>
                           <li>Range = </li>
                           <li>Banyak Kelas = </li>
                           <li>Panjang Kelas = </li>
                        </ul>`;
      return false;
   }

   // hapus semua baris table selain head table
   let rowsDelete = document.querySelectorAll('.removeable');
   rowsDelete.forEach(x => { x.remove(); });
   if( barisJumlah.length > 10 ) {
      (table.getElementsByClassName('jumlah')[0]).remove();
      (tableDK.getElementsByClassName('jumlah')[0]).remove();
   }

   // tampilkan info data
   infoData.innerHTML = `<ul>
                           <li>Nilai Terkecil = ${x[0]}</li>
                           <li>Nilai Terbesar = ${x[x.length - 1]}</li>
                           <li>Jumlah Data = ${x.length}</li>
                           <li>Range = ${range(x)}</li>
                           <li>Banyak Kelas = ${banyakKelas(x)}</li>
                           <li>Panjang Kelas = ${panjangKelas(x)}</li>
                        </ul>`;

   // pengulangan untuk setiap row/baris
   let f = 0, jumlah_f = 0, noRow = 1;
   for( let i = 0; i < x.length; i++ ) {
      if( i > 0 && x[i] == x[i-1] ) {}
      else {
         for( let j = i; j < x.length; j++ ) {
            if( x[j] == x[i] ) f++;
            if( j == x.length - 1 ) {
               rows = `<tr class="removeable">
                           <td>${noRow++}.</td>
                           <td>${x[i]}</td>
                           <td>${f}</td>
                        </tr>`;
               table.innerHTML += rows;
               jumlah_f += f;
               f = 0;
            }
         }   
      }
   }
   barisJumlah = `<tr class="jumlah">
                     <td colspan="2">jumlah</td>
                     <td>${jumlah_f}</td>
                  </tr>`;
   table.innerHTML += barisJumlah;


   let batasBawah, batasAtas;
   // tabel distribusi frekuensi
   console.log(`|kelas ke |   nilai   |  f  |`);
   for( let i = 0; i < banyakKelas(x); i++ ) {
      if( i == 0 ) {
         // * batas bawah dan batas atas untuk kelas pertama
         batasBawah = x[0];
         batasAtas = x[0] + (panjangKelas(x) - 1);  
      } else {
         // * batas bawah dan batas atas untuk kelas berikutnya sampai selesai
         batasBawah = batasAtas + 1;
         batasAtas = batasBawah + (panjangKelas(x) - 1);
      }
      f = 0;
      // * cari nilai frekuensi untuk setiap kelas interval
      for( let j = batasBawah; j <= batasAtas; j++ ) {
         f += x.filter(x => x == j).length;
      }
      console.log(`    ${i+1}        ${batasBawah} - ${batasAtas}     ${f}`);
      rowsDK = `<tr class="removeable">
                  <td>${i+1}</td>
                  <td>${batasBawah} - ${batasAtas}</td>
                  <td>${f}</td>
               </tr>`;
      tableDK.innerHTML += rowsDK;
   }
   tableDK.innerHTML += barisJumlah;
});


// 65 72 67 82 72 91 67 73 71 70 85 87 68 86 83 90 74 89 75 61 65 76 71 65 91 79 75 69 66 85 95 74 73 68 86 90 70 71 88 68