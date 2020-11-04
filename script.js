const a = [65, 72, 67, 82, 72, 91, 67, 73, 71, 70, 85, 87, 68, 86, 83, 90, 74, 89, 75, 61, 65, 76, 71, 65, 91, 79, 75, 69, 66, 85, 95, 74, 73, 68, 86, 90, 70, 71, 88, 68];

// const a = [65, 72, 67, 82, 72, 65, 67, 73, 72, 71, 70, 85];

const b = [79, 49, 48, 74, 81, 98, 87, 80, 80, 84, 90,	70, 91, 93, 82, 78, 70, 71, 92, 38, 56, 81, 74, 73, 68, 72, 85, 51, 65, 93, 83, 86, 90, 35, 83, 73, 74, 43, 86, 88, 92, 93, 76, 71, 90, 72, 67, 75, 80, 91, 61, 72, 97, 91, 88, 81, 70, 74, 99, 95, 80, 59, 71, 77, 63, 60, 83, 82, 60, 67, 89, 63, 76, 63, 88, 70, 66, 88, 79, 75];

a.sort();
console.table(a);

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


let f = 0, jumlah_f = 0;

console.log("nilai     f");
for( let i = 0; i < a.length; i++ ) {
   // * jika elemen saat ini sama dengan elemen sebelumnya jangan hitung frekuensi
   if( i > 0 && a[i] == a[i-1] ) {}

   // * jika tidak sama maka hitung frekuensi
   else {
      // * lakukan pengecekan dari element array index i sampai selesai
      for( let j = i; j < a.length; j++ ) {

         // * jika element saat ini, berikutnya, sampai selesai ada yang sama, maka increment frekuensi
         if( a[j] == a[i] ) f++;

         // * jika telah dicek sampai selesai, tampilkan jumlah frekuensi untuk index array ke i dan reset nilai f untuk pengecekan berikutnya
         if( j == a.length - 1 ) {
            console.log(` ${a[i]}       ${f}`);
            jumlah_f += f;
            f = 0;
         }
      }   
   }
}
console.log(`jumlah    ${jumlah_f}\n`);


console.log(`jumlah data = ${a.length}`);
console.log(`range = ${range(a)}`);
console.log(`banyak kelas = ${banyakKelas(a)}`);
console.log(`panjang kelas = ${panjangKelas(a)}\n`);


let batasBawah, batasAtas;
// tabel distribusi frekuensi
console.log(`|kelas ke |   nilai   |  f  |`);
for( let i = 0; i < banyakKelas(a); i++ ) {
   if( i == 0 ) {
      // * batas bawah dan batas atas untuk kelas pertama
      batasBawah = a[0];
      batasAtas = a[0] + (panjangKelas(a) - 1);  
   } else {
      // * batas bawah dan batas atas untuk kelas berikutnya sampai selesai
      batasBawah = batasAtas + 1;
      batasAtas = batasBawah + (panjangKelas(a) - 1);
   }
   f = 0;
   // * cari nilai frekuensi untuk setiap kelas interval
   for( let j = batasBawah; j <= batasAtas; j++ ) {
      f += a.filter(x => x == j).length;
   }
   console.log(`    ${i+1}        ${batasBawah} - ${batasAtas}     ${f}`);
}
