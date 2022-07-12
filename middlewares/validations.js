const store = require('../store/dummy')

const accounts = async (req, res, next) =>{
    const {name, account} = req.body;
    const data = await store.query('user',name)

    if (data[0]) {
        return res.status(400).json({ 
            account,
            violations: ["account-already-initialized"]});
    }
    next();
}

const transactions = async (req, res, next) =>{

    const {name, transaction} = req.body;
    const user = await store.query('user',name);
    const userTransaction = await store.query('transaction',name);
    const violations = [];

    if(!user[0])
        return res.status(400).json({account: "",violations: ['account-not-initialized']});
    
    if(!user[0].account['active-card']) // No se debe aceptar ninguna transacción cuando la tarjeta no está activa: inactive-card
        violations.push('inactive-card') 
    
    if(transaction.amount > user[0].account['available-limit']) // El importe de la transacción no debe superar el límite disponible: insufficient-limit
        violations.push('insufficient-limit'); 
        
    if (userTransaction.length > 3) { // No debe haber más de 3 transacciones en un intervalo de 2 minutos:
      
        const date = userTransaction[userTransaction.length -3].transaction.time 
        const date2 = transaction.time
        let diff =Math.abs(new Date(date2)-new Date(date));
     
        if(diff/60000 <= 2)
            violations.push('high-frequency-small-interval'); 
    }

    userTransaction.forEach(function(elemento, indice, array) { // No debe haber más de 1 transacción similar (mismo importe y comerciante) en un intervalo de 2 minutos

        if(elemento.transaction.merchant == transaction.merchant && elemento.transaction.amount == transaction.amount){

            const date = elemento.transaction.time 
            const date2 = transaction.time
            let diff =Math.abs(new Date(date2)-new Date(date));

            if(diff/60000 <= 2)
                violations.push('double-transaction'); 
        }
    })

    req.body.amount = transaction.amount;
    
    if (violations.length > 0) {
        return res.status(400).json({ 
            account: user[0].account,
            violations
        });
    }

    next();

}



// let date1 = new Date(transaction.time);
// let date1 = new Date(transaction.time);
// console.log('time stap', date.getTime())

// let datos1 =  date - 1657624560000
// console.log('diferencia', (datos1 /1000) / 60 );

module.exports = {
    accounts,
    transactions
}