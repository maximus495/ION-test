const db = {
    'user': [
        { name: 'Carlos', account: {'active-card': true, 'available-limit': 100} }
    ],
    'transaction': [
        { name: 'Carlos', transaction: {merchant: "Burger King", amount: 20, time: "2022-07-12T09:50:00.000Z"} }
    ],

};

async function list(tabla) {
    return db[tabla] || [];
}

async function get(tabla, id) {
    let col = await list(tabla);
    return col.filter(item => item.id === id)[0] || null;
}

async function insert(tabla, data) {
    if (!db[tabla]) {
        db[tabla] = [];
    }

    db[tabla].push(data);
}

async function update(tabla, id, amount) {

    const index = db[tabla].findIndex((element, index) => {
        if (element.name === id) {
            return true;
        }
      });

      db[tabla][index].account['available-limit'] -= amount;
      let data = db[tabla][index]
      return data;
}

async function query(tabla, q) {
    let col = await list(tabla);    
    return col.filter(item => item.name === q) || null;
}

module.exports = {
    list,
    get,
    insert,
    update,
    query,
};
