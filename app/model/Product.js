class Product {

    constructor(obj) {
        for(let k in obj){
            if (this[k] != undefined && typeof this[k] == "boolean"){ //this[k] == "active" || this[k] == "onsale" || 
                this[k] = obj[k] == "1" ? true : false;
            }
            else if (this[k] != undefined && typeof this[k] == "number"){
                this[k] = Number(obj[k]);
            }           
            else{
                this[k] = obj[k];
            }
        }


    }

    id = 0;
    active = true;
    category_id = 0;
    title = "";
    description = "";
    price = 0;
    onsale = false;
    ord = 0;

}