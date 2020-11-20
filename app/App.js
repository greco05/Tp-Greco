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
        /* TODO */
        return deferred.promise()
    }
    static getScript(scriptUrl) {
        let deferred = $.Deferred();
        /* TODO */
        return deferred.promise();
    }

    static test() {
        //Tests de Product
        /* TODO */
        //Tests de Category
        /* TODO */

        $('#main').hide().html("TEST").fadeIn();
    }

}