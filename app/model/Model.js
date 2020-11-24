class Model {

    assign(obj) {
        for (let k in obj) {
            if (this[k] != undefined && typeof this[k] == 'number') {
                this[k] = Number(obj[k])
            }
            if (this[k] != undefined && typeof this[k] == 'boolean') {//version loic test
                this[k] = obj[k] == ('1' || true) ? true : false;
            }
            // else if (this[k] != undefined && typeof this[k] == 'boolean') {
            //     this[k] = (obj[k] == ("1" || true)) ? true : false;
            // }
            else {
                this[k] = obj[k]
            }
        }
    }

    insert() {
        let table = this.constructor.name.toLowerCase();
        let fields = this.assign();
        return Rest.put(table, fields).done((resp) => {
            resp = resp.tryJsonParse();
        })
    }

    update() {// TODO (plus tard) Faire un update seulement si une des propriétés de l'objet courant a changé
        //Q? Quels sont les paramètres attendus par Rest.put ?
        //Q? Que renvoi Rest.put ?
        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        delete this.id;
        let fields = this.assign();
        return Rest.put(table, id, fields).done((resp) => {
            resp = resp.tryJsonParse();
        })
    }

    delete() {
        //Q? Quels sont les paramètres attendus par Rest.delete ?
        //Q? Que renvoi Rest.delete ? 
        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        return Rest.delete(table, id).done((resp) => {
            resp = resp.tryJsonParse();
        })

    }

    static select(id) {

    }
}