function tableHead() {
   return `<thead>
            <tr>
               <th scope="col" class="col-first">No.</th>
               <th scope="col" class="col-first">Interval</th>
               <th scope="col" class="col-first">f</th>
               <th scope="col" class="col-first">xi</th>
               <th scope="col" class="col-first">xi.fi</th>
               <th scope="col" class="col-first">(xi-<span>x</span>)<sup>2</sup></th>
               <th scope="col" class="col-first">fi(xi-<span>x</span>)<sup>2</sup></th>
            </tr>
         </thead>`;
}

function tableRow(no=1, bb='', ba='', f='', a='', b='', c='', d='' ) {
   // bb = batasBawah
   // ba = batasAtas
   // f = frekuensi
   // a = xi
   // b = xi.fi
   // c = (xi-xi)^2
   // d = fi(xi-xi)^2
   return `<tr class="non-head">
            <th scope="row">${no}</th>
            <td>
               <input type="text" class="batas-bawah text-center" value="${bb}"> - 
               <input type="text" class="batas-atas text-center" value="${ba}">
            </td>
            <td><input type="text" class="f text-center" value="${f}"></td>
            <td>${a}</td>
            <td>${b}</td>
            <td>${c}</td>
            <td>${d}</td>
         </tr>`;
}

function tableFooter(text, a, b, c, d, e) {
   return `<tr>
            <th scope="row"></th>
            <td>${text}</td>
            <td>${a}</td>
            <td>${b}</td>
            <td>${c}</td>
            <td>${d}</td>
            <td>${e}</td>
         </tr>`;
}

function tampilkanTabelBaru(table, arrBatasAtas, arrBatasBawah, arrF, arrNilaiTengah, arrXiFi, arrxifi2, arrfixifi2) {
   table.innerHTML = tableHead();

   for( let i = 0; i < arrF.length; i++ ) {
      table.innerHTML += tableRow(i+1, checkDes(arrBatasBawah[i]), checkDes(arrBatasAtas[i]), checkDes(arrF[i]), checkDes(arrNilaiTengah[i]), checkDes(arrXiFi[i]), checkDes(arrxifi2[i]), checkDes(arrfixifi2[i]));
   }

   table.innerHTML += tableFooter('Jumlah', checkDes(Data.total_f()), '', checkDes(Data.total_xifi()), '', checkDes(Data.total_fi_xi_fi2()));
   table.innerHTML += tableFooter('Rata-rata', '', '', checkDes(Data.rata_rata()), '', '');
   table.innerHTML += tableFooter('Varians', '', '', '', '', checkDes(Data.cari_varians()));
   table.innerHTML += tableFooter('Standar Deviasi', '', '', '', '', checkDes(Data.cari_standar_deviasi()));
}