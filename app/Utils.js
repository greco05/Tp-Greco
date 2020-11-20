class Utils{

    static init(){

        String.prototype.tryJsonParse = function () {
            let value;
            try {
                value = JSON.parse(this);  
            }
            catch{console.log('erreur lors du JSON.parse : '+this)}
            return value;
        }

    }

}