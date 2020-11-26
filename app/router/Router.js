class Router {

    static start(route, id) {
        let page = "404";
        let data = []; //Pour stocker les objets necessaires aux select
        switch (route) {
            case "accueil":
                page = "accueil"
                break;

            case "product":
                page = id ? "product/" + id : "products";
                data.push({
                    table: "product",
                    id,
                })
                data.push({
                    table: "category"
                })
                break;

            case "category":
                page = id ? "category/" + id : "categories";
                data.push({
                    table: "category",
                    id,
                })
                data.push({
                    table: "product"
                })
                break;

            case "products":
                page = id ? "product" : "products";
                data.push({
                    table: "product",
                    id,
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
                })
                data.push({
                    table: "product"
                })
                break;
        }
        let requests = []
        let deferred = $.Deferred();
        let view;
        //TODO Requete pour récuperer la vue
        requests.push($.get('app/view/' + page + '.html').done((view) => {
            console.log(view)
        }))
        //TODO Requete pour les données (utiliser select)
        for (let item of data) {
            if (item.table == "product") {
                requests.push(Product.select(data[item]).done((resp) => {
                    console.log("Classe product OK : " + resp)
                }))
            }
            if (item.table == "category") {

                requests.push(Category.select(data[item]).done((resp) => {
                    console.log("Classe category OK : " + resp)
                }))
            }
        }

        //Synchronisation //3requests
        $.when.apply($, requests).then(() => {
            deferred.resolve(view)
        })
        return deferred.promise();


    }
}