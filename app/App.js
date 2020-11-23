class App {

    static start() {

        App.loadClasses().done(() => {
            Utils.init();
            $(document).ready(() => {
                App.browse();
            });
        })

        window.onpopstate = () => {
            App.browse();
        }
        $('.nav-link').on('click', (evt) => {
            let btn = $(evt.target).closest('.navbar').find('.navbar-toggler').not('.collapsed');
            btn ? btn.click() : null;
        })
    }

    static browse() {
        console.clear();
        let hash = (window.location.hash || "#accueil").substring(1);
        App.test();
        //$('#main').hide().html(hash).fadeIn();
    }

    static classes = [
        "Utils", "Rest", "model/Model", "model/Product", "model/Category"
    ];
    static loadClasses() {
        let deferred = $.Deferred();
        let _classes = $.map(App.classes, (cl) => {//Chargement des classes mères
            App.getScript("app/" + cl + ".js");
        });
        $.when.apply($, _classes).then(() => {
            deferred.resolve()
        });
        return deferred.promise()
    }
    static getScript(scriptUrl) {
        let deferred = $.Deferred();
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.defer = true;
        script.onload = function(){
            deferred.resolve()
        };
        document.body.appendChild(script);
        return deferred.promise();
    }

    static test() {
        //Tests de Product
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
            $('#main').hide().html("test").fadeIn();
        })
        //Tests de Category
        Rest.get({
            table: "category",
            id: 1,
            active: 1, 
            // orderby: "title ASC"
        }).done((resp) => {
            let objJ = resp.tryJsonParse();
            console.log(objJ);
            for(let k of objJ){
                let listProd = new Category(k);
                console.log(listProd)
            }
            $('#main').hide().html("test").fadeIn();
        })

        // $('#main').hide().html("TEST").fadeIn();
    }

}