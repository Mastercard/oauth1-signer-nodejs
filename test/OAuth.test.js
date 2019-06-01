const assert = require('assert');
const OAuth = require("../src/OAuth");

OAuth.getNonce = () => "uTeLPs6K";
OAuth.getTimestamp = () => "1524771555";
OAuth.signSignatureBaseString = () => "RSA_SIGNATURE";

describe("OAuth Signer", function() {
	describe("#getAuthorizationHeader()", function() {
		const uri = "HTTPS://SANDBOX.api.mastercard.com/merchantid/v1/merchantid?MerchantId=GOOGLE%20LTD%20ADWORDS%20%28CC%40GOOGLE.COM%29&Type=ExactMatch&Format=JSON";
		const method = "GET";
		const consumerKey = "aaa!aaa";
		const signingKey = "dummy";

		it("Creates a valid OAuth1.0a header value", function() {
			const header = OAuth.getAuthorizationHeader(uri, method, "{}", consumerKey, signingKey);
			assert.equal(header, `OAuth oauth_body_hash="RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o=",oauth_consumer_key="aaa!aaa",oauth_nonce="uTeLPs6K",oauth_signature_method="RSA-SHA256",oauth_timestamp="1524771555",oauth_version="1.0",oauth_signature="RSA_SIGNATURE"`);
		});

		it("Creates a valid OAuth1.0a header value with body hash of the empty string when no payload", function() {
			const header = OAuth.getAuthorizationHeader(uri, method, null, consumerKey, signingKey);
			assert.equal(header, `OAuth oauth_body_hash="47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",oauth_consumer_key="aaa!aaa",oauth_nonce="uTeLPs6K",oauth_signature_method="RSA-SHA256",oauth_timestamp="1524771555",oauth_version="1.0",oauth_signature="RSA_SIGNATURE"`);
		});
	});
});
