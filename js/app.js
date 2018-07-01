$(function() {
	console.log("abc");
	$.ajax({
		type: "GET",
		url: "http://localhost:8282/books",
		dataType: "json"
	})
		.done(function(data) {
			printBooks(data);
		})
		.fail(function() {})
		.always(function() {});
});

function printBooks(data) {
	console.log(data);
	$.each(data, function(index) {
		var book = $("<h1>")
			.addClass("text-center")
			.text(data[index].title);
		$("#books").append(book);
		book = $("<p>")
			.addClass("text-center")
			.text("id: " + data[index].id);
		$("#books").append(book);
		book = $("<p>")
			.addClass("text-center")
			.text("isbn: " + data[index].isbn);
		$("#books").append(book);

		book = $("<p>")
			.addClass("text-center")
			.text("author: " + data[index].author);
		$("#books").append(book);
		book = $("<p>")
			.addClass("text-center")
			.text("publisher: " + data[index].publisher);
		$("#books").append(book);
		book = $("<p>")
			.addClass("text-center")
			.text("type: " + data[index].type);
		$("#books").append(book);
		book = $("<hr>");
		$("#books").append(book);
	});
}

$("#books-form").submit(function(e) {
	var form = $("#books-form").serializeArray();
	var formObject = {};
	$.each(form, function(index, element) {
		formObject[element.name] = element.value;
	});
	console.log(formObject);
	console.log(JSON.stringify(formObject));

	$.ajax({
		headers: {
			"Content-Type": "application/json"
		},
		type: "POST",
		url: "http://localhost:8282/books",
		data: JSON.stringify(formObject),
		dataType: "json",
		success: function(data) {
			alert(data);
		}
	});

	e.preventDefault();
});
