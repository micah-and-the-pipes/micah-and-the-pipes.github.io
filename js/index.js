Array.prototype.contains = function(item)
{
	return this.indexOf(item) > -1;
}

var snowboards;
var snowboardBrands;

var skis;
var skiBrands;

//document ready
$(document).ready(function() 
{
	snowboards = [];
	skis = [];
	snowboardBrands = [];
	skiBrands = [];

	//initialize parse
	Parse.initialize("dd7rGhZ4Q0cMpRkgfIUNpUvgv0YBWafY1005ZMtk", "XpMVZOnovduRxHelOPYvG8tfxNK3FvKk7xEaKAPD");

	//get the paragraphs from parse
	var HomepageContent = Parse.Object.extend("HomepageContent");

	//query
	var query = new Parse.Query(HomepageContent);
	query.find({
  	success: function(results) {
    	// Do something with the returned Parse.Object values
    	for (var i = 0; i < results.length; i++) {
      		var object = results[i];
      		var id = object.get('name');
      		var paragraph = object.get('text');

      		//set the value
      		$("#" + id).text(paragraph);
    	}
  	},
  	error: function(error) {
    	console.log("Error: " + error.code + " " + error.message);
  	}
	});

	//get the skis and snowboards
	getSkis();
	getSnowboards();
});

var gotPurchasableSkis = false;
var gotSkis = false;
var gotPurchasableSnowboards = false;
var gotSnowboards = false;
var addStuff = function()
{
	if(gotPurchasableSnowboards && gotSnowboards && gotPurchasableSkis && gotSkis)
	{
		addSkis();
		addSnowboards();
	}

	//called when a brand is clicked
	$(".skiBrandSelector").click(function(){
		console.log($(event.target).text());
		var brand = $(event.target).text();
		$("#skis").empty();

		var thisBrand = [];
		var usedModels = [];
		for(var i = 0; i < skis.length; i++)
		{
			if(skis[i].brand == brand && !usedModels.contains(skis[i].name))
			{
				thisBrand.push(skis[i]);
				usedModels.push(skis[i].name);
			}
		}

		var md = getColMdNum(thisBrand);

		for(var i = 0; i < thisBrand.length; i++)
		{
			//$("#skis").append("<img class=\"col-md-"+md+"\" src=\""+thisBrand[i].image+"\" alt=\""+thisBrand[i].name+"\"></img>");
			$("#skis").append(""
            +"<div class=\"col-sm-4 col-lg-4 col-md-4\">"
                        +"<div class=\"thumbnail\">"
                            +"<img src=\""+thisBrand[i].image+"\" alt=\"\">"
                            +"<div class=\"caption\">"
                                +"<h4>"+thisBrand[i].name+"</h4>"
                            +"</div>"
                        +"</div>"
                    +"</div>");
		}
	});

	//called when a brand is clicked
	$(".snowboardBrandSelector").click(function(){
		console.log($(event.target).text());
		var brand = $(event.target).text();
		$("#snowboards").empty();

		var thisBrand = [];
		var usedModels = [];
		for(var i = 0; i < snowboards.length; i++)
		{
			if(snowboards[i].brand == brand && !usedModels.contains(snowboards[i].name))
			{
				thisBrand.push(snowboards[i]);
				usedModels.push(snowboards[i].name);
			}
		}

		var md = getColMdNum(thisBrand);

		for(var i = 0; i < thisBrand.length; i++)
		{
			//$("#snowboards").append("<img class=\"col-md-"+md+"\" src=\""+thisBrand[i].image+"\" alt=\""+thisBrand[i].name+"\"></img>");
			$("#snowboards").append(""
            +"<div class=\"col-sm-4 col-lg-4 col-md-4\">"
                        +"<div class=\"thumbnail\">"
                            +"<img src=\""+thisBrand[i].image+"\" alt=\"\">"
                            +"<div class=\"caption\">"
                                +"<h4>"+thisBrand[i].name+"</h4>"
                            +"</div>"
                        +"</div>"
                    +"</div>");
		}
	});
}

var getColMdNum = function(array)
{
	if(12 / array.length > 3)
	{
		return 12 / array.length;
	}
	else
	{
		return 3;
	}
}

