class Model{

    assign(obj){
        for(let k in obj){
            if(this[k] != undefined && typeof this[k] == 'number'){
                this[k] = Number(obj[k])
            }
            else if(this[k] != undefined && typeof this[k] == 'boolean'){
                this[k] = (obj[k] == ("1" || true)) ? true : false;
            }
            else{
                this[k] = obj[k]
            }
        }
    }

    toSql(){
        let sqlItem = this.clone()
        for(let k in this){
            if(this[k] != undefined && typeof this[k] == 'boolean'){
                sqlItem[k] = sqlItem[k] == true ? "1" : "0";
            }
        }
        return sqlItem
    }

    clone(){
        let classe = this.constructor;
        return new classe(this)
    }

    insert(){
        //Q? Quels sont les paramètres attendus par Rest.post ? des données à inserer et la table dans laquel l'inserer
        //Q? Que renvoi Rest.post ? la table + les params
        let table = this.constructor.name.toLowerCase();
        let fields = this.toSql();
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
            let result = resp.tryJsonParse();
        })
    }

    delete(){
        //Q? Quels sont les paramètres attendus par Rest.delete ?
        //Q? Que renvoi Rest.delete ?
        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        return Rest.put(table,id).done((resp)=>{
            let result = resp.tryJsonParse();
        })
        
    }

    static select(id){

    }

}