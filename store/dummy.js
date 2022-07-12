const db = {
    'user': [
        
    ],
    'transaction': [
        
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
