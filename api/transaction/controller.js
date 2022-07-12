const { response } = require('express');
const store = require('../../store/dummy');


const authorizeTransaction = async(req, res = response) =>{

       const {name, transaction, amount} = req.body;

       let datos = {
              name,
              transaction
       }

          store.insert('transaction',datos);

          const user = await store.update('user',name, amount);



         console.log(user)     



       res.status(200).json({
          account: user.account,
          violations: []
       })



}

module.exports = {authorizeTransaction};