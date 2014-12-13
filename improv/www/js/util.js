// server Hash Map of Key => Connections:
/*
function myConstructor(value){
this.property=value;
this.method=function(){alert(this.property)}
}
var myObject=new myConstructor('somevalue');
*/

// CLIENT KEY => ELEMENT MAP THAT (DE)MULTIPLEXES WEBSOCKET MESSAGES:
function Key2ElementMap(id){
    this._id = id;
    this._data = {};
    
    this.add = function(key, ele){
        var k = key.toString();
        if(this._data.hasOwnProperty(k) == false){
            // IF THIS KEY DOES NOT EXIST, CREATE AN ARRAY OF FOR IT
            this._data[key.toString()] = [];	
        }
        // TODO: ADD UPDATABLE INTERFACE TO 'LIVE' ELEMENT
        this._data[k].push(ele);
    };
    
    // RETURNS ARRAY OF ELEMENT(S) WITH MATCHING KEY, ELSE UNDEFINED
    this.getElements = function(key){       
        return this._data[key.toString()];
    };
    
    // RETURNS ALL KEYS OF THIS MAP (props of _data member):
    this.getKeys = function(){        
        return Object.keys(this._data);
    };
       
    // DELETE KEY IF IT'S DEFINED & RETURN IT"S VALUE, ELSE RETURN UNDEFINED    
    this.delKey = function(key){
        var val, k = key.toString();
        // IF KEY EXISTS RETURN IT'S VALUE
        if(this._data[k] != undefined){
            val = this._data[k];
            delete this._data[k];
        }
        return val;    
    };
    
    this.delAll = function(){
        this._data = {};
    };
    
    this.updateKey = function(key, val){
        ele = this.getElements(key);
        for(var x = 0; x < ele.length; x++){
            ele[x].text(val);
        }        
    };        
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
var m = Array(10);

m[0] = new Key2ElementMap('kate');
m[0].add('a000','123');
m[0].add('a000', '456');
m[0].add('a001', '789');


for(var x = 0; x < 1000; x++){
    m[0].add('K' + x, 'D'+ x);
}

for(var x = 0; x < 1000; x++){
    m[0].add('K' + x, 'D'+ x);
}

for(var x = 0; x < 1000; x++){
    m[0].add('K' + x, 'D'+ x);
}

var k = m[0].getKeys();
console.debug(k);
m[0].delKey('a001');
console.debug(k);
k = m[0].getKeys();
console.debug(k);
*/

/*

*/
function json2HtmlTable(obj, table_class){       
    if(obj instanceof Array) {
        var row_count = obj.length;
        if(row_count){
            // CHECK IF 1st ARRAY ELEMENT IS AN OBJECT:
            if(obj[0] instanceof Object){
                // GENERATE TABLE HEADER BASED ON 1st OBJECT PROPERTY NAMES
                var html = [];
                var fields = Object.keys(obj[0]);   
                table_class = table_class || 'basic_table';
                html.push('<table class = "' + table_class + '">');
                // GENERATE DEFAULT TABLE HEADER WITH OBJECT KEYS
                html.push('<tr>');
                for(var x = 0; x < fields.length; x++){
                    html.push('<td>' + fields[x] + '</td>');
                }                  
                html.push('</tr>');
                // GENERATE TABLE BODY ROWS:
                for(var r = 0; r < row_count; r++){
                    html.push('<tr>');
                    for(var f = 0; f < fields.length; f++){
                        html.push('<td>' + obj[r][fields[f]] + '</td>') ;                    
                    }
                    html.push('</tr>');
                }
                html.push('</table>');
                return html.join("\n");                          
            }                     
        }
    }
} 
