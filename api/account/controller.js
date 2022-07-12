const { response } = require('express');
const store = require('../../store/dummy')


const newAccount = async(req, res = response) =>{

   const {name} = req.body;

   let datos = {
        name,
        account: {
            'active-card': true, 
            'available-limit': 100
        }
   }

    store.insert('user',datos);

    //console.log(data)
    //const data = await store.list('user');

    res.status(200).json({
        account: datos.account,
        violations: []
   })



}

module.exports = {newAccount};