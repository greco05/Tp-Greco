//App.start();

//Test API Rest

// Rest.get({
//     table: "product",
//     id: 6,
//     active: 1, 
//     orderby: "title ASC"
// }).done((resp) => {
//     $('#main').hide().html(resp).fadeIn();
// })

// Rest.post({
//     table: "product",
//     fields: {
//         active: 1,       
//         // category_id:1,
//         title: "titre du produit",
//         description: "",
//         // price:10.10,
//         // onsale: 0,
//         // ord:5,
//     }
// }).done((resp) => {
//     $('#main').hide().html(resp).fadeIn();
// })

// Rest.put({
//     table: "product",
//     id: 5,
//     fields: {
//         //id : 2,
//         title: "nouveau titre 2"         
//     }
// }).done((resp) => {
//     $('#main').hide().html(resp).fadeIn();
// })

// Rest.delete({
//     table: "product",
//     id: 4
// }).done((resp) => {
//     $('#main').hide().html(resp).fadeIn();
// })

Utils.init()
//Test convertion en json
Rest.get({
    table: "product",
    id: 6,
    active: 1, 
    // orderby: "title ASC"
}).done((resp) => {
    let objJ = resp.tryJsonParse();
    console.log(objJ);
    for(let k of objJ){
        let listProd = new Product(k);
        console.log(listProd)
    }
    $('#main').hide().html(resp).fadeIn();
})

