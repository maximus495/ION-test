CHRONOS - Take Home Assignment

#preparacion del proyecto
-npm install 


Available Scripts
In the project directory, you can run:

npm start 


puerto por defecto: 5000 

#END POINTS 
1. Creación de la cuenta
    POST http://localhost:5000/api/account

    * Body { 
	    "name": "jhonatan", 
	    "account": {
		    "active-card": true, 
		    "available-limit": 100
	    } 
}


2. Autorización de la transacción
    POST http://localhost:5000/api/transaction

    * Body {
	    "name": "Carlos",
	    "transaction": {
		    "merchant": "Burger King", 
		    "amount": 10, 
		    "time": "2022-07-12T12:59:30.000Z"
	}
}

#en este caso, el name sera el identificador de la cuenta, se pueden crear tantas cuentas como deseen