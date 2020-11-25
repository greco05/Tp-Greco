class Utils{

    static init(){
        String.prototype.tryJsonParse = function () {
            let value;
            try {
                value = JSON.parse(this)
            } catch {
                console.log("tryJsonParse fail", this)
            }
            return value;
        }

        String.prototype.capitalize = function () {//TODO
            //première lettre en majuscule
            return //...
        }
        
        String.prototype.tryEval = function (context) {//TODO
            let value;
            //evaluation d'une chaine avec eval
            return value;
        }

        String.prototype.getClasse = function () {//Pour convertir un nom de table (string) en classe js
            return this.capitalize().tryEval();
        }
    }

}