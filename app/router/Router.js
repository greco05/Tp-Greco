class Router {

    static start(route, id) {
        let page = "404";
        let data = []; //Pour stocker les objets necessaires aux select
        switch (route) {
            case "accueil":
                page = "accueil"
                break;

            // case "product":
            //     page = id ? "product" : "products";
            //     data.push({
            //         table: "product",
            //         id,
            //     })
            //     data.push({
            //         table: "category"
            //     })
            //     break;

            // case "category":
            //     page = id ? "category" : "categories";
            //     data.push({
            //         table: "category",
            //         id,
            //     })
            //     data.push({
            //         table: "product"
            //     })
            //     break;

            case "products":
                page = id ? "product" : "products";
                data.push({
                    table: "product",
                    id,
                    orderby: "title ASC"
                })
                data.push({
                    table: "category"
                })
                break;

            case "categories":
                page = id ? "category" : "categories";
                data.push({
                    table: "category",
                    id,
                    orderby:"title ASC"
                })
                data.push({
                    table: "product"
                })
                break;
        }
        let requests = []
        let deferred = $.Deferred();
        let view; // products, categories
        //TODO Requete pour récuperer la vue
        requests.push($.get('app/view/' + page + '.html').done((resp) => {
            console.log(resp)
            view = $(resp);
        }))
        //TODO Requete pour les données (utiliser select)
        for (let item of data) {

            // correction 
            console.log(item)
            let classe = item.table.getClasse();
            requests.push(classe.select(item))

            // if (item.table == "product") {
                
            //     requests.push(Product.select(data[item]).done((resp) => {
            //         console.log("Classe product OK : ")
            //         products = new Product(resp)
            //         console.log(products)
            //     }))
            // }
            // if (item.table == "category") {

            //     requests.push(Category.select(data[item]).done((resp) => {
            //         console.log("Classe category OK : ")
            //         categories = new Category(resp)
            //         console.log(categories)
            //     }))
            // }
        }

        //Synchronisation //3requests
        $.when.apply($, requests).then(() => {
            deferred.resolve(view)
        })
        return deferred.promise();


    }
}