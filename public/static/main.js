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

const btn_pay = document.getElementById('payWithYape');

btn_pay.addEventListener('click', function (e) {
    Culqi.open();
    e.preventDefault();
})

function culqi() {
    if (Culqi.token) {  // ¡Objeto Token creado exitosamente!
        const culqiId = Culqi.token.id;
        console.log('Se ha creado un Token: ', culqiId);
        
        let _data = {
            movieId: 29,
            buyerId: culqiId,
            culqiId: culqiId,
            price: 6
        }

        async function postData(url = '', data = {}) {
            // Opciones por defecto estan marcadas con un *
            const response = await fetch(url, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              mode: 'no-cors',
              rejectUnauthorized:false,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              },
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        }

        const apiUrl = 'https://api.cursosya.info/api/movierented'
        const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

        postData(apiUrl, _data)
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
            Culqi.close();
        });
          
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