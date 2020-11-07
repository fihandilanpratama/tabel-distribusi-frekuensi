const inputField = document.getElementById('input');
const tombolSubmit = document.getElementById('submit');

// responsive (height of textarea based on the content inside it)
inputField.addEventListener('keyup', function(e) {
   e.target.style.height = '5px';
   e.target.style.height = `${e.target.scrollHeight}px`;
});

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

   // hapus semua baris selain head table
   let rows = table.querySelectorAll('.removeable');
   rows.forEach(x => {
      x.remove();
   });

   function eachRow(nomor, value, f) {
      const tr = document.createElement('tr');
      const no = document.createElement('td');
      const noText = document.createTextNode(`${nomor}.`);
      const nilai = document.createElement('td');
      const nilaiText = document.createTextNode(value)
      const frekuensi = document.createElement('td');
      const frekuensiText = document.createTextNode(f)

      no.appendChild(noText);
      nilai.appendChild(nilaiText);
      frekuensi.appendChild(frekuensiText);
      
      tr.appendChild(no);
      tr.classList.add('removeable');
      tr.appendChild(nilai);
      tr.appendChild(frekuensi);

      const table = document.getElementsByTagName('table')[0];
      table.appendChild(tr);
   }

   let f = 0, jumlah_f = 0, noRow = 1;
   for( let i = 0; i < x.length; i++ ) {
      if( i > 0 && x[i] == x[i-1] ) {}
      else {
         for( let j = i; j < x.length; j++ ) {
            if( x[j] == x[i] ) f++;
            if( j == x.length - 1 ) {
               eachRow(noRow++, x[i], f);
               jumlah_f += f;
               f = 0;
            }
         }   
      }
   }
})