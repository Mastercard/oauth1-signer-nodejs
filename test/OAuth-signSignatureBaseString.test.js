const assert = require("assert");
const sinon = require("sinon");
const crypto = require("crypto");
const OAuth = require("../src/OAuth");

describe("OAuth Signer", function() {
	describe("#signSignatureBaseString()", function() {
		const sbs = "POST&https%3A%2F%2Fexample.com&param";
		const signingKey = "-----BEGIN PRIVATE KEY-----test-key-----END PRIVATE KEY-----";
		let signerStub;

		beforeEach(function() {
			signerStub = {
				update: sinon.stub().returnsThis(),
				sign: sinon.stub().returns("signed-value")
			};
			sinon.stub(crypto, "createSign").returns(signerStub);
		});

		afterEach(function() {
			sinon.restore();
		});

		[
			{
				desc: "defaults to RSA-SHA256",
				signatureMethod: undefined,
				expectedSignArgs: [signingKey, "base64"]
			},
			{
				desc: "uses RSA-PSS when requested",
				signatureMethod: OAuth.SignatureMethod.RSA_PSS_SHA256,
				expectedSignArgs: [
					{
						key: signingKey,
						padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
						saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
					},
					"base64"
				]
			}
		].forEach(function(testCase) {
			it(`signs base string (${testCase.desc})`, function() {
				const result = OAuth.signSignatureBaseString(sbs, signingKey, testCase.signatureMethod);

				assert.equal(result, "signed-value");
				assert.equal(crypto.createSign.calledOnceWithExactly("RSA-SHA256"), true);
				assert.equal(signerStub.update.calledOnceWithExactly(Buffer.from(sbs)), true);
				assert.equal(signerStub.sign.calledOnceWithExactly(...testCase.expectedSignArgs), true);
			});
		});
	});
});
