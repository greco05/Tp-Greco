class Product {

    constructor(obj) {
        for(let k in obj){
            if (this[k] == "active" || this[k] == "onsale" || typeof this[k] == "boolean"){
                this[k] = obj[k] == "1" ? true : false;
            }
            else if (typeof this[k] == "number"){
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