var addSkis = function()
{
	//get how big each element should be
	var mdNum = getColMdNum(skiBrands);

	for(var i = 0; i < skiBrands.length; i++)
	{
		$("#skiBrands").append("<h3 class=\"brandSelector col-md-"+mdNum+" skiBrandSelector\">"+skiBrands[i]+"</h3>");
	}

}

var addSnowboards = function()
{
	var mdNum = getColMdNum(snowboardBrands);

	for(var i = 0; i < snowboardBrands.length; i++)
	{
		$("#snowboardBrands").append("<h3 class=\"brandSelector col-md-"+mdNum+" snowboardBrandSelector\">"+snowboardBrands[i]+"</h3>");
	}
}

var getSkis = function()
{
	//purchasable
	var PurchasableStoreItem = Parse.Object.extend("PurchasableStoreItem");
	var query = new Parse.Query(PurchasableStoreItem);

	query.equalTo("type", "ski");
	query.find({
  	success: function(results) {
  		console.log(results.length);
    	// Do something with the returned Parse.Object values
    	for (var i = 0; i < results.length; i++) {
      		var object = results[i];

      		var image = object.get("image");
      		var imageURL = image.url();

      		var skiObject = {name: object.get("name"), brand: object.get("brand"), image: imageURL};
      		skis.push(skiObject);

      		var brand = object.get("brand");

      		if(!skiBrands.contains(brand))
      		{
      			skiBrands.push(brand);
      		}
    	}
    	gotPurchasableSkis = true;
    	addStuff();
  	},
  	error: function(error) {
    	console.log("Error: " + error.code + " " + error.message);
  	}
	});

	var StoreItem = Parse.Object.extend("StoreItem");
	query = new Parse.Query(StoreItem);

	query.equalTo("type", "ski");
	query.find({
  	success: function(results) {
  		console.log(results.length);
    	// Do something with the returned Parse.Object values
    	for (var i = 0; i < results.length; i++) {
      		var object = results[i];

      		var image = object.get("image");
      		var imageURL = image.url();

      		var skiObject = {name: object.get("name"), brand: object.get("brand"), image: imageURL};
      		skis.push(skiObject);

      		var brand = object.get("brand");

      		if(!skiBrands.contains(brand))
      		{
      			skiBrands.push(brand);
      		}
    	}

		gotSkis = true;
		addStuff();
  	},
  	error: function(error) {
    	console.log("Error: " + error.code + " " + error.message);
  	}
	});
}

var getSnowboards = function()
{
	//purchasable
	var PurchasableStoreItem = Parse.Object.extend("PurchasableStoreItem");
	var query = new Parse.Query(PurchasableStoreItem);

	query.equalTo("type", "snowboard");
	query.find({
  	success: function(results) {
  		console.log(results.length);
    	// Do something with the returned Parse.Object values
    	for (var i = 0; i < results.length; i++) {
      		var object = results[i];

      		var image = object.get("image");
      		var imageURL = image.url();

      		var snowboardObject = {name: object.get("name"), brand: object.get("brand"), image: imageURL};
      		snowboards.push(snowboardObject);

      		var brand = object.get("brand");

      		if(!snowboardBrands.contains(brand))
      		{
      			snowboardBrands.push(brand);
      		}
    	}
    	gotPurchasableSnowboards = true;
    	addStuff();
  	},
  	error: function(error) {
    	console.log("Error: " + error.code + " " + error.message);
  	}
	});

	var StoreItem = Parse.Object.extend("StoreItem");
	query = new Parse.Query(StoreItem);

	query.equalTo("type", "snowboard");
	query.find({
  	success: function(results) {
  		console.log(results.length);
    	// Do something with the returned Parse.Object values
    	for (var i = 0; i < results.length; i++) {
      		var object = results[i];

      		var image = object.get("image");
      		var imageURL = image.url();

      		var snowboardObject = {name: object.get("name"), brand: object.get("brand"), image: imageURL};
      		snowboards.push(snowboardObject);

      		var brand = object.get("brand");

      		if(!snowboardBrands.contains(brand))
      		{
      			snowboardBrands.push(brand);
      		}
    	}
    	gotSnowboards = true;
    	addStuff();
  	},
  	error: function(error) {
    	console.log("Error: " + error.code + " " + error.message);
  	}
	});
}
