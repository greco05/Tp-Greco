class Utils {

    static init() {
        String.prototype.tryJsonParse = function () {
            let value;
            try {
                value = JSON.parse(this)
            } catch {
                console.log("tryJsonParse fail", this)
            }
            return value;
        }

        //correction
        String.prototype.tryEval = function (context) {
            let value;
            let expr = this;
            if(context){
                expr = "context." + expr
            }
            try {
                value = eval(expr)
            } catch {
                console.log("tryEval Error", this)
            }
            return value;
        }
        
        // String.prototype.tryEval = function (context) {//TODO
        //     let value;
        //     try {
        //         value = eval(context);
        //     } catch {
        //         console.log("tryEval Error", this);
        //     }
        //     return value;
        // }


        String.prototype.capitalize = function () {//TODO
            return this.charAt(0).toUpperCase() + this.slice(1)
        }

        

        String.prototype.getClasse = function () {//Pour convertir un nom de table (string) en classe js
            return this.capitalize().tryEval();
        }
    }
}