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
        "Utils", "Rest", "model/Model"
    ];
    static extends = [
        "model/Product", "model/Category"
    ];

    static loadClasses() {
        let deferred = $.Deferred();
        let _classes = $.map(App.classes, (cl) => {
            return App.getScript("app/" + cl + ".js");
        });
        $.when.apply($, _classes).then(() => {
            let _extends = $.map(App.extends, (cl) => {
                return App.getScript("app/" + cl + ".js");
            });
            $.when.apply($, _extends).then(() => {
                deferred.resolve()
            });
        });
        return deferred.promise()
    }

    static getScript(scriptUrl) {
        let deferred = $.Deferred();
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.defer = true;
        script.onload = function () {
            deferred.resolve()
        };
        document.body.appendChild(script);
        return deferred.promise();
    }

    static test() {
        
        // let product = new Product();
        // product.insert().done((resp) =>{
        //     console.log(resp)
        //     product.title = "TEST"
        //     product.update().done((resp)=>{
        //         console.log(resp)
        //     })
        // }).fail((resp) =>{
        //     console.log(resp)
        // })
        
        // let product = new Product({id:101});
        // product.delete().done((resp) => {
        //     console.log(resp);
        // }).fail((resp) => {
        //     console.log(resp)
        // })


        // let category = new Category();
        // console.log(category)
        // TODO Step 5

        Product.select({where:"active=true",}).done((resp) => {
            console.log(resp);
        }).fail((resp)=> {
            console.log(resp);
        })
        
        $('#main').hide().html("TEST").fadeIn();
    }
}