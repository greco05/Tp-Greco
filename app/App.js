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
        //Router
        let hashParts = hash.split('/')
        let route = hashParts[0];
        let id = hashParts[1];
        // //TODO Methode 1 avec php
        // $.post("app/router/", {route, id}).done((resp)=>{
        //     //resp contiendra la view et les models au format json qu'il faudra par la suite convertir
        //     $('#main').hide().html(view).fadeIn('fast');
        // })
        //TODO Methode 2 avec js
        Router.start(route, id).done(view => {
            //le router js renvoi juste la vue, les models sont déjà remplis
            $('#main').hide().html(view).fadeIn('fast');
        })
        console.log()
        
    }

    static classes = [
        "Utils", "Rest", "model/Model", "router/Router"
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
        
    }

}