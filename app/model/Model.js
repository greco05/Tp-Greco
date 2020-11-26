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

    insert(){
        //Q? Quels sont les paramètres attendus par Rest.post ?
        let table = this.constructor.name.toLowerCase();
        let fields = this;
        let deferred = $.Deferred();
        Rest.post({table,fields}).done((resp)=>{
            //Q? Que renvoi Rest.post ?
            let json = resp.tryJsonParse();
            if(json){//isNumber
                fields.assign({id:json});//Attention à this !
                deferred.resolve(fields.id)
            }
            else{
                //TODO Afficher un message à l'utilisateur
                deferred.reject(resp)
            }
        }).fail((resp)=>{
            //TODO Afficher un message à l'utilisateur
            deferred.reject(resp)
        })
        return deferred.promise();
    }

    update(){// TODO Faire un update seulement si une des propriétés de l'objet courant a changé
        //Q? Quels sont les paramètres attendus par Rest.put ?
        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        let fields = this;
        let deferred = $.Deferred();
        Rest.put({table, id, fields}).done((resp)=>{
            //Q? Que renvoi Rest.put ?
            let json = resp.tryJsonParse();
            if(json){
                deferred.resolve(json)
            }
            else{
                //TODO Afficher un message à l'utilisateur
                deferred.reject(resp)
            }
        }).fail((resp)=>{
            //TODO Afficher un message à l'utilisateur
            deferred.reject(resp)
        })
        return deferred.promise();
    }

    delete(){
        //Q? Quels sont les paramètres attendus par Rest.delete ?
        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        let deferred = $.Deferred();
        Rest.delete({table, id}).done((resp)=>{
            //Q? Que renvoi Rest.delete ?
            let json = resp.tryJsonParse();
            if(json){
                deferred.resolve(json)
            }
            else{
                //TODO Afficher un message à l'utilisateur
                deferred.reject(resp)
            }
        }).fail((resp)=>{
            //TODO Afficher un message à l'utilisateur
            deferred.reject(resp)
        })
        return deferred.promise();
    }

    static list = [];
    static get selected(){
        let classe = this.prototype.constructor;//this
        return classe.list.length == 1 ? classe.list[0] : undefined;
    }
    static select(params = {}){
        //Q? Quels sont les paramètres attendus par Rest.get ?
        let table = this.prototype.constructor.name.toLowerCase();//this.name
        params.table = table;
        // let id = params.id
        // let where = params.where
        // let orderby = params.orderby
        let deferred = $.Deferred();
        let classe = this.prototype.constructor;//this
        classe.list = [];
        Rest.get(params).done((resp)=>{
            //Q? Que renvoi Rest.get ?
            let json = resp.tryJsonParse();
            if(json){
                for(let item of json){
                    let current = new classe(item)
                    classe.list.push(current)
                }
                deferred.resolve(classe.list)
            }
            else{
                //TODO Afficher un message à l'utilisateur
                deferred.reject(resp)
            }
        }).fail((resp)=>{
            //TODO Afficher un message à l'utilisateur
            deferred.reject(resp)
        })
        return deferred.promise();
    }

    static getOne(id){
        let classe = this
        return classe.list.filter(row => row.id == id)[0]
    }
    static getAll(){
        let classe = this
        return classe.list
    }
    

}