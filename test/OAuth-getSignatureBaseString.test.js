const assert = require("assert");
const OAuth = require("../src/OAuth");
const getSignatureBaseString = require("../src/OAuth").getSignatureBaseString;

describe("OAuth Signer", function() {
	describe("#getSignatureBaseString()", function() {
		it("Creates a correctly constructed and escaped signature base string", function() {
			const httpMethod = "GET";
			const baseUri = "https://sandbox.api.mastercard.com/merchantid/v1/merchantid";
			const paramString = "Format=JSON&Format=XML&MerchantId=GOOGLE%20LTD%20ADWORDS%20%28CC%40GOOGLE.COM%29&Type=ExactMatch&oauth_consumer_key=aaa!aaa&oauth_nonce=uTeLPs6K&oauth_signature_method=RSA-SHA256&oauth_timestamp=1524771555&oauth_version=1.0";
			const sbs = getSignatureBaseString(httpMethod, baseUri, paramString);

			assert.deepEqual(sbs, "GET&https%3A%2F%2Fsandbox.api.mastercard.com%2Fmerchantid%2Fv1%2Fmerchantid&Format%3DJSON%26Format%3DXML%26MerchantId%3DGOOGLE%2520LTD%2520ADWORDS%2520%2528CC%2540GOOGLE.COM%2529%26Type%3DExactMatch%26oauth_consumer_key%3Daaa%21aaa%26oauth_nonce%3DuTeLPs6K%26oauth_signature_method%3DRSA-SHA256%26oauth_timestamp%3D1524771555%26oauth_version%3D1.0");
		});
	});
});
