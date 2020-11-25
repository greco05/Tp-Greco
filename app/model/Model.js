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

    convBool(){
        for(let k in this){
            if(this[k] != undefined && typeof this[k] == 'boolean'){
                this[k] = this[k] == true ? "1" : "0";
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

    update() {
        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        let fields = this;
        let deferred = $.Deferred();
        Rest.put({table, id, fields}).done((resp) => {
            let json = resp.tryJsonParse()
            if(json){
                deferred.resolve(resp);
            }
            else{
                deferred.reject(resp);
            }
        }).fail((resp) => {
            deferred.reject(resp);
        })
        return deferred.promise();
        
    }

    delete() {
        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        let deferred = $.Deferred();
        Rest.delete({id, table}).done((resp) => {
            let json = resp.tryJsonParse()
            if(json){
                deferred.resolve(resp)
            }
            else{
                deferred.reject()
            }
        }).fail((resp)=> {
            deferred.reject(resp)
        })
        return deferred.promise()


    }

    static select(params = {}) {
        let classe = this;
        let table = classe.name.toLowerCase()
        params.table = table
        classe.list = [];
        let deferred = $.Deferred();
        Rest.get(params).done((resp) => {
            let json = resp.tryJsonParse()
            if(json){
                for(let item of json){
                    let current = new classe(item)
                    classe.list.push(current)
                }
            deferred.resolve(classe.list)
            }
            else{
                deferred.reject(resp);
            }
        }).fail((resp) => {
            deferred.reject(resp);
        })
        return deferred.promise();
        
        
    }
}