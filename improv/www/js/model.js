// RealTimeModel -- client side:
function RTWModel(id){
    this._id = id;
    this._ws;
    this._wsHost;
    this._map = new Key2ElementMap(id);
      
    /**
      Scan DOM for elements with 'data-rtw' attributes and add to live 'Widget' map 
    **/  
    this.init = function (uri) {
        console.log('Model.init');
        this.connect();
 
        // get list of real-time data elements :)
        var d = $('[data-rtw]'); // get vanilla JS array of elements
        for(var x = 0; x < d.length; x++){
            var val = $(d[x]);
            var key = val.data('rtw');           
            this._map.add(key,val);
            val.text('?');
            //console.log('RTD_DATA = ' + key);   
        }
    };
    
    /**
      Connect to webSocket server
    **/
    this.connect = function(){
        // CONSTRUCT WebSocket URI from current location      
        this._wsHost = 'ws://' + location.hostname + (location.port ? ':' + location.port: '');
        try{
        	this._ws = new WebSocket(this._wsHost);
        	this._ws.onmessage = function (event) {
            	//this.update(JSON.parse(event.data));
            	this.onmessage = updateStats(JSON.parse(event.data));
            	};
        	this._ws.onerror = function(event){
            	console.debug('_ws.onerror');
            	console.debug(event);
            	};            
        }
        catch(e){
            console.log("Error caught on WebSocket creation:");
        	console.debug(e);
        }
    };
    
    // Hi from Model :)
    this.hi = function(){
        alert("Hi from model._wsHost = " + this._wsHost);            
    };  	

    /**
      Update key/value pair
    **/
    RTWModel.prototype.update = function (key, val) {
       console.debug("model.update( " + key + ", " + val + ") @ " + Date()); 
       this._map.updateKey(key,val);      
    };
}
// ENDOF RTWModel


