$(document).ready(function(){
	var svg = d3.selectAll('svg');
	var data = [];

	var add_data_item = function(data_item) {
		data.push(data_item);
	}
	
    var build_table = function(data) {	
		var add_row = function(data_item, i) {
		  $('#data_table').append("<tr " + "data-index='" + i + "'><td>" + data_item.x +
								  "</td><td>" + data_item.y +
								  "</td><td>" + data_item.r +
								  "</td></tr>");
		}	
		$('#data_table').empty();
		var i = 0;
		for (i = 0; i < data.length; i++) {
			add_row(data[i], i);
		}	 
        // we install the handler to handle the removal of rows
        $('#data_table tr').click(function(){
		  var i = parseInt($(this).attr('data-index'));
		  // for all the remaining rows update the index
		  var j = i + 1;
		  for ( j = i + 1; j < data.length; j ++ ) {
		    var trow = $("#data_table tr[data-index='" + j + "']");  
			var old_data_index = $(trow).attr('data-index');
			$(trow).attr('data-index', parseInt(old_data_index) - 1);
		  }
		  data.splice(i, 1); // remove data item from data
		  $(this).remove(); // remove table row
		  draw();
        });		
	}; 

	var draw = function() {
	    // DATA BINDING
		var circle = svg.selectAll('circle')
		              .data(data);
   
		circle.enter().append('circle')
	              .attr('cx', function(d) {return d.x;})
	              .attr('cy', function(d) {return d.y;})
				  .attr('stroke', 'black')
	              .attr('stroke-width', 2)
	              .attr('fill', 'red')
				  .attr('r', 0)
				  .transition()				  
	              .attr('r', function(d) {return d.r;});
		
		circle.exit().transition().attr('r',0).remove();
	}
	
	var handle_button_add = function(){
		$('button#add').click(function(){
		  var data_item = {
		    x: $('input#new_x').val(),
			y: $('input#new_y').val(),
			r: $('input#new_r').val()
		  };
		  add_data_item(data_item);
		  build_table(data);
		  draw();
		  return false;
		})
	}
	
	handle_button_add();	   
});
