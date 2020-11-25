class Router{

    static start(route, id){
        let page = "404";
        let data = []; //Pour stocker les objets necessaires aux select
        switch (route) {
            case "accueil":
                break;
            
            case "product":
            
            data.push({
                table:"product",
                id,
            })
            data.push({
                table:"category"
            })
                break;

            case "category":

            data.push({
                table:"category",
                id,
            })
            data.push({
                table:"product"
            })
                break;
            
            case "products":
            
            data.push({
                table:"product",
                id,
            })
            data.push({
                table:"category"
            })
                break;

            case "categorys":

            data.push({
                table:"category",
                id,
            })
            data.push({
                table:"product"
            })
                break;
                }
        let requests = []
        let deferred = $.Deferred();
        let view;
        //TODO Requete pour récuperer la vue
        requests.push($.get('app/view/' + view +'.html').done((view) => {
            console.log(view)
        }))
        //TODO Requete pour les données (utiliser select)
        for(let item in data){
            console.log(data[item].table)
            let test = new Product(data[item])
            console.log(test)
            // requests.push(Product.select(test).done((resp) =>{
            //     console.log("coucou")
            // }))
        }
        //Synchronisation //3requests
        $.when.apply($, requests).then(()=>{
            deferred.resolve(view)
        })
        return deferred.promise();
    }

}