class Model{

    assign(obj){//Permet la convertion des données récupérées depuis la base dans le bon type
        for(let k in obj){
            if(this[k] != undefined && typeof this[k] == 'number'){
                this[k] = Number(obj[k])
            }
            else if(this[k] != undefined && typeof this[k] == 'boolean'){
                this[k] = obj[k] == "1" ? true : false;
            }
            else{
                this[k] = obj[k]
            }
        }
    }

    insert(){
        
    }

    update(){
    //FIXME Attention à la mise à jour en DB d'un objet avec des valeurs inchangées
    //l'API renvoie false puisqu'aucune ligne n'est modifiée en DB

    }

    delete(){

    }

    static select(id){

    }

}