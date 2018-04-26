const assert = require("assert");
const extractQueryParams = require("../src/OAuth").extractQueryParams;

describe("OAuth Signer", function() {
	describe("#extractQueryParams()", function() {
		const href="HTTPS://SANDBOX.api.mastercard.com/merchantid/v1/merchantid?MerchantId=GOOGLE%20LTD%20ADWORDS%20%28CC%40GOOGLE.COM%29&Format=XML&Type=ExactMatch&Format=JSON";
		const queryParams = extractQueryParams(href);

		it("Should return a Map", function() {
			assert.equal(queryParams instanceof Map, true);
		});

		it("Query parameter keys should be sorted", function() {
			const mapKeysArray = Array.from(queryParams.keys());
			assert.deepEqual(mapKeysArray, ["Format", "MerchantId", "Type"]);
		});

		it("Query parameter values should be sorted. Values for parameters with the same name are added into a list.", function() {
			// Format
			const valuesFormat = queryParams.get("Format");
			const valuesFormatArray = Array.from(valuesFormat.values());
			assert.equal(valuesFormat instanceof Set, true);
			assert.equal(valuesFormat.size, 2);
			assert.deepEqual(valuesFormatArray, ["JSON", "XML"]);

			// MerchantId
			const valuesMerchantId = queryParams.get("MerchantId");
			const valuesMerchantIdArray = Array.from(valuesMerchantId.values());
			assert.equal(valuesMerchantId instanceof Set, true);
			assert.equal(valuesMerchantId.size, 1);
			assert.deepEqual(valuesMerchantIdArray, ["GOOGLE%20LTD%20ADWORDS%20%28CC%40GOOGLE.COM%29"]);

			// Type
			const valuesType = queryParams.get("Type");
			const valuesTypeArray = Array.from(valuesType.values());
			assert.equal(valuesType instanceof Set, true);
			assert.equal(valuesType.size, 1);
			assert.deepEqual(valuesTypeArray, ["ExactMatch"]);
		});
	});
});
