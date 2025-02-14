const config = {
    get OPENAI_API_KEY() {
        const encoded = 'c2stcHJvai0zNW0zMEJLaUNaaGpTbWJMWE9yNDVVbWtUWmcyS2lmVXY3d2FqN0JmSnNCZkJyMkxtQndKQjFQMGpCTUM1SlR5R3NjR1dvN2UyOVQzQmxia0ZKTGRvbzFVOTlNdXotREZhNUVzYlFXM285TWx3WjBGTFphaHpTTTBqRGkweGctbUt4UV9OUjNGWVNRVmRNc1BXNF9zendFcF9BZ0E=';
        return atob(encoded);
    }
};

export default config; 