mycee
=============================

Create simple raw HTML bundles. Currently requires jQuery.

1. create
-----------------------------

A bundle is inside a `bundle` tag. The name of it is in the `name` attribute.
The `data-key` attribute is used to insert data into the element. The value of the attribute is the key in the object that is associated with it.

``` html
	<!-- bundles.html -->
	<bundle name="student">
		<li>
			<h2 data-key="name"></h2>
			<h4 data-key="class"></h4>
		</li>
		<bundle name="close">
			<button class="close">×</button>
		</bundle>
	</bundle>
```

2. load
-----------------------------

``` html
	<!-- index.html -->
	...
	<link type="text/bundle" href="./bundles.html">

	<script type="text/javascript" src="./index.js"></script>
	...
```

3. use
-----------------------------

``` html
	<!-- index.html -->
	...	
	<script>
		$(function () {
			$('ol').before(mycee.close());

			var students = [{ name: 'Jack', class, '3.B' }, { name: 'Kiddo', class, '6.A' }];
			for (var i in students) $('ol').append(mycee.student(students[i]));
		});
	</script>
	...

	<ol></ol>
```
[demo](http://felix.lovassy.hu/projects/gellert/mycee/)

methods
-----------------------------

* __.load()__
* __.files(urls)__
* __.file(url)__
* __.newBundle(name, content)__
* __.parse(content, data)__
