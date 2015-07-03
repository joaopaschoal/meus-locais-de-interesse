define([
	'intern!tdd'
], function (tdd) {

	function describeBase() {
		// describe base
	}

	function itBase() {
		// it base
	}

	function beforeBase() {
		// before base
	}

	function afterBase() {
		// after base
	}

	function beforeEachBase() {
		// beforeEach base
	}

	function afterEachBase() {
		// afterEach base
	}
	

	return {
		describe: function (name, factory) {
			describeBase();
			return tdd.suite(name, factory);
		},

		it: function (name, test) {
			itBase();
			return tdd.test(name, test);
		},

		before: function (fn) {
			beforeBase();
			return tdd.before(fn);
		},

		after: function (fn) {
			afterBase();
			return tdd.after(fn);
		},

		beforeEach: function (fn) {
			beforeEachBase();
			return tdd.beforeEach(fn);
		},

		afterEach: function (fn) {
			afterEachBase();
			return tdd.afterEach(fn);
		}
	};
});
