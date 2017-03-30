let stringOpe = {

    // Samples for string formater
    // let str = "She {1} {0}{2} by the {0}{3}. {-1}^_^{-2}";
    // let str1 = format(str, ["sea", "sells", "shells", "shore"]);
    // console.log(str1);
    format: function (str, args){
        let regex = new RegExp('{-?[0-9]+}', 'g');

        return str.replace(regex, function (item){
            let intVal = parseInt(item.substring(1, item.length - 1));
            let replace;
            if (intVal >= 0) {
                replace = args[intVal];
            } else if (intVal === -1) {
                replace = '{';
            } else if (intVal === -2) {
                replace = '}';
            } else {
                replace = '';
            }
            return replace;
        });
    }
};

module.exports = stringOpe;
