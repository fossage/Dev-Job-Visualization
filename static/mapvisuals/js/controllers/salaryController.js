app.controller('salaryController', function(){
	console.log('here');
	d3.json("/salarydata", function(salaryData){
		var results = salaryData
		console.log(results);
		var languages = {
	      "javascript": 0,
	      "python": 0,
	      "php": 0,
	      "ruby": 0
	    }

	    for (var i = 0; i < results.length; i++){
	      var js = results[i].fields.skills.search(/javascript/i);
	      if(js != -1){
	        languages["javascript"] ++;
	      }
	      var py = results[i].fields.skills.search(/python/i);
	      if(py != -1){
	        languages["python"] ++;
	      }
	      var php = results[i].fields.skills.search(/php/i);
	      if(php != -1){
	        languages["php"] ++;
	      }
	      var ruby = results[i].fields.skills.search(/ruby/i);
	      if(ruby != -1){
	        languages["ruby"] ++;
	      }

	    }
	  var total = languages.javascript + languages.python + languages.php + languages.ruby;


	    console.log(languages);
	    console.log("total language hits: " + total);

	  var chart = c3.generate({
	    bindto: '#chart',
	    data: {
	        // iris data from R
	        columns: [
	            ["javascript", languages.javascript],
	            ["python", languages.python],
	            ["php", languages.php],
	            ["ruby", languages.ruby]
	        ],
	        type : 'pie',
	        onclick: function (d, i) { console.log("onclick", d, i); },
	        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
	        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
	    }
	});
	var avNum;
	var totalNum = 0;
	var minNum = 0;
	var maxNum = 0;
	var countNum = 0;

	for (var n = 0; n < results.length; n++){
	  if(results[n].fields.salary > 0){
	    console.log(results[n].fields.salary)
	    if(minNum == 0){
	      minNum = results[n].fields.salary;
	    } else if (results[n].fields.salary < minNum){
	      minNum = results[n].fields.salary;
	    }
	    if(results[n].salary > maxNum){
	      maxNum = results[n].fields.salary
	    }
	    totalNum += results[n].fields.salary
	    countNum ++
	  }
	}
	var avNum = Math.floor(totalNum / countNum);


	var chart = c3.generate({
	    bindto: '#chart2',
	    data: {
	        columns: [
	            ['data', avNum]
	        ],
	        type: 'gauge',
	        onclick: function (d, i) { console.log("onclick", d, i); },
	        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
	        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
	    },
	    gauge: {
	       label: {
	           format: function(value, ratio) {
	           		var count=0;
	           		console.log(value);
	           		value = value + '';
	           		for(i=value.length-1;i>=0;i--){
	           			count++;
	           			console.log(count);
	           			console.log('in the for loop');
	           			if(count%3===0){
	           				value = value.substring(0,i)+','+value.substring(i, value.length);
	           				break;
	           			}
	           		}
	           		value = '$'+value;
	           		console.log(value);
	               return value;
	           },
	           show: false // to turn off the min/max labels.
	       },
	   min: 60000, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
	   max: 150000, // 100 is default
	   units: ' ',
	   width: 60 // for adjusting arc thickness
	    },
	    color: {
	        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
	        threshold: {
	//            unit: 'value', // percentage is default
	//            max: 200, // 100 is default
	            values: [78000, 90000, 110000, 135000]
	        }
	    },
	    size: {
	        height: 180
	    }
	});
	})
})