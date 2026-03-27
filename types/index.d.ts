declare class OAuth {
    /**
     * Creates a Mastercard API compliant OAuth Authorization header.
     *
     * @param uri Target URI for this request
     * @param method HTTP method of the request
     * @param payload Request payload (nullable)
     * @param consumerKey Consumer key set up in a Mastercard Developer Portal project
     * @param signingKey The private key that will be used for signing the request
     * @param [signatureMethod="RSA-SHA256"] The signature method to use - either "RSA-SHA256" or "RSA-PSS-SHA256"
     * @returns Valid OAuth1.0a signature with a body hash when payload is present
     */
    static getAuthorizationHeader(
        uri: string,
        method: string,
        payload: string | null,
        consumerKey: string,
        signingKey: string,
        signatureMethod?: "RSA-SHA256" | "RSA-PSS-SHA256"
    ): string;
}

declare namespace OAuth {
    const SignatureMethod: {
        readonly RSA_SHA256: "RSA-SHA256";
        readonly RSA_PSS_SHA256: "RSA-PSS-SHA256";
    };
}

export = OAuth;