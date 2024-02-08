const Culqi = window.Culqi;

Culqi.publicKey = 'pk_test_c84e30cedf9d0715';

Culqi.settings({
    title: 'Culqi Store',
    currency: 'PEN',  // Este parámetro es requerido para realizar pagos yape
    amount: 600,  // Este parámetro es requerido para realizar pagos yape
    order: '',
});

Culqi.options({
    lang: "auto",
    installments: false, // Habilitar o deshabilitar el campo de cuotas
    paymentMethods: {
      tarjeta: false,
      yape: true,
      bancaMovil: false,
      agente: false,
      billetera: false,
      cuotealo: false,
    },
  });
Culqi.init();


const ubid = require( 'ubid' );
let buyyerId = "";
ubid.get( function( error, signatureData ) {
    if ( error ) {
        console.error( error );
        return;
    }
    buyyerId = signatureData.browser.signature;
});

const btn_pay = document.getElementById('payWithYape');

btn_pay.addEventListener('click', function (e) {
    Culqi.open();
    e.preventDefault();
});

async function getTokenPay(culqiId) {
    try {
        let _data = {
            movieId: 22,
            buyerId: buyyerId,
            culqiId: culqiId,
            price: 6
        }    
        const response = await fetch('http://localhost:3000/api/movierented', {
            method: 'POST',
            headers: {
                accept: 'application/json',
            },
            body: JSON.stringify(_data) 
        });
    
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log(result.token);
        return result;
    } catch (err) {
      console.log(err);
    }
}



function culqi() {
    if (Culqi.token) {  // ¡Objeto Token creado exitosamente!
        const culqiId = Culqi.token.id;
        console.log('Se ha creado un Token: ', culqiId);
        
        getTokenPay(culqiId);
          
        // fetch('http://localhost:3000/api/movierented', {
        //     method: "POST",
        //     body: JSON.stringify(data),
        //     headers: {"Content-type": "application/json"},
        //     mode: 'no-cors'
        // })
        // .then( response => {
        //     return response.json();
        // })
        // .then( responseText => {
        //     //let users = JSON.parse(responseText).results;
        //     console.log(responseText);
        // });

    } else {
        // Mostramos JSON de objeto error en consola
        console.log('Error : ',Culqi.error);
    }
};

function generate_token(length){
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}