# oauth1-signer-nodejs

[![Build Status](https://travis-ci.org/Mastercard/oauth1-signer-nodejs.svg?branch=master)](https://travis-ci.org/Mastercard/oauth1-signer-nodejs)
[![NpmJS](https://img.shields.io/npm/v/mastercard-oauth1-signer.svg)](https://www.npmjs.com/package/mastercard-oauth1-signer)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](https://github.com/Mastercard/oauth1-signer-nodejs/blob/master/LICENSE)


## Table of Contents
- [Overview](#overview)
  * [Compatibility](#compatibility)
  * [References](#references)
- [Usage](#usage)
  * [Prerequisites](#prerequisites)
  * [Adding the Library to Your Project](#adding-the-library-to-your-project)
  * [Loading the Signing Key](#loading-the-signing-key)  
  * [Creating the OAuth Authorization Header](#creating-the-oauth-authorization-header)
  
## Overview <a name="overview"></a>
Zero dependency library for generating a Mastercard API compliant OAuth signature.

### Compatibility <a name="compatibility"></a>
Node 6.12.3+

### References <a name="references"></a>
* [OAuth 1.0a specification](https://tools.ietf.org/html/rfc5849)
* [Body hash extension for non application/x-www-form-urlencoded payloads](https://tools.ietf.org/id/draft-eaton-oauth-bodyhash-00.html)

## Usage <a name="usage"></a>
### Prerequisites <a name="prerequisites"></a>
Before using this library, you will need to set up a project in the [Mastercard Developers Portal](https://developer.mastercard.com). 

As part of this set up, you'll receive credentials for your app:
* A consumer key (displayed on the Mastercard Developer Portal)
* A private request signing key (matching the public certificate displayed on the Mastercard Developer Portal)

### Adding the Library to Your Project <a name="adding-the-library-to-your-project"></a>

```
npm i mastercard-oauth1-signer
```

### Loading the Signing Key <a name="loading-the-signing-key"></a>

The following code shows how to load the private key using `node-forge`:

```javascript
const forge = require("node-forge");
const fs = require("fs");
const p12Content = fs.readFileSync("<insert PKCS#12 key file path>", 'binary');
const p12Asn1 = forge.asn1.fromDer(p12Content, false);
const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, "<insert key password>");
const keyObj = p12.getBags({
    friendlyName: "<insert key alias>",
    bagType: forge.pki.oids.pkcs8ShroudedKeyBag
}).friendlyName[0];
const signingKey = forge.pki.privateKeyToPem(keyObj.key);
```

### Creating the OAuth Authorization Header <a name="creating-the-oauth-authorization-header"></a>
The method that does all the heavy lifting is `getAuthorizationHeader`. You can call into it directly and as long as you provide the correct parameters, it will return a string that you can add into your request's `Authorization` header.

```javascript
const consumerKey = "<insert consumer key>";
const uri = "https://sandbox.api.mastercard.com/service";
const method = "POST";
const payload = "Hello world!";

const oauth = require('mastercard-oauth1-signer');
const authHeader = oauth.getAuthorizationHeader(uri, method, payload, consumerKey, signingKey);
```
