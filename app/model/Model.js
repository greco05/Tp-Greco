class Model {

    assign(obj) {
        for (let k in obj) {
            if (this[k] != undefined && typeof this[k] == 'number') {
                this[k] = Number(obj[k])
            }
            else if (this[k] != undefined && typeof this[k] == 'boolean') {
                this[k] = (obj[k] == ("1" || true)) ? true : false;
            }
            else {
                this[k] = obj[k]
            }
        }
    }

    insert() {
        let table = this.constructor.name.toLowerCase();
        let fields = this;
        let deferred = $.Deferred();
        Rest.insert(table, fields).done((resp) => {
            let json = resp.tryJsonParse();
            if (json) {
                params.assign({ id: json });
                deferred.resolve(json);
            }
            else {
                deferred.reject(resp);
            }
        }).fail(() => {
            deferred.reject(resp);
        })
        return deferred.promise();
    }

    update() {// TODO (plus tard) Faire un update seulement si une des propriétés de l'objet courant a changé
        //Q? Quels sont les paramètres attendus par Rest.put ?
        //Q? Que renvoi Rest.put ?
        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        delete this.id;
        let fields = this.toSql();
        return Rest.put(table, id, params).done((resp) => {
            let resp = resp.tryJsonParse();
        })
    }

    delete() {
        //Q? Quels sont les paramètres attendus par Rest.delete ?
        //Q? Que renvoi Rest.delete ? 
        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        return Rest.delete(table, id).done((resp) => {
            let resp = resp.tryJsonParse();
        })

    }

    static select(id) {

    }
}