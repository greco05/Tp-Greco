# Tp-Greco
test 1 2 3

 insert(){
        //Q? Quels sont les paramètres attendus par Rest.post ? des données à inserer et la table dans laquel l'inserer
        //Q? Que renvoi Rest.post ? la table + les params
        let table = this.constructor.name.toLowerCase();
        let fields = this.assign();
        return Rest.post(table,fields).done((resp)=>{
            let id = resp.tryJsonParse();
        })
    }

    update(){// TODO (plus tard) Faire un update seulement si une des propriétés de l'objet courant a changé
        //Q? Quels sont les paramètres attendus par Rest.put ?
        //Q? Que renvoi Rest.put ?
        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        delete this.id;
        let fields = this.toSql();
        return Rest.put(table,id,params).done((resp)=>{
            let resp = resp.tryJsonParse();
        })
    }

    delete(){
        //Q? Quels sont les paramètres attendus par Rest.delete ?
        //Q? Que renvoi Rest.delete ? 
        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        return Rest.delete(table,id).done((resp)=>{
            let resp = resp.tryJsonParse();
        })
        
    }

    static select(id){

    }
}