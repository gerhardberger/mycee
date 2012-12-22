(function ($) {

	var debug = false;
	function log (a) { if (debug) console.log(a); }
	function dir (a) { if (debug) console.dir(a); }


	function B (name, data) {
		return this.B[name](data);
	}


	// Parses the content: set the inner values of the 
	// elements with the class that is a key in the o object.

	B.constructor.prototype.parse = function (content, o) {
		content = (content.length === 1) ? content[0] : content;
		if (!o) return content;

		for (var k in o) {
			var elem = $(content).find('[data-key="' + k + '"]');

			if (elem[0] === undefined) continue;

			switch (elem[0].tagName){
				case 'INPUT':
				case 'TEXTAREA': elem.val(o[k]); break;
				case 'IFRAME':
				case 'IMG': elem.attr('src', o[k]); break;
				default: elem.text(o[k]);
			}
		}

		return content;
	};


	// Create a new bundle

	B.constructor.prototype.newBundle = function (name, content) {
		var self = this;

		self.constructor.prototype[name] = function (data) {
			return $(self.parse(content, data)).clone();
		};
	};


	// Load a single file

	B.constructor.prototype.file = function (url, cb) {
		var self = this;

		$.get(url, function (data) {
			log(data);
			var bundles = $(data);

			bundles = bundles.filter(function () { return this.tagName === 'BUNDLE'; }).toArray();

			var names = bundles.map(function (bundle) { return $(bundle).attr('name'); });
			log(names);

			bundles = bundles.map(function (bundle) { return bundle.children; });
			log(bundles);

			for (var i in names) self.newBundle(names[i], bundles[i]);
		});
	};


	// Load multiple files

	B.constructor.prototype.files = function (files, cb) {
		var self = this;

		files.map(function (url) {
			self.file(url, cb);
		});
	};


	// Load the previously in link tag inserted bundle files

	B.constructor.prototype.load = function(cb) {
		var fs = $('head > link[type="text/bundle"]').map(function (f) { return this.href; }).toArray();

		log(fs);

		this.files(fs, cb);
	};


	B.load();

	window.B = B;

})(jQuery);