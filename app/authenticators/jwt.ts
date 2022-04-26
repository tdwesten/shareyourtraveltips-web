import JWTAuthenticator from 'ember-simple-auth-token/authenticators/jwt';

export default class ApplicationAuthenticator extends JWTAuthenticator {
  headers: any;

  refreshAccessToken(token: string) {
    return new Promise((resolve, reject) => {
      const headers: any = {
        ...this.headers,
        ...{
          Authorization: `Bearer ${token}`,
        },
      };

      this.makeRequest(this.serverTokenRefreshEndpoint, {}, headers)
        .then((response: any) => {
          try {
            const sessionData = this.handleAuthResponse(response);
            this.trigger('sessionDataUpdated', sessionData);
            return resolve(sessionData);
          } catch (error) {
            return reject(error);
          }
        })
        .catch((error: any) => {
          this.handleTokenRefreshFail(error.status);
          return reject(error);
        });
    });
  }
}
