let Data = {
   batas_bawah: [],
   batas_atas: [],
   f: [],
   xi: [],
   xifi: [],
   xi_fi2: [],
   fi_xi_fi2: [],

   total_f: function() {
      let total = 0;
      for( let i = 0; i < this.f.length; i++ ) {
         total += this.f[i];
      }
      return total;
   },

   total_xifi: function() {
      let total = 0;
      for( let i = 0; i < this.xifi.length; i++ ) {
         total += this.xifi[i];
      } 
      return total;
   },

   cari_xi: function() {
      for( let i = 0; i < this.batas_bawah.length; i++ ) {
         this.xi.push((this.batas_bawah[i] + this.batas_atas[i]) / 2);
      }
      return this.xi;
   },

   cari_xifi: function() {
      for( let i = 0; i < this.f.length; i++ ) {
         this.xifi.push(this.f[i] * this.xi[i]);
      }
      return this.xifi;
   },

   rata_rata: function() {
      return this.total_xifi() / this.total_f();
   },

   cari_xi_fi2: function() {
      for( let i = 0; i < this.f.length; i++ ) {
         this.xi_fi2.push((this.xi[i] - this.rata_rata()) ** 2);
      }
      return this.xi_fi2;
   },

   cari_fi_xi_fi2: function() {
      for( let i = 0; i < this.f.length; i++ ) {
         this.fi_xi_fi2.push(this.f[i] * this.xi_fi2[i]);
      }
      return this.fi_xi_fi2;
   },

   total_fi_xi_fi2: function() {
      let total = 0;
      for( let i = 0; i < this.f.length; i++ ) {
         total += this.fi_xi_fi2[i];
      }
      return total;
   },

   cari_varians: function() {
      return this.total_fi_xi_fi2() / (this.total_f() - 1);
   },

   cari_standar_deviasi: function() {
      return Math.sqrt(this.cari_varians());
   },

   resetValues: function() {  // reset all properties's value
      this.batas_bawah = [];
      this.batas_atas = [];
      this.f = [];
      this.xi = [];
      this.xifi = [];
      this.xi_fi2 = [];
      this.fi_xi_fi2 = [];
   }
}

function checkDes(x) {
   x = x.toString();
   x = x.split('.'); 
   let a;
   if( x.length == 1 ) {
      return x[0];
   } 
   else if( x[1].length > 5 ) {
      a = x[0];
      a += '.';
      a += x[1];
      a = parseFloat(a);
      return a.toFixed(5);
   } 
   else {
      a = x[0];
      a += '.';
      a += x[1];
      a = parseFloat(a);
      return a;
   }
}