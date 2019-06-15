//document ready
$(document).ready(function() 
{
    console.log( "ready!" );

    //initialize parse
    Parse.initialize("dd7rGhZ4Q0cMpRkgfIUNpUvgv0YBWafY1005ZMtk", "XpMVZOnovduRxHelOPYvG8tfxNK3FvKk7xEaKAPD");

    //load in the purchasable items
  var PurchasableStoreItem = Parse.Object.extend("PurchasableStoreItem");
    var query = new Parse.Query(PurchasableStoreItem);
    query.find({
    success: function(results) 
    {
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) 
      {
          var object = results[i];

          //values
          var name = object.get('name');
          var price = object.get('price');
          var info = object.get('info');
          var brand = object.get('brand');
          var size = object.get('size');
          var paypalButton = object.get('paypalButton');

          var sizeAndBrandElement = ""

          if(brand && brand.length > 0 && size && size.length > 0)
          {
            sizeAndBrandElement = "<p>" + brand + ": " + size + "</p>";
          }

          //paypalButton
          if(!paypalButton)
          {
            paypalButton = "";
          }

          //image
          var image = object.get("image");
          var imageURL = image.url();

          $("#items").append(""
            +"<div class=\"col-sm-4 col-lg-4 col-md-4\">"
                        +"<div class=\"thumbnail\">"
                            +"<img src=\""+imageURL+"\" alt=\"\">"
                            +"<div class=\"caption\">"
                                +"<h4>$"+price+"</h4>"
                                +"<h4 id=\"itemName\">"+name+"</h4>"
                                +"<div class=\"pull-right\">"+paypalButton+"</div>"
                                +"<p>"+info+"</p>"
                                +sizeAndBrandElement
                            +"</div>"
                        +"</div>"
                    +"</div>");
      }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
    });

    var StoreItem = Parse.Object.extend("StoreItem");
	  var query = new Parse.Query(StoreItem);
	  query.find({
  	success: function(results) 
  	{
    	// Do something with the returned Parse.Object values
    	for (var i = 0; i < results.length; i++) 
    	{
      		var object = results[i];

      		//values
      		var name = object.get('name');
      		var price = object.get('price');
      		var info = object.get('info');
          var brand = object.get('brand');
          var size = object.get('size');

          var sizeAndBrandElement = ""

          if(brand && brand.length > 0 && size && size.length > 0)
          {
            sizeAndBrandElement = "<p>" + brand + ": " + size + "</p>";
          }

      		//image
      		var image = object.get("image");
      		var imageURL = image.url();

      		$("#items").append(""
            +"<div class=\"col-sm-4 col-lg-4 col-md-4\">"
                        +"<div class=\"thumbnail\">"
                            +"<img src=\""+imageURL+"\" alt=\"\">"
                            +"<div class=\"caption\">"
                                +"<h4>$"+price+"</h4>"
                                +"<h4 id=\"itemName\">"+name+"</h4>"
                                +"<p>"+info+"</p>"
                                +sizeAndBrandElement
                            +"</div>"
                        +"</div>"
                    +"</div>");
    	}
  	},
  	error: function(error) {
    	console.log("Error: " + error.code + " " + error.message);
  	}
	  });

  //category stuff

  //type selection
  var selection = "";

  //refresh the items selection
  var refreshItems = function(itemType)
  {
    //empty the items div
    $("#items").empty();

    //add back in items of type selection
    if(selection != "")
    {
        var StoreItem = Parse.Object.extend("StoreItem");
    var query = new Parse.Query(StoreItem);
    query.equalTo("type", selection);
    query.find({
    success: function(results) 
    {
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) 
      {
          var object = results[i];

          //values
          var name = object.get('name');
          var price = object.get('price');
          var info = object.get('info');
          var brand = object.get('brand');
          var size = object.get('size');

          var sizeAndBrandElement = ""

          if(brand && brand.length > 0 && size && size.length > 0)
          {
            console.log("brand");
            sizeAndBrandElement = "<p>" + brand + ": " + size + "</p>";
          }

          //image
          var image = object.get("image");
          var imageURL = image.url();

          $("#items").append(""
            +"<div class=\"col-sm-4 col-lg-4 col-md-4\">"
                        +"<div class=\"thumbnail\">"
                            +"<img src=\""+imageURL+"\" alt=\"\">"
                            +"<div class=\"caption\">"
                                +"<h4>$"+price+"</h4>"
                                +"<h4 id=\"itemName\">"+name+"</h4>"
                                +"<p>"+info+"</p>"
                                +sizeAndBrandElement
                            +"</div>"
                        +"</div>"
                    +"</div>");
      }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
    });
    }
  }

  $("#skiscategory").click(function(){
    console.log("skis");
    selection = "ski";
    refreshItems(selection);
  });

  $("#snowboardscategory").click(function(){
    console.log("snowboards");
    selection = "snowboard";
    refreshItems(selection);
  });

  $("#bindingscategory").click(function(){
    console.log("bindings");
    selection = "bindings";
    refreshItems(selection);
  });

  $("#bootscategory").click(function(){
    console.log("boots");
    selection = "boots";
    refreshItems(selection);
  });

  $("#accessoriescategory").click(function(){
    console.log("accessories");
    selection = "accessories";
    refreshItems(selection);
  });

  $("#othercategory").click(function(){
    console.log("other");
    selection = "other";
    refreshItems(selection);
  });

  $("#purchasableStoreItemCategory").click(function(){
    //empty the items div
    $("#items").empty();

    //load all items from the purchasablestoreitem class
    var PurchasableStoreItem = Parse.Object.extend("PurchasableStoreItem");
    var query = new Parse.Query(PurchasableStoreItem);
    query.find({
    success: function(results) 
    {
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) 
      {
          var object = results[i];

          //values
          var name = object.get('name');
          var price = object.get('price');
          var info = object.get('info');
          var brand = object.get('brand');
          var size = object.get('size');
          var paypalButton = object.get('paypalButton');

          var sizeAndBrandElement = ""

          if(brand && brand.length > 0 && size && size.length > 0)
          {
            sizeAndBrandElement = "<p>" + brand + ": " + size + "</p>";
          }

          //paypalButton
          if(!paypalButton)
          {
            paypalButton = "";
          }

          //image
          var image = object.get("image");
          var imageURL = image.url();

          $("#items").append(""
            +"<div class=\"col-sm-4 col-lg-4 col-md-4\">"
                        +"<div class=\"thumbnail\">"
                            +"<img src=\""+imageURL+"\" alt=\"\">"
                            +"<div class=\"caption\">"
                                +"<h4>$"+price+"</h4>"
                                +"<h4 id=\"itemName\">"+name+"</h4>"
                                +"<div class=\"pull-right\">"+paypalButton+"</div>"
                                +"<p>"+info+"</p>"
                                +sizeAndBrandElement
                            +"</div>"
                        +"</div>"
                    +"</div>");
      }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
    });
  });
});



