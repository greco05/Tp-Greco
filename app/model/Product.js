class Product extends Model{

    constructor(obj) {
        super(obj);
        super.assign(obj);
        let bp;
        
    }

    id = 0;
    active = true;
    category_id = 0;
    title = "";
    description = "";
    price = 0;
    onsale = false;
    ord = 0;

    get category() {
        return Category.getOne(this.category_id)
    }
}