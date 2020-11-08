const inputField = document.getElementById('input');
const tombolSubmit = document.getElementById('submit');

// responsive (height of textarea based on the content inside it)
inputField.addEventListener('keyup', function(e) {
   e.target.style.height = '5px';
   e.target.style.height = `${e.target.scrollHeight}px`;
});

let rows = ``;
let barisJumlah = ``;
tombolSubmit.addEventListener('click', () => {
   // ambil value, split, convert ke int, dan urutkan
   const inputValue = inputField.value; 
   const arrayValue = inputValue.split(" ");
   const x = arrayValue.map(x => parseInt(x));
   x.sort((a, b) => a - b);
   console.log(x);
   
   // tampilkan table
   const table = document.getElementsByTagName('table')[0];
   table.style.display = 'table';

   // jika tidak ada value di textarea atau bukan angka maka jangan tampilkan table
   if( inputValue == "" || !(Number.isInteger(x[0])) ) {
      table.style.display = 'none';
      return false;
   }

   // hapus semua baris table selain head table
   let rows = table.querySelectorAll('.removeable');
   rows.forEach(x => { x.remove(); });
   if( barisJumlah.length > 10 ) {
      (table.getElementsByClassName('jumlah')[0]).remove();
   }

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
});